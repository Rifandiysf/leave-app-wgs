import { promise } from "zod/v4";
import { leave_type } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js";
import { calculateHolidaysDays, createDateFromString } from "../utils/leaves.utils.js";


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
            personal_leave: 'personal_leave',
            mandatory_leave: 'mandatory_leave',
            special_leave: 'special_leave'
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
                tb_users: true,
                tb_leave_log: {
                    take: 1,
                    orderBy: {
                        changed_at: "desc"
                    }
                }
            }
        });

        if (!data) {
            const err = new Error("Leave not found");
            err.statusCode = 404;
            throw err;
        }


        if (data.start_date <= new Date()) {
            throw new Error("The start date of the leave has passed the current date");
        }

        if (data.status === status) {
            throw new Error("New status and old status can't be the same");
        }

        if (data.NIK === nik) {
            throw new Error("you cannot approve or reject your own leave")
        }

        const start = createDateFromString(new Date(data.start_date));
        const end = createDateFromString(new Date(data.end_date));

        console.log(start)
        console.log(end)

        const existing = await prisma.tb_leave.findFirst({
            where: {
                NIK: data.NIK,
                OR: [
                    {
                        start_date: { lte: end },
                        end_date: { gte: start },
                    },
                ],
                status: {
                    in: ["approved", "pending", "expired"]
                },
                NOT: {
                    id_leave: data.id_leave
                }
            },
        });

        console.log(existing)

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

        console.log('before: ', userBalance);

        let updatedBalances = [...userBalance];
        let balancesUsed = [];
        let currentBalancesOnly = [];
        let historyBalancesUsed = [];
        let totalDaysUsed = data.total_days;

        if (data.tb_leave_log.length !== 0) {
            historyBalancesUsed = data.tb_leave_log[0].balances_used
        }

        const isStartDateNextYear = new Date().getFullYear() < data.start_date.getFullYear();

        if (data.leave_type !== "special_leave") {
            // reduce
            // array di loop ini disort dari paling lama/ [-1] = currentBalance
            if ((data.status === "pending" || data.status === "rejected") && status === "approved") {

                if (existing) {
                    const err = new Error("There's overlap leave");
                    err.statusCode = 400;
                    throw err;
                }

                function reduceAmount(balances, daysUsed) {
                    for (let i = 0; i < balances.length; i++) {
                        let tempDays = balances[i].amount
                        balances[i].amount -= daysUsed;

                        if (balances[i].amount < 0 && i !== balances.length - 1) {
                            daysUsed = -1 * balances[i].amount
                            balances[i].amount = 0;
                        } else {
                            daysUsed = 0;
                        }

                        balancesUsed.push([balances[i].id_balance, balances[i].receive_date.getFullYear(), tempDays - balances[i].amount]);
                    }

                    balancesUsed.reverse();
                    return balances
                }

                if (isStartDateNextYear) {
                    currentBalancesOnly = updatedBalances.reverse()
                    updatedBalances = reduceAmount(currentBalancesOnly, totalDaysUsed);
                } else {
                    updatedBalances = reduceAmount(updatedBalances, totalDaysUsed);
                }
            }

            // restore
            // array di loop ini disort dari paling baru/ [0] = currentBalance
            if (data.status === "approved" && status === "rejected") {
                const restoredBalance = updatedBalances.reverse();

                for (let i = 0; i < restoredBalance.length; i++) {
                    const balance = restoredBalance[i];
                    balance.amount += historyBalancesUsed.find((item) => item[0] === balance.id_balance)?.[2] ?? 0;
                }
            }
        }

        const balanceUpdates = userBalance.map((balance) =>
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
                    changed_at: new Date(),
                    balances_used: balancesUsed.sort((a, b) => b[1] - a[1]) ?? []
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

    const offset = (page - 1) * limit;

    const leaves = await prisma.tb_leave.findMany({
        where: {
            ...(type && { leave_type: changeFormat(type) }),
            ...(status && { status: status }),
            NOT: { status: 'pending' }
        },
        orderBy: { created_at: 'desc' },
        include: {
            tb_users: {
                select: {
                    fullname: true
                }
            },
            tb_leave_log: {
                orderBy: { changed_at: 'desc' },
                take: 1,
                select: {
                    reason: true,
                    balances_used: true,
                    tb_users: {
                        select: {
                            fullname: true
                        }
                    }
                }
            }
        }
    });

    // Filter by fullname if value is given
    const filtered = await Promise.all(
        leaves.map(async (leave) => {
            const user = await prisma.tb_users.findUnique({
                where: { NIK: leave.NIK },
                select: { fullname: true }
            });

            if (value && !user?.fullname.toLowerCase().includes(value.toLowerCase())) {
                return null;
            }

            const latestLog = leave.tb_leave_log?.[0] || {
                reason: "-",
                tb_users: { fullname: "-" }
            };

            return {
                id_leave: leave.id_leave,
                title: leave.title,
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                total_days: leave.total_days,
                reason: leave.reason,
                status: leave.status,
                created_at: leave.created_at,
                NIK: leave.NIK,
                fullname: leave.tb_users?.fullname || "Unknown",
                id_special: leave.id_special,
                id_mandatory: leave.id_mandatory,
                tb_leave_log: latestLog
            };
        })
    );

    const cleaned = filtered.filter(Boolean);
    const total = cleaned.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = cleaned.slice(offset, offset + limit);

    return {
        data: paginated,
        total,
        page,
        totalPages
    };
};


