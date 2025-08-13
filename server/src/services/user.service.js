import { date } from "zod/v4";
import prisma from "../utils/client.js"
import { calculateHolidaysDays, calculateMandatoryLeaveDays, createDateFromString, formatDateIndonesia } from '../utils/leaves.utils.js';
import { leave_type, status_active } from "../../generated/prisma/index.js";
import { decodeToken } from "../utils/jwt.js";
import { updateLeave } from "./leave.service.js";

export const createLeave = async (data) => {
    let {
        title,
        leave_type,
        start_date,
        reason,
        NIK,
        status
    } = data;

    console.log("Data di createLeave (full object):", JSON.stringify(data, null, 2));
    console.log("STATUS di createLeave:", status);
    console.log("Type of status:", typeof status);

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

    if (leave_type === 'mandatory_leave') {
        const { id_mandatory } = data;

        if (!status) {
            throw new Error("Status is required for mandatory leave and cannot be undefined.");
        }

        const mandatoryLeave = await prisma.tb_mandatory_leave.findUnique({
            where: { id_mandatory }
        });

        if (!mandatoryLeave) {
            throw new Error("Invalid id_mandatory provided");
        }

        let finalReason;
        if (status === "approved") {
            finalReason = "-";
        } else if (status === "rejected") {
            if (!reason || reason.trim() === "") {
                throw new Error("Reason is required when status is rejected");
            }
            finalReason = reason;
        } else {
            finalReason = data.reason || "mandatory leave created";
        }

        const startDate = mandatoryLeave.start_date;
        const endDate = mandatoryLeave.end_date;

        total_days = calculateMandatoryLeaveDays(
            createDateFromString(startDate),
            createDateFromString(endDate)
        );

        const createdLeave = await prisma.tb_leave.create({
            data: {
                title: mandatoryLeave.title,
                leave_type: 'mandatory_leave',
                start_date: startDate,
                end_date: endDate,
                reason: finalReason,
                NIK,
                total_days,
                id_mandatory,
                status: status 
            }
        });


        if (status !== 'pending') {
            try {
                await prisma.tb_leave.update({
                    where: { id_leave: createdLeave.id_leave },
                    data: { status: 'pending' }
                });

                const updatedLeave = await updateLeave(
                    createdLeave.id_leave,
                    status,
                    finalReason,
                    NIK
                );
                
                return updatedLeave;
            } catch (error) {
                await prisma.tb_leave.delete({
                    where: { id_leave: createdLeave.id_leave }
                });
                throw error;
            }
        }

        return createdLeave;
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

export const createLeaveRequest = async (req, res, next) => {
    try {
        const user = await decodeToken(req.cookies["Authorization"]);

        console.log("Raw request body:", req.body);
        console.log("Request headers:", req.headers);
        console.log("Content-Type:", req.headers['content-type']);

        const leave = await createLeave({
            ...req.body,
            NIK: user.NIK,
            total_days: req.workingDays
        });

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave,
        });
    } catch (error) {
        next(error);
    }
};

