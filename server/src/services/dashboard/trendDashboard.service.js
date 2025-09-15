import prisma from "../../utils/client.js";

export const trendDashboard = async (year) => {
    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    // cari semua leave dengan tahun unik
    const distinctYears = await prisma.tb_leave.findMany({
        where: {
            status: 'approved',
        },
        select: {
            start_date: true,
        },
        orderBy: {
            start_date: 'asc'
        }
    });

    // ambil hanya tahun unik
    const availableYears = [...new Set(distinctYears.map(l => new Date(l.start_date).getFullYear()))];

    // ambil data leave untuk tahun yang dipilih
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
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
    ];

    const monthlyTrend = months.map(m => ({
        month: m,
        "mandatory_leave" : 0,
        "special_leave" : 0,
        "personal_leave" : 0
    }));

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
    });

    return {
        availableYears,
        monthlyTrend
    };
}