export const getHistoryLeave = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const total = await prisma.tb_leave.count({
        where: {
            NOT: { status: 'pending' }
        }
    });

    const totalPages = Math.ceil(total / limit);

    const leaves = await prisma.tb_leave.findMany({
        where: {
            NOT: { status: 'pending' }
        },
        orderBy: { created_at: 'desc' },
        skip: offset,
        take: limit,
        include: {
            tb_users: {
                select: { fullname: true }
            },
            tb_leave_log: {
                orderBy: { changed_at: 'desc' },
                take: 1,
                select: {
                    reason: true,
                    balances_used: true,
                    tb_users: {
                        select: { fullname: true }
                    }
                }
            }
        }
    });

    const formattedLeaves = leaves.map(leave => {
        const latestLog = leave.tb_leave_log[0] || null;

        return {
            id_leave: leave.id_leave,
            title: leave.title,
            leave_type: leave.leave_type,
            start_date: leave.start_date,
            end_date: leave.end_date,
            total_days: leave.total_days,
            reason: leave.reason,
            status: leave.status,
            created_at: leave.created_at,
            NIK: leave.NIK,
            fullname: leave.tb_users?.fullname || "Unknown",
            id_special: leave.id_special,
            id_mandatory: leave.id_mandatory,
            tb_leave_log: latestLog
                ? {
                    reason: latestLog.reason,
                    balances_used: latestLog.balances_used,
                    tb_users: {
                        fullname: latestLog.tb_users?.fullname || "-"
                    }
                }
                : {
                    reason: "-",
                    balances_used: "-"  ,
                    tb_users: {
                        fullname: "-"
                    }
                }
        };
    });

    return {
        success: true,
        message: "Leave requests retrieved successfully",
        pagination: {
            current_page: page,
            last_visible_page: totalPages,
            has_next_page: page < totalPages,
            item: {
                count: formattedLeaves.length,
                total,
                per_page: limit
            }
        },
        data: formattedLeaves
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

export const expiredLeave = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    try {
        const pendingLeaves = await prisma.tb_leave.findMany({
            where: {
                status: 'pending',
                start_date: {
                    lte: today
                }
            }
        })

        if (pendingLeaves.length === 0) {
            console.log('[CRON] There is no pending leave that has passed its start date')
            return
        }

        const updateStatus = pendingLeaves.map((leave) =>
            prisma.tb_leave.update({
                where: { id_leave: leave.id_leave },
                data: { status: 'expired' }
            })
        )
        await Promise.all(updateStatus)
        console.log(`[CRON] ${updateStatus.length} leave data successfully changed to expired status`)

    } catch (error) {
        console.error('[CRON] Failed to update leave status to expired : ', error)
        throw error
    }
} 