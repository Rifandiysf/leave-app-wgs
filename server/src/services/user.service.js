import { date } from "zod/v4";
import prisma from "../utils/client.js"
import { calculateHolidaysDays, createDateFromString } from '../utils/leaves.utils.js';
import { status_active } from "../../generated/prisma/index.js";


export const createLeave = async (data) => {
    let {
        title,
        leave_type,
        start_date,
        reason,
        NIK,
    } = data;

    let end_date = data.end_date;
    let total_days = data.total_days;
    let id_special = null;

    if (leave_type === "special_leave") {
        id_special = data.id_special;
        if (!id_special) {
            throw new Error("id_special is required for special leave");
        }

        const specialLeave = await prisma.tb_special_leave.findUnique({
            where: { id_special }
        });

        if (!specialLeave) {
            throw new Error("Invalid id_special provided");
        }

        const duration = specialLeave.duration;
        const startDate = createDateFromString(start_date);

        let count = 0;
        let tempDate = new Date(startDate);
        while (count < duration - 1) {
            tempDate.setUTCDate(tempDate.getUTCDate() + 1);
            const day = tempDate.getUTCDay();
            if (day !== 0 && day !== 6) {
                count++;
            }
        }

        end_date = tempDate;
        total_days = duration;

        title = specialLeave.title;
        reason = specialLeave.title;
    }

    if (!total_days) {
        total_days = calculateHolidaysDays(
            createDateFromString(start_date), 
            createDateFromString(end_date)
        );
    }

    const leaveData = {
        title,
        leave_type,
        start_date: createDateFromString(start_date),
        end_date: createDateFromString(end_date || start_date),
        reason,
        NIK,
        total_days,
        id_special
    };

    return await prisma.tb_leave.create({
        data: leaveData,
    });
};

