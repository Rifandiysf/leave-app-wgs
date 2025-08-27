import prisma from "../../utils/client.js";

export const getAllUsers = async (page, limit, search = '', gender = '', statusName = '', roleSlug = '') => {
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
            ...(statusName ? { status: { name: statusName } } : []),
            ...(roleSlug ? { role: { slug: roleSlug } } : []),
        ],
        NOT: {
            tb_roles: {
                slug: "magang"
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

        if (user.tb_roles.slug === 'karyawan_kontrak') { // Use tb_roles.slug
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
            fullname: user.fullname,
            emailKantor: user.email,
            tanggalMasukKerja: user.join_date,
            isActive: user.tb_statuses.name === 'Active', // Use tb_statuses.name
            isMale: user.gender === 'male',
            role: {
                id: user.tb_roles.id, // Use tb_roles.id
                name: user.tb_roles.name // Use tb_roles.name
            },
            status: {
                id: user.tb_statuses.id, // Use tb_statuses.id
                name: user.tb_statuses.name // Use tb_statuses.name
            },
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current,
        };
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return {
        data: {
            employees: result,
            pagination: {
                total: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
}