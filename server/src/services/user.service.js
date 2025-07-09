import prisma from "../utils/client.js"

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


export const getLeavesByNIK = async (NIK) => {
    return await prisma.tb_leave.findMany({
        where: {
            NIK: NIK,
        },
    })
}

export const getAllUsers = async () => {
    const currentYear = new Date().getFullYear()
    const lastYear = new Date().getFullYear() - 1

    const users = await prisma.tb_users.findMany({
        orderBy: {
            fullname: 'asc'
        }
    });

    const leaveAmount = await prisma.tb_balance.findMany({
        where: {
            receive_date : {
                gte: new Date(`${lastYear}-01-01`),
                lte: new Date(`${currentYear}-12-31`)
            }
        }
    });

    const result = users.map(user => {
        const userLeaveAmount = leaveAmount.filter(b => b.NIK === user.NIK)

        const currentYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === currentYear)
        const lastYearAmount = userLeaveAmount.find(b => b.receive_date.getFullYear() === lastYear)

        const current = lastYearAmount?.amount || 0;
        const last = currentYearAmount?.amount || 0;

        return {
            nik: user.NIK,
            name: user.fullname,
            gender: user.gender,
            last_year_leave: last,
            this_year_leave: current,
            leave_total: last + current,
            role: user.role,
            status: user.status_active
        }
    });

    return result;
};