import { leave_type } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js";


export const getAllLeavesService = async (page, limit) => {
    const skip = (page - 1) * limit;

    const data = await prisma.tb_leave.findMany({
        skip,
        take: limit,
        include: {
            tb_users: {
                select: { fullname: true }
            }
        },
        orderBy: { created_at: 'desc' },
        where: {
            status: 'pending'
        },
    });

    const total = await prisma.tb_leave.count();
    const totalPages = Math.ceil(total / limit);

    return { data, total, page, totalPages };
};

export const getLeavesByFilterService = async (type, value, page, limit) => {
    const where = {
        status: 'pending'
    };

    if (type) {
        const typeMapping = {
            personal: 'personal_leave',
            mandatory: 'mandatory_leave',
            special: 'special_leave'
        };
        const mapped = typeMapping[type.toLowerCase()];
        if (!mapped) throw new Error('Invalid leave type');
        where.leave_type = mapped;
    }

    if (value) {
        where.OR = [
            { title: { contains: value, mode: 'insensitive' } }
        ];
    }

    const skip = (page - 1) * limit;

    const data = await prisma.tb_leave.findMany({
        orderBy: { created_at: 'desc' },
        where,
        skip,
        take: limit
    });

    const total = await prisma.tb_leave.count({ where });
    const totalPages = Math.ceil(total / limit);

    return { data, total, page, totalPages };
};

export const updateLeave = async (id, status, reason, nik) => {
    try {
        const data = await prisma.tb_leave.findUnique({
            where: {
                id_leave: id,
            },
            include: {
                tb_users: true
            }
        });

        if (!data) {
            const err = new Error("Leave not found");
            err.statusCode = 404;
            throw err;
        }

        if (data.start_date >= new Date()) {
            throw new Error("The start date of the leave has passed the current date");
        }

        if (data.status === status) {
            throw new Error("New status and old status can't be the same");
        }

        if (data.NIK === nik) {
            throw new Error("Users are not allowed to approve or reject their own leave requests")
        }

        const userBalance = await prisma.tb_balance.findMany({
            where: {
                NIK: data.NIK,
                expired_date: {
                    gte: new Date()
                }
            },
            orderBy: {
                expired_date: "asc" // [-1] = currentYearBalance && [0..n] = lastYearBalance
            }
        });

        console.log(userBalance);

        let updatedBalances = [...userBalance];
        // let currentBalance = userBalance.at(-1).amount;
        // let carriedBalance = userBalance.length > 1 ? userBalance.slice(0, -1).reduce((sum, balAmount) => sum + balAmount.amount, 0) : 0;
        // console.log('this is carriedbalance', carriedBalance);
        // console.log('this is currentbalance', currentBalance);
        let totalDaysUsed = data.total_days;
        let tempDaysUsed;
        const maxAmountPerRecord = data.tb_users.role === "karyawan_kontrak" ? 1 : 12;

        if (data.leave_type !== "special_leave") {
            // reduce
            // array di loop ini disort dari paling lama/ [-1] = currentBalance
            if ((data.status === "pending" || data.status === "rejected") && status === "approved") {
                tempDaysUsed = totalDaysUsed
                for (let i = 0; i < updatedBalances.length; i++) {
                    
                    console.log(updatedBalances[i].amount)
                    console.log(tempDaysUsed)
                    updatedBalances[i].amount -= tempDaysUsed;

                    if (updatedBalances[i].amount < 0 && i !== updatedBalances.length - 1) {
                        tempDaysUsed = -1 * updatedBalances[i].amount
                        updatedBalances[i].amount = 0;
                    } else {
                        break;
                    }
                }
            }
            
            // restore
            // array di loop ini disort dari paling baru/ [0] = currentBalance
            if (data.status === "approved" && status === "rejected") {
                const restoredBalance = updatedBalances.reverse();
                tempDaysUsed = totalDaysUsed
                for (let i = 0; i < restoredBalance.length; i++) {

                    restoredBalance[i].amount += tempDaysUsed;

                    console.log(restoredBalance[i].amount);

                    if (restoredBalance[i].amount > maxAmountPerRecord) {
                        tempDaysUsed = restoredBalance[i].amount - maxAmountPerRecord
                        restoredBalance[i].amount = maxAmountPerRecord;
                    } else {
                        break;
                    }
                }
                
                updatedBalances = restoredBalance.reverse();
            }
        }
 
        const balanceUpdates = updatedBalances.map((balance) =>
            prisma.tb_balance.update({
                where: { id_balance: balance.id_balance },
                data: { amount: balance.amount }
            })
        );

        const result = await prisma.$transaction([
            prisma.tb_leave.update({ where: { id_leave: id }, data: { status: status } }),
            ...balanceUpdates,
            prisma.tb_leave_log.create({
                data: {
                    old_status: data.status,
                    new_status: status,
                    reason: reason,
                    changed_by_nik: nik,
                    id_leave: data.id_leave,
                    changed_at: new Date()
                }
            })
        ])

        return result[0]
    } catch (error) {
        throw error;
    }
}

