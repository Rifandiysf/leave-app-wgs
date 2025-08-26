import prisma from "../../utils/client.js";

export const statisticDashboard = async () => {
    const today = new Date()

    //total karyawan
    const totalEmployees = await prisma.tb_users.count();
    const activeEmployees = await prisma.tb_users.count({
        where : {
            status_active : 'active'
        }
    });
    const resignEmployees = totalEmployees - activeEmployees;

    //total cuti tahun ini
    const startYear = new Date(today.getFullYear(), 0, 1);
    const endYear = new Date(today.getFullYear(), 11, 31);
    const thisYearLeave = await prisma.tb_leave.count({
        where : {
            start_date: {
                gte : startYear,
                lte: endYear
            },
            status : 'approved'
        }
    });

    //total karyawan cuti mingguan
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const weeklyLeave = await prisma.tb_leave.findMany({
        where : {
            start_date: {
                gte: lastWeek,
                lte: today
            },
        },
        distinct: ['NIK']
    });

    //cuti pending
    const pendingLeaves = await prisma.tb_leave.count({
        where: {
            status: 'pending'
        }
    });

    return {
        totalEmployees: {
            total: totalEmployees,
            activeEmployees,
            resignEmployees
        },
        thisYearLeave,
        weeklyLeave: weeklyLeave.length,
        pendingLeaves
    }
}