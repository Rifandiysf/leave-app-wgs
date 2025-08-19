import { promise } from "zod/v4";
import { leave_type } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js";
import { calculateHolidaysDays, createDateFromString } from "../utils/leaves.utils.js";
import { date } from "zod";


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
            const err = new Error("The start date of the leave has passed the current date");
            err.statusCode = 400;
            throw err;
        }

        if (data.status === status) {
            const err = new Error("New status and old status can't be the same");
            err.statusCode = 400;
            throw err;
        }

        if (data.NIK === nik && data.leave_type !== "mandatory_leave") {
            const err = new Error("you cannot approve or reject your own leave");
            err.statusCode = 400;
            throw err;
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
                    gt: new Date()
                }
            },
            take: 2,
            orderBy: {
                expired_date: "desc" // [0] = currentYearBalance && [-1] = lastYearBalance
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

        const currentYear = new Date().getFullYear();
        const currentYearBalance = userBalance.find(balance => balance.receive_date.getFullYear() === currentYear);

        if (totalDaysUsed > currentYearBalance.amount && data.leave_type !== "mandatory_leave") {
            const err = new Error(`Cannot approve leave for next year because total days ${totalDaysUsed} exceed current year's balance ${currentYearBalance.amount}`);
            err.statusCode = 400;
            throw err;
        }



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

                    return balances
                }

                if (isStartDateNextYear) {
                    updatedBalances = reduceAmount(updatedBalances, totalDaysUsed);
                } else {
                    updatedBalances = reduceAmount(updatedBalances.reverse(), totalDaysUsed);
                }
            }

            // restore
            // array di loop ini disort dari paling baru/ [0] = currentBalance
            if (data.status === "approved" && status === "rejected") {
                const restoredBalance = updatedBalances;

                for (let i = 0; i < restoredBalance.length; i++) {
                    const balance = restoredBalance[i];
                    balance.amount += historyBalancesUsed.find((item) => item[0] === balance.id_balance)?.[2] ?? 0;
                }
            }
        }

        if (data.leave_type == "personal_leave" && userBalance.find((bal) => bal.receive_date.getFullYear() === new Date().getFullYear())?.amount < 0) {
            const error = new Error('Insufficient leave balance');
            error.statusCode = 400;
            throw error;
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
                    balances_used: "-",
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




export const getSpecialLeaveService = async (gender, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            skip,
            take: limit,
            orderBy: { title: 'asc' },
            where: {
                applicable_gender: {
                    in: [gender, 'mf']
                }
            }
        }),
        prisma.tb_special_leave.count({
            where: {
                applicable_gender: {
                    in: [gender, 'mf']
                }
            }
        }),
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

    if (user.status_active === 'resign') {
        console.log(`[SKIP] NIK: ${user.NIK} status: RESIGN`);
        return;
    }

    const currentYear = today.getFullYear();

    if (user.role === 'karyawan_tetap' || user.role === 'admin' || user.role === 'super_admin') {
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
            receiveDate.setHours(12, 0, 0, 0);

            const expiredDate = new Date(receiveDate);
            expiredDate.setFullYear(receiveDate.getFullYear() + 2, 0, 1);

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

            console.log(`[Balance Created] NIK: ${user.NIK}, amount: 12`);
        } else {
            //console.log(`[SKIP] NIK: ${user.NIK} - Balance for ${currentYear} already exists`);
        }

    } else if (user.role === 'karyawan_kontrak') {
        //console.log(`[DEBUG] Processing kontrak employee NIK: ${user.NIK}, today: ${today.toISOString()}`);
        
        // Hitung effective join date
        const joinEffective = new Date(joinDate);
        if (joinDate.getDate() > 20) {
            joinEffective.setMonth(joinEffective.getMonth() + 1);
        }
        joinEffective.setDate(1);
        //console.log(`[DEBUG] NIK: ${user.NIK}, joinEffective: ${joinEffective.toISOString()}`);

        // BACKFILL TAHUN SEBELUMNYA (hanya di Januari)
        if (today.getMonth() === 0) {
            //console.log(`[DEBUG] NIK: ${user.NIK} - Processing January backfill`);
            const previousYear = currentYear - 1;
            
            // Hitung eligible months untuk tahun sebelumnya
            const firstEligiblePrev = new Date(joinEffective);
            firstEligiblePrev.setMonth(firstEligiblePrev.getMonth() + 3);
            
            const startOfPrevYear = new Date(previousYear, 0, 1, 0, 0, 0, 0)
            const endOfPrevYear = new Date(previousYear, 11, 31, 23, 59, 59, 999)
            
            // Effective start untuk tahun sebelumnya
            const effectiveStartPrev = firstEligiblePrev > startOfPrevYear ? firstEligiblePrev : startOfPrevYear;
            
            // Hitung total eligible months di tahun sebelumnya
            let eligibleMonthsPrev = 0;
            if (effectiveStartPrev <= endOfPrevYear) {
                eligibleMonthsPrev = (endOfPrevYear.getFullYear() - effectiveStartPrev.getFullYear()) * 12 +
                                   (endOfPrevYear.getMonth() - effectiveStartPrev.getMonth()) + 1;
            }

            //console.log(`[DEBUG] NIK: ${user.NIK} - Previous year eligible months: ${eligibleMonthsPrev}`);

            if (eligibleMonthsPrev > 0) {
                // Hitung total yang sudah diberikan untuk tahun sebelumnya (EXCLUDE backfill)
                const adjustmentsPrev = await prisma.tb_balance_adjustment.aggregate({
                    where: {
                        NIK: user.NIK,
                        actor: 'system',
                        created_at: {
                            gte: startOfPrevYear,
                            lte: endOfPrevYear
                        },
                        notes: {
                            not: { contains: 'backfill' }
                        }
                    },
                    _sum: {
                        adjustment_value: true
                    }
                });

                const alreadyGivenPrev = adjustmentsPrev._sum.adjustment_value || 0;
                const toBackfill = eligibleMonthsPrev - alreadyGivenPrev;

                //console.log(`[DEBUG] NIK: ${user.NIK} - Already given prev year: ${alreadyGivenPrev}, to backfill: ${toBackfill}`);

                if (toBackfill > 0) {
                    const startOfPrevYear = new Date(`${previousYear}-01-01T00:00:00.000Z`);
                    const endOfPrevYear = new Date(`${previousYear}-12-31T23:59:59.999Z`);
                    
                    console.log(`[DEBUG] Searching balance for NIK: ${user.NIK}, year: ${previousYear}, range: ${startOfPrevYear.toISOString()} - ${endOfPrevYear.toISOString()}`);
                    
                    const balancePrev = await prisma.tb_balance.findFirst({
                        where: {
                            NIK: user.NIK,
                            receive_date: {
                                gte: startOfPrevYear,
                                lte: endOfPrevYear
                            }
                        }
                    });

                    console.log(`[DEBUG] Found existing balance for ${previousYear}: ${balancePrev ? 'YES' : 'NO'}`);

                    if (!balancePrev) {
                        // Buat tanggal dengan format yang eksplisit
                        const receiveDate = new Date(`${previousYear}-12-31T12:00:00.000Z`);
                        const expiredDate = new Date(`${previousYear + 2}-01-01T00:00:00.000Z`);
                        
                        console.log(`[DEBUG BACKFILL] NIK: ${user.NIK}`);
                        console.log(`[DEBUG BACKFILL] previousYear: ${previousYear}`);
                        console.log(`[DEBUG BACKFILL] receiveDate: ${receiveDate.toISOString()}`);
                        console.log(`[DEBUG BACKFILL] expiredDate: ${expiredDate.toISOString()}`);
                        console.log(`[DEBUG BACKFILL] toBackfill: ${toBackfill}`);
                        
                        await prisma.$transaction([
                            prisma.tb_balance.create({
                                data: {
                                    NIK: user.NIK,
                                    amount: toBackfill,
                                    receive_date: receiveDate,
                                    expired_date: expiredDate
                                }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill Created] NIK: ${user.NIK}, amount: ${toBackfill} for year ${previousYear}, receive: ${receiveDate.toISOString()}, expire: ${expiredDate.toISOString()}`);
                    } else {
                        await prisma.$transaction([
                            prisma.tb_balance.update({
                                where: {
                                    id_balance: balancePrev.id_balance
                                },
                                data: {
                                    amount: balancePrev.amount + toBackfill
                                }
                            }),
                            prisma.tb_balance_adjustment.create({
                                data: {
                                    NIK: user.NIK,
                                    adjustment_value: toBackfill,
                                    notes: `backfill ${toBackfill} days for year ${previousYear}`,
                                    created_at: new Date(),
                                    actor: 'system'
                                }
                            })
                        ]);
                        console.log(`[Balance Backfill] NIK: ${user.NIK}, added: ${toBackfill} to ${previousYear}`);
                    }
                } 
            }
        }

        // PERHITUNGAN UNTUK TAHUN BERJALAN
        //console.log(`[DEBUG] NIK: ${user.NIK} - Processing current year: ${currentYear}`);
        
        const firstEligibleMonth = new Date(joinEffective);
        firstEligibleMonth.setMonth(firstEligibleMonth.getMonth() + 3);

        const startOfCurrentYear = new Date(`${currentYear}-01-01`);
        const effectiveStart = firstEligibleMonth > startOfCurrentYear ? firstEligibleMonth : startOfCurrentYear;
        
        //console.log(`[DEBUG] NIK: ${user.NIK} - firstEligibleMonth: ${firstEligibleMonth.toISOString()}, effectiveStart: ${effectiveStart.toISOString()}`);
        
        // Hitung eligible months sampai bulan ini
        let eligibleMonths = 0;
        
        // Normalize dates untuk perbandingan yang akurat
        const todayNormalized = new Date(today.getFullYear(), today.getMonth(), 1);
        const effectiveStartNormalized = new Date(effectiveStart.getFullYear(), effectiveStart.getMonth(), 1);
        
        //console.log(`[DEBUG] NIK: ${user.NIK} - todayNormalized: ${todayNormalized.toISOString()}, effectiveStartNormalized: ${effectiveStartNormalized.toISOString()}`);
        
        if (effectiveStartNormalized <= todayNormalized) {
            eligibleMonths = (todayNormalized.getFullYear() - effectiveStartNormalized.getFullYear()) * 12 +
                           (todayNormalized.getMonth() - effectiveStartNormalized.getMonth()) + 1;
        }

        //console.log(`[DEBUG] NIK: ${user.NIK} - eligibleMonths for current year: ${eligibleMonths}`);

        if (eligibleMonths >= 1) {
            // Hitung yang sudah diberikan untuk tahun ini (EXCLUDE backfill)
            const adjustmentsThisYear = await prisma.tb_balance_adjustment.aggregate({
                where: {
                    NIK: user.NIK,
                    actor: 'system',
                    created_at: {
                        gte: new Date(currentYear, 0, 1, 0, 0, 0, 0),           // 1 Jan 00:00:00 local time
                        lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)    // 31 Dec 23:59:59 local time

                    },
                    notes: {
                        not: { contains: 'backfill' }
                    }
                },
                _sum: {
                    adjustment_value: true
                }
            });

            const alreadyGivenThisYear = adjustmentsThisYear._sum.adjustment_value || 0;
            const toAdd = eligibleMonths - alreadyGivenThisYear;

            //console.log(`[DEBUG] NIK: ${user.NIK} - alreadyGivenThisYear: ${alreadyGivenThisYear}, toAdd: ${toAdd}`);

            if (toAdd > 0) {
                const receiveDate = new Date();
                receiveDate.setHours(12, 0, 0, 0);

                const expiredDate = new Date(receiveDate);
                expiredDate.setFullYear(receiveDate.getFullYear() + 2, 0, 1);

                // Cari existing balance untuk tahun ini
                const existingBalance = await prisma.tb_balance.findFirst({
                    where: {
                        NIK: user.NIK,
                        receive_date: {
                            gte: startOfCurrentYear,
                            lte: new Date(`${currentYear}-12-31T23:59:59`)
                        }
                    }
                });

                //console.log(`[DEBUG] NIK: ${user.NIK} - existingBalance: ${existingBalance ? 'found' : 'not found'}`);

                if (!existingBalance) {
                    // Buat balance baru
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
                    ]);
                    console.log(`[Balance Created] NIK: ${user.NIK}, amount: ${toAdd}`);
                } else {
                    // Update balance existing
                    await prisma.$transaction([
                        prisma.tb_balance.update({
                            where: {
                                id_balance: existingBalance.id_balance
                            },
                            data: {
                                amount: existingBalance.amount + toAdd
                            }
                        }),
                        prisma.tb_balance_adjustment.create({
                            data: {
                                NIK: user.NIK,
                                adjustment_value: toAdd,
                                notes: `add ${toAdd} days of leave`,
                                created_at: new Date(),
                                actor: 'system'
                            }
                        })
                    ]);
                    console.log(`[Balance Updated] NIK: ${user.NIK}, added: ${toAdd}, total: ${existingBalance.amount + toAdd}`);
                }
            } //else {
                //console.log(`[SKIP] NIK: ${user.NIK} - No additional balance needed (toAdd: ${toAdd})`);
            //}
        } //else {
            //console.log(`[SKIP] NIK: ${user.NIK} - Not eligible yet (eligibleMonths: ${eligibleMonths})`);
       // }

    } else {
        console.log(`[SKIP] NIK: ${user.NIK} role: magang`);
    }
};

export const expiredLeave = async () => {
    const now = new Date()
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    try {
        const pendingLeaves = await prisma.tb_leave.findMany({
            where: {
                status: 'pending',
                start_date: {
                    lte: todayDate
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