export const getLeavesByNIK = async (NIK, page, limit) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_leave.findMany({
            skip,
            take: limit,
            where: { NIK },
            include: {
                tb_leave_log: {
                    orderBy: { changed_at: 'desc' },
                    take: 1,
                    select: {
                        reason: true,
                        tb_users: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.tb_leave.count({ where: { NIK } }),
    ]);

    const transformedData = data.map(item => {
        const log = item.tb_leave_log[0];
        return {
            ...item,
            tb_leave_log: log
                ? log
                : {
                    reason: "-",
                    tb_users: {
                        fullname: "-"
                    }
                }
        };
    });

    return {
        data: transformedData,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};


export const getLeavesById = async (NIK, id_leave) => {
    return await prisma.tb_leave.findMany({
        where: {
            id_leave: id_leave,
            NIK: NIK
        }
    })
}

export const getLeavesByFilterService = async (NIK, type, status, value, page, limit) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereClause = {
        NIK,
    };

    if (type) {
        const typeMapping = {
            personal: 'personal_leave',
            mandatory: 'mandatory_leave',
            special: 'special_leave'
        };

        const mappedType = typeMapping[type.toLowerCase()];
        if (!mappedType) {
            throw new Error('Invalid leave type. Allowed: personal, mandatory, special');
        }

        whereClause.leave_type = mappedType;
    }

    if (status) {
        const allowedStatus = ['pending', 'approved', 'reject'];
        const lowerStatus = status.toLowerCase();

        if (!allowedStatus.includes(lowerStatus)) {
            throw new Error('Invalid leave status. Allowed: pending, approved, reject');
        }

        whereClause.status = lowerStatus;
    }

    if (value) {
        whereClause.OR = [
            {
                title: {
                    contains: value,
                    mode: 'insensitive',
                },
            },
        ];
    }

    const [data, total] = await Promise.all([
        prisma.tb_leave.findMany({
            skip,
            take: limitNum,
            where: whereClause,
            orderBy: { created_at: 'desc' },
            include: {
                tb_leave_log: {
                    orderBy: { changed_at: 'desc' },
                    take: 1,
                    select: {
                        reason: true,
                        tb_users: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.tb_leave.count({ where: whereClause }),
    ]);

    const transformedData = data.map(item => {
        const log = item.tb_leave_log[0];
        return {
            ...item,
            tb_leave_log: log
                ? log
                : {
                    reason: "-",
                    tb_users: {
                        fullname: "-"
                    }
                }
        };
    });

    return {
        data: transformedData,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};


export const getLeaveBalanceByYear = async (nik, year) => {
    const startDate = new Date(`${year}-01-01`)
    const endDate = new Date(`${year}-12-31`)

    return await prisma.tb_balance.findFirst({
        where: {
            NIK: nik,
            receive_date: {
                gte: startDate,
                lte: endDate,
            },
        },
        select: {
            amount: true,
        },
    })
}

export const getAllUsers = async (page, limit, search = '', gender = '', status = '', role = '') => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const filterCondition = {
        AND: [
            {
                OR: [
                    { fullname: { contains: search, mode: 'insensitive' } },
                    { NIK: { contains: search, mode: 'insensitive' } },
                ]
            },
            ...(gender ? [{ gender: gender }] : []),
            ...(status ? [{ status_active: status }] : []),
            ...(role ? [{ role: role }] : [])
        ]
    };

    const users = await prisma.tb_users.findMany({
        where: filterCondition,
        orderBy: {
            fullname: 'asc'
        }
    });

    const leaveAmount = await prisma.tb_balance.findMany({
        where: {
            receive_date: {
                gte: new Date(`${lastYear}-01-01`),
                lte: new Date(`${currentYear}-12-31`)
            }
        }
    });

    const result = users.map(user => {
        const userLeaveAmount = leaveAmount.filter(b => b.NIK === user.NIK);

        let current = 0;
        let last = 0;

        if (user.role === 'karyawan_kontrak') {
            // Karyawan kontrak: jumlahkan seluruh amount berdasarkan tahun
            current = userLeaveAmount
                .filter(b => b.receive_date.getFullYear() === currentYear)
                .reduce((sum, item) => sum + item.amount, 0);

            last = userLeaveAmount
                .filter(b => b.receive_date.getFullYear() === lastYear)
                .reduce((sum, item) => sum + item.amount, 0);
        } else {
            // Karyawan tetap: ambil satu record per tahun
            const currentYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === currentYear);
            const lastYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === lastYear);

            current = currentYearAmount?.amount || 0;
            last = lastYearAmount?.amount || 0;
        }

        return {
            nik: user.NIK,
            name: user.fullname,
            gender: user.gender,
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current,
            role: user.role,
            status: user.status_active
        };
    });

    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedResult = result.slice(start, start + limit);

    return {
        data: paginatedResult,
        total,
        totalPages,
        page,
    };
};




export const getUserByNIK = async (nik) => {
    try {
        const currentDate = new Date();
        const currentDateFirstMonth = new Date(new Date().getFullYear(), 0, 1);

        const user = await prisma.tb_users.findUnique({
            omit: {
                password: true,
                email: true,
            },
            where: {
                NIK: nik,
                NOT: {
                    role: "magang"
                }
            },
            include: {
                tb_balance: {
                    where: {
                        expired_date: {
                            gte: new Date()
                        }
                    },
                    orderBy: {
                        expired_date: "desc"
                    }
                },
            }
        });

        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        const { tb_balance, NIK, fullname, gender, status_active } = user;
        const currentBalance = tb_balance.filter((bal) => new Date().getFullYear() === bal.receive_date.getFullYear()).reduce((sum, bal) => sum + bal.amount, 0) ?? 0;
        const lastYearBalance = tb_balance.filter((bal) => new Date().getFullYear() !== bal.receive_date.getFullYear()).reduce((sum, bal) => sum + bal.amount, 0) ?? 0;
        let maxReceiveAmount = user.role === "karyawan_kontrak" ? 1 : 12;

        const pending_request = await prisma.tb_leave.aggregate({
            _sum: {
                total_days: true
            },
            where: {
                created_at: {
                    gte: currentDateFirstMonth,
                    lte: currentDate
                },
                NIK: nik,
                status: "pending",
                leave_type: {
                    in: ["personal_leave", "mandatory_leave"]
                }
            },
        });

        const approved_request = await prisma.tb_leave.aggregate({
            _sum: {
                total_days: true
            },
            where: {
                end_date: {
                    gte: currentDateFirstMonth,
                    lte: currentDate,
                },
                NIK: NIK,
                status: "approved",
                leave_type: {
                    in: ["personal_leave", "mandatory_leave"]
                }
            },
        });

        console.log('adasd', pending_request._sum.total_days);

        const userCopy = {
            NIK: NIK,
            fullname: fullname,
            gender: gender,
            status_active: status_active,
            role: user.role,
            balance: {
                total_amount: currentBalance + lastYearBalance || 0,
                current_amount: currentBalance,
                carried_amount: lastYearBalance,
                days_used: approved_request._sum.total_days || 0,
                pending_request: pending_request._sum.total_days || 0,
            }
        }

        return userCopy;
    } catch (error) {
        throw error;
    }

}

export const updateUserByNIK = async (nik, data) => {
    const updatedUser = await prisma.tb_users.update({
        where: {
            NIK: nik
        },
        data: {
            status_active: "active",
            join_date: new Date()
        }
    })

    if (!updatedUser) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error
    }

    return updatedUser
}

export const deleteUserByNIK = async (nik) => {
    const deletedUser = await prisma.tb_users.update({
        where: {
            NIK: nik,
            NOT: {
                status_active: "resign"
            }
        },
        data: {
            status_active: "resign"
        }
    })

    return deletedUser;

    // inactive all leave related to the user 
    // const userLeaves = await prisma.tb_leave.updateMany({
    //     where: {
    //         NIK: nik
    //     },
    //     data: {
    //         // update user leaves to incative
    //     }
    // })

}

export const adjustModifyAmount = async (nik, adjustment_value, notes, actor, targetRole) => {
    if (adjustment_value < 0) {
        throw new Error('Adjustment value must not be negative');
    }

    if (actor?.nik === nik) {
        throw new Error('You are not allowed to add your own leave balance');
    }

    if (targetRole === 'magang') {
        throw new Error('Cannot adjust leave balance for intern')
    }

    let balance;

    if (targetRole === 'karyawan_kontrak') {
        balance = await prisma.tb_balance.findFirst({
            where : {NIK : nik},
            orderBy : {receive_date : 'desc'}
        })
    } else {
        const thisYear = new Date().getFullYear()
        balance = await prisma.tb_balance.findFirst({
        where : {
            NIK: nik, 
            receive_date: {
                gte: new Date(`${thisYear}-01-01`),
                lte: new Date(`${thisYear}-12-31`)
            }
        }
    })
    }
    
    if(!balance) {
        throw new Error('Balance for current year not found')
    }

    const updatedAmount = await prisma.$transaction([
        prisma.tb_balance.update({
            where: { id_balance: balance.id_balance },
            data: {
                amount: {
                    increment: adjustment_value
                }
            }
        }),

        prisma.tb_balance_adjustment.create({
            data: {
                adjustment_value,
                notes,
                actor: actor.role,
                NIK: nik,
                created_at: new Date()
            }
        })
    ])

    return updatedAmount
}