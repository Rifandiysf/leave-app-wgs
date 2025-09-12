import prisma from "../../utils/client.js";

export const getAllUsers = async (page, limit, search = '', isMale, statusName = '', roleSlug = '', isActive) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const lastTwoYear = currentYear - 2;

    const filterCondition = {
        AND: [
            {
                OR: [
                    { fullname: { contains: search, mode: 'insensitive' } },
                    { NIK: { contains: search, mode: 'insensitive' } },
                ]
            },
                        ...(isMale !== undefined ? [{ isMale: isMale }] : []),
            ...(statusName ? [{ tb_statuses: { name: statusName } }] : []),
            ...(roleSlug ? [{ tb_roles: { slug: roleSlug } }] : []),
            ...(isActive !== undefined ? [{ isActive: isActive }] : []),
        ],
        NOT: {
            tb_statuses: {
                name: "Magang"
            }
        }
    };

    const totalUsers = await prisma.tb_users.count({
        where: filterCondition
    });

    const users = await prisma.tb_users.findMany({
        where: filterCondition,
        orderBy: {
            fullname: 'asc'
        },
        include: {
            tb_roles: true, // Include role data
            tb_statuses: true // Include status data
        },
        skip: (page - 1) * limit,
        take: limit
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
        let lastTwo = 0;

        if (user.tb_roles.slug === 'karyawan_kontrak') {
            current = userLeaveAmount
                .filter(b => b.receive_date.getFullYear() === currentYear)
                .reduce((sum, item) => sum + item.amount, 0);

            last = userLeaveAmount
                .filter(b => b.receive_date.getFullYear() === lastYear)
                .reduce((sum, item) => sum + item.amount, 0);
            lastTwo = userLeaveAmount
                .filter(b => b.receive_date.getFullYear() === lastTwoYear)
                .reduce((sum, item) => sum + item.amount, 0);
        } else {
            const currentYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === currentYear);
            const lastYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === lastYear);
            const lastTwoYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === lastTwoYear);

            current = currentYearAmount?.amount || 0;
            last = lastYearAmount?.amount || 0;
            lastTwo = lastTwoYearAmount?.amount || 0;
        }

        return {
            nik: user.NIK,
            fullname: user.fullname,
            emailKantor: user.email,
            tanggalMasukKerja: user.join_date,
            isActive: user.isActive,
            isMale: user.isMale,
            role: {
                id: user.tb_roles.id,
                name: user.tb_roles.name
            },
            status: {
                id: user.tb_statuses.id, 
                name: user.tb_statuses.name 
            },
            last_two_year_leave: lastTwo,
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current + lastTwo,
        };
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return {
        data: {
            data: result,
            pagination: {
                total: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
}