import { PrismaClient } from '@prisma/client';
import { calculateWorkingDays } from '../utils/leaves.utils.js';

const prisma = new PrismaClient();


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

// user.service.js

export const getAllUsers = async () => {
    const currentYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;

    const users = await prisma.tb_users.findMany({
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
            NIK: user.NIK,                 
            fullname: user.fullname,       
            email: user.email,             
            gender: user.gender,
            role: user.role,
            status_active: user.status_active, 
            join_date: user.join_date,     
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current,
        };
    });

    return result;
};

export const getUserByNIK = async (nik) => {
    try {
        const user = await prisma.tb_users.findUnique({
            where: {
                NIK: nik
            },
            select: {
                NIK: true,
                fullname: true,
                email: true,
                gender: true,
                role: true,
                status_active: true,
                join_date: true,
            }
        });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return user;
    } catch (error) {
        throw error;
    }
};

export const updateUserByNIK = async (nik, userData) => {
    try {
        const updatedUser = await prisma.tb_users.update({
            where: {
                NIK: nik
            },
            data: userData,
            select: {
                NIK: true,
                fullname: true,
                email: true,
                gender: true,
                role: true,
                status_active: true,
                join_date: true,
            }
        });

        return updatedUser;
    } catch (error) {
        throw error;
    }
};
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

// user.service.js

// Tambahkan fungsi baru ini di file service-mu
export const filterUsersService = async (queryParams) => {
    const { gender, status, role, search } = queryParams;

    const whereClause = {};

    if (gender) {
        whereClause.gender = gender;
    }
    if (status) {
        whereClause.status_active = status;
    }
    if (role) {
        whereClause.role = role;
    }
    if (search) {
        // Mencari di kolom fullname atau NIK
        whereClause.OR = [
            { fullname: { contains: search, mode: 'insensitive' } },
            { NIK: { contains: search, mode: 'insensitive' } }
        ];
    }

    const users = await prisma.tb_users.findMany({
        where: whereClause,
        orderBy: {
            fullname: 'asc'
        }
    });

    // Kode ini untuk menggabungkan data user dengan data sisa cuti mereka
    // Sama seperti di fungsi getAllUsers
    const currentYear = new Date().getFullYear();
    const lastYear = new Date().getFullYear() - 1;
    const userNIKs = users.map(u => u.NIK);

    const leaveBalances = await prisma.tb_balance.findMany({
        where: {
            NIK: { in: userNIKs },
            receive_date: {
                gte: new Date(`${lastYear}-01-01`),
                lte: new Date(`${currentYear}-12-31`)
            }
        }
    });

    const result = users.map(user => {
        const userBalances = leaveBalances.filter(b => b.NIK === user.NIK);
        const currentYearAmount = userBalances.find(b => b.receive_date.getFullYear() === currentYear);
        const lastYearAmount = userBalances.find(b => b.receive_date.getFullYear() === lastYear);
        const current = currentYearAmount?.amount || 0;
        const last = lastYearAmount?.amount || 0;

        return {
            ...user,
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current,
        };
    });

    return result;
};