// Refactored createLeave function

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
        const allowedStatus = ['pending', 'approved', 'rejected'];
        const lowerStatus = status.toLowerCase();

        if (!allowedStatus.includes(lowerStatus)) {
            throw new Error('Invalid leave status. Allowed: pending, approved, rejected');
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
        ],
        NOT: {
            role: "magang"
        }
    };

    const users = await prisma.tb_users.findMany({
        where: filterCondition,
        orderBy: {
            fullname: 'asc'
        }
    });

    const leaveAmount = await prisma.tb_balance.findMany({
        where: {
            expired_date: {
                gte: new Date()
            }
        },
        orderBy: {
            expired_date: "desc"
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
            status: user.status_active,
            join_date: user.join_date
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
                    take: 2,
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
        const currentBalance = tb_balance.filter((bal) => new Date().getFullYear() === bal.receive_date.getFullYear())?.[0]?.amount ?? 0;
        const lastYearBalance = tb_balance.filter((bal) => new Date().getFullYear() !== bal.receive_date.getFullYear())?.[0]?.amount ?? 0;

        const pending_request = await prisma.tb_leave.count({
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
                pending_request: pending_request || 0,
            }
        }

        return userCopy;
    } catch (error) {
        console.log(error);
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

export const adjustModifyAmount = async (nik, adjustment_value, notes, actor, targetRole, leave_type) => {
    if (!leave_type || (leave_type !== 'this_year_leave' && leave_type !== 'last_year_leave')) {
        throw new Error("Parameter 'leave_type' harus 'this_year_leave' atau 'last_year_leave'");
    }
    if (adjustment_value <= 0) {
        throw new Error('Adjustment value must be positive');
    }
    if (actor?.nik === nik) {
        throw new Error('You are not allowed to add your own leave balance');
    }
    if (targetRole === 'magang') {
        throw new Error('Cannot adjust leave balance for intern');
    }

    const currentYear = new Date().getFullYear();
    const targetYear = (leave_type === 'last_year_leave')
        ? currentYear - 1
        : currentYear;

    let balance;

    if (targetRole === 'karyawan_kontrak') {
        balance = await prisma.tb_balance.findFirst({
            where: {
                NIK: nik,
                receive_date: {
                    gte: new Date(`${targetYear}-01-01`),
                    lte: new Date(`${targetYear}-12-31`),
                }
            },
            orderBy: { receive_date: 'desc' }
        });
    } else {
        const startOfYear = new Date(`${targetYear}-01-01`);
        const endOfYear = new Date(`${targetYear}-12-31`);
        balance = await prisma.tb_balance.findFirst({
            where: {
                NIK: nik,
                receive_date: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            }
        });
    }

    if (!balance) {
        const newBalanceData = {
            NIK: nik,
            amount: adjustment_value,
            receive_date: new Date(`${targetYear}-01-01`),
            expired_date: new Date(`${targetYear + 2}-01-01`),
        };

        const [newBalance, adjustmentLog] = await prisma.$transaction([
            prisma.tb_balance.create({ data: newBalanceData }),
            prisma.tb_balance_adjustment.create({
                data: {
                    adjustment_value,
                    notes,
                    actor: actor.role,
                    NIK: nik,
                    created_at: new Date()
                }
            })
        ]);
        return [newBalance, adjustmentLog];
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
    ]);

    return updatedAmount;
};

export const getAllMandatoryLeavesService = async (page = 1, limit = 10, req) => {
    const skip = (page - 1) * limit;

    const decoded = await decodeToken(req.cookies["Authorization"]);
    const userNIK = decoded.NIK;

    const [rawData, total] = await Promise.all([
        prisma.tb_mandatory_leave.findMany({
            skip,
            take: limit,
            orderBy: { start_date: 'asc' },
            where: { is_active: true }
        }),
        prisma.tb_mandatory_leave.count({
            where: { is_active: true }
        })
    ]);

    const userLeaves = await prisma.tb_leave.findMany({
        where: {
            NIK: userNIK,
            leave_type: leave_type.mandatory_leave
        },
        select: {
            id_mandatory: true,
            status: true
        }
    });

    const leaveMap = {};
    for (const leave of userLeaves) {
        leaveMap[leave.id_mandatory] = leave.status;
    }

    const data = rawData.map(item => {
        const formattedDate = createDateFromString(item.start_date);
        const tanggalFormatted = formatDateIndonesia(formattedDate);
        const message = `konfimasi cuti sebelum tanggal ${tanggalFormatted}`;

        const status = leaveMap[item.id_mandatory];
        let taken = false;

        if (status === 'approved') {
            taken = true;
        } else if (status === 'rejected') {
            taken = false;
        }

        return { ...item, message, taken };

    });

    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages, page };
};
export const getLeaveTrendByNik = async (nik) => {
    const user = await prisma.tb_users.findUnique({
        where : {NIK : nik},
        select : {join_date : true}
    })

    if (!user) {
        return {
            message : `User with NIK ${nik} not found`,
            trend : {}
        }
    }

    const joinYear = user.join_date.getFullYear()
    const currentYear = new Date().getFullYear()
    
    const leaves = await prisma.tb_leave.findMany({
        where : {
            NIK: nik,
            status: 'approved',
            start_date: {
                gte : user.join_date
            }
        },
        orderBy : {
            start_date : 'asc'
        }
    })

    if (leaves.length === 0) {
        return {
            message : `There is no leave data for NIK ${nik} since joining in ${joinYear}`,
            trend : {}
        }
    }

    const trend = {}
    for (let year = joinYear; year <= currentYear; year++) {
        trend[year] = {
            mandatory_leave : 0,
            special_leave : 0,
            personal_leave : 0
        }
    }
 
    leaves.forEach((leave) => {
        const year = leave.start_date.getFullYear()
        const leaveType = leave.leave_type?.toLowerCase()

        if(!leaveType) {
            throw new Error(`Unknown leave type ${leaveType}`);
            return;
        }

        trend[year][leaveType] += 1
    })

    return {
        message : `Successfully get leave data trends for NIK ${nik}` ,
        trend
    }
}
