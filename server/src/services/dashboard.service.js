import { gte } from "zod/v4";
import prisma from "../utils/client.js";

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

export const trendDashboard = async (year) => {
    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    const leaveData = await prisma.tb_leave.findMany({
        where : {
            status: 'approved',
            start_date: {
                gte: startDate,
                lte: endDate
            }
        },
        select : {
            start_date: true,
            leave_type: true
        }
    })
    
    if(!leaveData) {
        throw new Error('Leave data not found');
    }


    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
    ]

    const monthlyTrend = months.map(m => ({
        month: m,
        "mandatory_leave" : 0,
        "special_leave" : 0,
        "personal_leave" : 0
    }))

    leaveData.forEach(item => {
        const monthIndex = new Date(item.start_date).getMonth()
        
        switch(item.leave_type) {
            case "mandatory_leave" :
                monthlyTrend[monthIndex]["mandatory_leave"] += 1
                break;
            case "special_leave" :
                monthlyTrend[monthIndex]["special_leave"] += 1
                break;
            case "personal_leave" :
                monthlyTrend[monthIndex]["personal_leave"] += 1
                break;
            default :
            break;
        }
    })

    return monthlyTrend;
}

export const leaveLeaderboard = async (order = "desc") => {
    const users = await prisma.tb_users.findMany({
        include: {
            tb_balance: true,
            tb_leave: {
                where: {
                    status: 'approved',
                },
                select: {
                    total_days: true,
                    start_date: true,
                    end_date: true
                }
            }
        }
    });

    const today = new Date();
    const currentYear = today.getFullYear();

    const leaderboard = users.map(user => {
        const joinYear = new Date(user.join_date).getFullYear();
        const yearCount = Math.max(1, (currentYear - joinYear) + 1); // minimal 1 tahun

        // Jatah cuti tahun ini
        const currentBalance = user.tb_balance.find(
            b => new Date(b.receive_date).getFullYear() === currentYear
        );

        // Jatah cuti tahun lalu
        const lastYearBalance = user.tb_balance.find(
            b => new Date(b.receive_date).getFullYear() === currentYear - 1
        );

        // Total cuti terpakai
        const usedLeave = user.tb_leave.reduce((sum, l) => sum + (l.total_days || 0), 0);

        // Sisa cuti
        const remainingLeave = (lastYearBalance ? lastYearBalance.amount : 0) +
                                (currentBalance ? currentBalance.amount : 0);

        // Rata-rata cuti dipakai per tahun sejak join
        const avgUsed = usedLeave / yearCount;
        const avgFormatted = Number.isInteger(avgUsed)
            ? `${avgUsed} hari/tahun`
            : `${avgUsed.toFixed(2)} hari/tahun`;

        return {
            NIK: user.NIK,
            name: user.fullname,
            role: user.role,
            tahun_ini: currentBalance ? currentBalance.amount : 0,
            tahun_lalu: lastYearBalance ? lastYearBalance.amount : 0,
            sisa_cuti: remainingLeave,
            rerata_cuti: avgFormatted 
        };
    });

    // urutkan berdasarkan sisa cuti
    leaderboard.sort((a, b) => {
        return order === "asc"
            ? a.sisa_cuti - b.sisa_cuti
            : b.sisa_cuti - a.sisa_cuti;
    });

    return leaderboard;
};
