import prisma from "../../utils/client.js";

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