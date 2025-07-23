import { leave_type } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js";


export const getAllLeavesService = async (page, limit) => {
    const skip = (page - 1) * limit;

    const leaves = await prisma.tb_leave.findMany({
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

    const data = leaves.map(leave => ({
        ...leave,
        name: leave.tb_users.fullname
    }))

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
            { tb_users: { is: { fullname: { contains: value, mode: 'insensitive' } } } }
        ];
    }

    const skip = (page - 1) * limit;

    const leaves = await prisma.tb_leave.findMany({
        orderBy: { created_at: 'desc' },
        where,
        skip,
        take: limit,
        include: {
            tb_users: {
                select: { fullname: true }
            }
        }
    });

    const data = leaves.map(leave => ({
        ...leave,
        name: leave.tb_users.fullname
    }));

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
                total_days: leave.total_days,
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
                total_days: leave.total_days,
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

export const updateLeaveBalance = async (user) => {
    const today = new Date();
    const joinDate = new Date(user.join_date);
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (user.status_active === 'resign') {
        console.log(`[SKIP] NIK: ${user.NIK} status: RESIGN`);
        return;
    }

    if (user.role === 'karyawan_tetap' || user.role === 'admin' || user.role === 'super_admin') {
        const currentYear = today.getFullYear();

        const alreadyGiven = await prisma.tb_balance.findFirst({
            where: {
                NIK: user.NIK,
                receive_date: {
                    gte: new Date(`${currentYear}-01-01`),
                    lte: new Date(`${currentYear}-12-31`)
                }
            }
        });

        if (!alreadyGiven) {
            const receiveDate = new Date();
            const expiredDate = new Date(receiveDate);
            expiredDate.setFullYear(receiveDate.getFullYear() + 2);

            await prisma.$transaction([
                prisma.tb_balance.create({
                    data: {
                        NIK: user.NIK,
                        amount: 12,
                        receive_date: receiveDate,
                        expired_date: expiredDate
                    }
                }),
                prisma.tb_balance_adjustment.create({
                    data: {
                        NIK: user.NIK,
                        adjustment_value: 12,
                        notes: 'get 12 days of leave',
                        created_at: new Date(),
                        actor: 'system'
                    }
                })
            ]);
            
            console.log(`[Balance Added] NIK: ${user.NIK}, amount: 12 (karyawan tetap)`);
        }

    } else if (user.role === 'karyawan_kontrak') {
        const joinEffective = new Date(joinDate)

        if (joinDate.getDate() > 20) {
            joinEffective.setMonth(joinEffective.getMonth() + 1)
            joinEffective.setDate(1)
        } else {
            joinEffective.setDate(1)
        }

        let months = (firstOfMonth.getFullYear() - joinEffective.getFullYear()) * 12 +
                     (firstOfMonth.getMonth() - joinEffective.getMonth()) + 1;

        const eligibleMonths = months - 3;

        if (eligibleMonths >= 1) {
            const autoAddAmount = await prisma.tb_balance_adjustment.aggregate({
                where: {
                    NIK: user.NIK,
                    actor: 'system'
                },
                _sum: {
                    adjustment_value: true
                }
            });

            const current = autoAddAmount._sum.adjustment_value || 0;
            const toAdd = eligibleMonths - current;

            if (toAdd > 0) {
                const receiveDate = new Date();
                const expiredDate = new Date(receiveDate);
                expiredDate.setFullYear(receiveDate.getFullYear() + 2);

                await prisma.$transaction([
                    prisma.tb_balance.create({
                        data: {
                            NIK: user.NIK,
                            amount: toAdd,
                            receive_date: receiveDate,
                            expired_date: expiredDate
                        }
                    }),
                    prisma.tb_balance_adjustment.create({
                        data: {
                            NIK: user.NIK,
                            adjustment_value: toAdd,
                            notes: `get ${toAdd} days of leave`,
                            created_at: new Date(),
                            actor: 'system'
                        }
                    })
                ])
                console.log(`[Balance Added] NIK: ${user.NIK}, amount: ${toAdd}`);
            }
        }
    } else {
        console.log(`[SKIP] NIK: ${user.NIK} role: magang`);
    }
};
