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
        orderBy: { created_at: 'desc' }
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

        const userBalance = await prisma.tb_balance.findMany({
            where: {
                NIK: data.NIK,
                expired_date: {
                    gte: new Date()
                }
            },
            orderBy: {
                expired_date: "desc"
            }
        });

        if (data.status === status) {
            throw new Error("New status and old status can't be the same");
        }

        let currentBalance = userBalance[0] ? userBalance[0].amount : 0;
        let carriedBalance = userBalance[1] ? userBalance[1].amount : 0;
        let tempBalance = 0;
        let maxAmountReceive = 12;

        if (data.tb_users.role === "karyawan_kontrak") {
            maxAmountReceive = 1;
        }

        // kondisi berdasarkan status leave saat ini dan status mendatang
        if (data.leave_type !== "special_leave") {
            if (data.status === "approved" && status === "rejected") {
                currentBalance += data.total_days;
            } else if (data.status === "rejected" && status === "approved") {
                carriedBalance -= data.total_days;
            } else if (data.status === "pending" && status === "approved") {
                carriedBalance -= data.total_days;
            } else if (data.status === "pending" && status === "rejected") {
                currentBalance += data.total_days;
            }
        }

        // jika carried balance seteleah dikurangi hasilnya minus
        if (carriedBalance < 0) {
            tempBalance = -1 * (carriedBalance)
            currentBalance -= tempBalance;
            carriedBalance = 0;
        }

        // jika current balance setelah ditambah ternyata hasilnya lebih dari 12
        if (currentBalance > maxAmountReceive) {
            tempBalance = currentBalance - maxAmountReceive
            carriedBalance += tempBalance;
            currentBalance = maxAmountReceive;
        }

        const resultLeave = await prisma.tb_leave.update({
            where: {
                id_leave: id
            },
            data: {
                status: status
            }
        })

        // update tabel leave
        // update 2 record balance menggunakan variable carriedBalance dan currentBalance
        // update tabel tb_leave_logs
        const result = await prisma.$transaction([
            prisma.tb_leave.update({ where: { id_leave: id }, data: { status: status } }),
            prisma.tb_balance.update({ where: { id_balance: userBalance[0].id_balance }, data: { amount: currentBalance } }),
            prisma.tb_balance.update({ where: { id_balance: userBalance[1].id_balance }, data: { amount: carriedBalance } }),
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
        // console.log(result[0])
        // console.log(result[1], result[2])
        // console.log(`currentBalance: ${result[1].amount}\ncarriedBalance: ${result[2].amount}\ncurrentStatus: ${status} \npreviousStatus: ${data.status}`)
    } catch (error) {
        throw error;
    }
}


// updateLeave('c711b5c6-6a4c-4010-a909-4e59264373c1', 'approved', "disetujui oleh admin", "100005");



export const getHistoryLeaveSearch = async ({ value, type, status, page = 1, limit = 10 }) => {
    const changeFormat = (text) =>
        text?.trim().toLowerCase().replace(/\s+/g, '_');

    const leaves = await prisma.tb_leave.findMany({
        where: {
            ...(type && { leave_type: changeFormat(type) }),
            ...(status && { status: status })
        },
        orderBy: { start_date: 'desc' }
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
        orderBy: { start_date: 'desc' }
    });

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
            take: limit
        }),
        prisma.tb_special_leave.count()
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
            take: limit
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
            take: limit
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
            take: limit
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
