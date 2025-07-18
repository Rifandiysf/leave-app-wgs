import prisma from "../utils/client.js"
import { calculateWorkingDays } from '../utils/leaves.utils.js';

export const createLeave = async (data) => {
    const {
        title,
        leave_type,
        start_date,
        reason,
        NIK,
    } = data;

    let end_date = data.end_date;
    let total_days = data.total_days;
    let id_special = null;
    let id_mandatory = null;

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
        const startDate = new Date(start_date);

        // ⏱ Hitung end_date = start_date + (duration - 1) hari kerja
        let count = 0;
        let tempDate = new Date(startDate);
        while (count < duration - 1) {
            tempDate.setDate(tempDate.getDate() + 1);
            const day = tempDate.getDay();
            if (day !== 0 && day !== 6) {
                count++;
            }
        }

        end_date = tempDate;
        total_days = duration;

    } else if (leave_type === "mandatory_leave") {
        id_mandatory = data.id_mandatory;
        if (!id_mandatory) {
            throw new Error("id_mandatory is required for mandatory leave");
        }

        const mandatoryLeaveExists = await prisma.tb_mandatory_leave.findUnique({
            where: { id_mandatory }
        });
        if (!mandatoryLeaveExists) {
            throw new Error("Invalid id_mandatory provided");
        }
    }

    // Untuk personal atau mandatory (bukan special), total_days dihitung dari working days
    if (!total_days) {
        total_days = calculateWorkingDays(new Date(start_date), new Date(end_date));
    }

    const leaveData = {
        title,
        leave_type,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        reason,
        NIK,
        total_days,
        id_special,
        id_mandatory
    };

    return await prisma.tb_leave.create({
        data: leaveData,
    });
};





export const getLeavesByNIK = async (NIK) => {
    return await prisma.tb_leave.findMany({
        where: {
            NIK: NIK,
        },
    })
}

export const getLeavesById = async (NIK, id_leave) => {
    return await prisma.tb_leave.findMany({
        where: {
            id_leave: id_leave,
            NIK: NIK
        }
    })
}

export const getLeavesByFilterService = async (NIK, type, status, value) => {
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
            throw new Error('Invalid leave status. Allowed: waiting, approved, reject');
        }
        whereClause.status = lowerStatus;
    }

    if (value) {
        whereClause.OR = [
            {
                title: {
                    contains: value, mode: 'insensitive'
                }
            }
        ]
    }

    return await prisma.tb_leave.findMany({
        where: whereClause
    });
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

export const getAllUsers = async (page, limit, search = '') => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const users = await prisma.tb_users.findMany({
        where: {
            OR: [
                { fullname: { contains: search, mode: 'insensitive' } },
                { NIK: { contains: search, mode: 'insensitive' } },
            ]
        },
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

        const currentYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === currentYear);
        const lastYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === lastYear);

        const current = currentYearAmount?.amount || 0;
        const last = lastYearAmount?.amount || 0;

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
    const currentBalance = tb_balance[0] ? tb_balance[0].amount : 0;
    const lastYearBalance = tb_balance[1] ? tb_balance[1].amount : 0;
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
            NIK: nik,
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
            pending_request: pending_request._sum.total_days || 0,
        }
    }

    return userCopy;
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