export const getHistoryLeaveSearch = async ({ value, type, status, page = 1, limit = 10 }) => {
    const changeFormat = (text) =>
        text?.trim().toLowerCase().replace(/\s+/g, '_');

    const leaves = await prisma.tb_leave.findMany({
        where: {
            ...(type && { leave_type: changeFormat(type) }),
            ...(status && { status: status })
        },
        orderBy: { created_at: 'desc' },
    });

    const history = await Promise.all(
        leaves.map(async (leave) => {
            const user = await prisma.tb_users.findUnique({
                where: { NIK: leave.NIK },
                select: { fullname: true }
            });

            if (value && !user?.fullname.toLowerCase().includes(value.toLowerCase())) {
                return null;
            }

            return {
                name: user?.fullname || 'Unknown',
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                leave_used: leave.total_days,
                status: leave.status
            };
        })
    );

    const filtered = history.filter(Boolean);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
        data: paginated,
        total,
        page,
        totalPages
    };
};


export const getHistoryLeave = async (page, limit) => {
    const leaves = await prisma.tb_leave.findMany({
        where: {
            NOT: { status: 'pending' }
        },
        orderBy: { created_at: 'desc' },
    })

    const history = await Promise.all(
        leaves.map(async (leave) => {
            const user = await prisma.tb_users.findUnique({
                where: { NIK: leave.NIK },
                select: { fullname: true }
            });

            return {
                name: user?.fullname || 'Unknown',
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                leave_used: leave.total_days,
                status: leave.status
            };
        })
    );

    const total = history.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = history.slice(start, start + limit);

    return {
        data: paginated,
        total,
        page,
        totalPages
    };
};


export const getSpecialLeaveService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            skip,
            take: limit,
            orderBy: { title: 'asc' },
        }),
        prisma.tb_special_leave.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, page };
};


export const getSearchSpecialLeaveService = async (data, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const where = {
        title: {
            contains: data,
            mode: 'insensitive'
        }
    };

    const [results, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            where,
            skip,
            take: limit,
            orderBy: { title: 'asc' },
        }),
        prisma.tb_special_leave.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data: results, total, totalPages, page };
};


export const createSpecialLeaveService = async (data) => {
    return await prisma.tb_special_leave.create({
        data,
    })
}

export const updateSpecialLeaveService = async (id, data) => {
    return await prisma.tb_special_leave.update({
        where: {
            id_special: id
        },
        data
    })
}

export const createMandatoryLeaveService = async (data) => {
    return await prisma.tb_mandatory_leave.create({ data });
};

export const getAllMandatoryLeavesService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_mandatory_leave.findMany({
            skip,
            take: limit,
            orderBy: { start_date: 'asc' },
        }),
        prisma.tb_mandatory_leave.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data, total, totalPages, page };
};


export const getSearchMandatoryLeaveService = async (data, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const where = {
        title: {
            contains: data,
            mode: 'insensitive'
        }
    };

    const [results, total] = await Promise.all([
        prisma.tb_mandatory_leave.findMany({
            where,
            skip,
            take: limit,
            orderBy: { start_date: 'asc' },
        }),
        prisma.tb_mandatory_leave.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data: results, total, totalPages, page };
};


export const updateMandatoryLeaveService = async (id, data) => {
    return await prisma.tb_mandatory_leave.update({
        where: { id_mandatory: id },
        data,
    });
};

// export const updateLeave = async (id, status, reason, nik) => {
//     try {
//         const data = await prisma.tb_leave.findUnique({
//             where: { id_leave: id },
//             include: { tb_users: true }
//         });

//         if (!data) {
//             const err = new Error("Leave not found");
//             err.statusCode = 404;
//             throw err;
//         }

//         if (data.start_date >= new Date()) {
//             throw new Error("The start date of the leave has passed the current date");
//         }

//         if (data.status === status) {
//             throw new Error("New status and old status can't be the same");
//         }

//         if (data.NIK === nik) {
//             throw new Error("Users are not allowed to approve or reject their own leave requests")
//         }

//         const userBalance = await prisma.tb_balance.findMany({
//             where: {
//                 NIK: data.NIK,
//                 expired_date: { gte: new Date() }
//             },
//             orderBy: {
//                 expired_date: "asc"
//             }
//         });

//         if (userBalance.length === 0) {
//             throw new Error("Balance not found");
//         }

//         const originalStatus = data.status;
//         const totalDays = data.total_days;
//         let daysToHandle = totalDays;

//         const updatedBalances = [...userBalance];
//         const isContract = data.tb_users.role === "karyawan_kontrak";
//         const limitPerRecord = isContract ? 1 : 12;

//         if (data.leave_type !== "special_leave") {
//             if (
//                 (originalStatus === "pending" || originalStatus === "rejected") &&
//                 status === "approved"
//             ) {
//                 // mengurangi amount balance dari record paling lama (deduct)
//                 for (let i = 0; i < updatedBalances.length; i++) {
//                     if (daysToHandle === 0) break;
//                     let deduct; 

//                     if (i === updatedBalances.length - 1) {
//                         deduct = daysToHandle
//                     } else {
//                         deduct = Math.min(updatedBalances[i].amount, daysToHandle);
//                     }
                    
//                     updatedBalances[i].amount -= deduct;
//                     daysToHandle -= deduct;
//                 }

//                 if (daysToHandle > 0 && data.leave_type === "personal_leave") {
//                     throw new Error("Insufficient balance to approve leave");
//                 }
//             }

//             // menambahkan amount balance dari record paling lama (restore)
//             else if (originalStatus === "approved" && status === "rejected") {
//                 for (let i = 0; i < updatedBalances.length; i++) {
//                     if (daysToHandle === 0) break;

//                     const availableSpace = limitPerRecord - updatedBalances[i].amount;
//                     console.log(availableSpace);
//                     if (availableSpace <= 0) continue;

//                     const restore = Math.min(availableSpace, daysToHandle);
//                     updatedBalances[i].amount += restore;
//                     daysToHandle -= restore;
//                 }

//                 if (daysToHandle > 0) {
//                     throw new Error("Unable to fully restore leave balance — record limits exceeded.");
//                 }
//             }
//         }

//         const balanceUpdates = updatedBalances.map((balance) =>
//             prisma.tb_balance.update({
//                 where: { id_balance: balance.id_balance },
//                 data: { amount: balance.amount }
//             })
//         );

//         const result = await prisma.$transaction([
//             prisma.tb_leave.update({
//                 where: { id_leave: id },
//                 data: { status: status }
//             }),
//             ...balanceUpdates,
//             prisma.tb_leave_log.create({
//                 data: {
//                     old_status: originalStatus,
//                     new_status: status,
//                     reason: reason,
//                     changed_by_nik: nik,
//                     id_leave: data.id_leave,
//                     changed_at: new Date()
//                 }
//             })
//         ]);

//         return result[0];
//     } catch (error) {
//         error.statusCode = 400
//         error.cause = error.message;
//         error.message = "Something went wrong when modify leave status"
//         throw error;
//     }
// };


























