import prisma from "./client.js";

export const createDateFromString = (dateInput) => {
    if (dateInput instanceof Date) {
        const year = dateInput.getFullYear();
        const month = dateInput.getMonth();
        const day = dateInput.getDate();
        return new Date(Date.UTC(year, month, day));
    }

    const parts = dateInput.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; 
    const day = parseInt(parts[2]);

    return new Date(Date.UTC(year, month, day));
};


export const calculateHolidaysDays = (startDate, endDate) => {
    let workingDays = 0;
    const currentDate = new Date(startDate);
    const finalDate = new Date(endDate);

    while (currentDate <= finalDate) {
        const dayOfWeek = currentDate.getUTCDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDays++;
        }
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return workingDays;
};

export const calculateTotalDays = (startDate, endDate) => {
    return Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ) + 1;
};

export const getUserLeaveBalance = async (NIK) => {
    const currentDate = new Date();

    const activeBalance = await prisma.tb_balance.aggregate({
        _sum: {
            amount: true
        },
        where: {
            NIK: NIK,
            expired_date: {
                gte: currentDate
            }
        }
    });

    return activeBalance._sum.amount || 0;
};


export const getPendingLeaveDays = async (NIK) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDateFirstMonth = new Date(currentYear, 0, 1);

    const pendingRequest = await prisma.tb_leave.aggregate({
        _sum: {
            total_days: true
        },
        where: {
            created_at: {
                gte: currentDateFirstMonth,
                lte: currentDate
            },
            NIK: NIK,
            status: "pending",
            leave_type: {
                in: ["personal_leave", "mandatory_leave"]
            }
        },
    });

    return pendingRequest._sum.total_days || 0;
};

export const getUsedLeaveDays = async (NIK) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDateFirstMonth = new Date(currentYear, 0, 1);

    const usedLeave = await prisma.tb_leave.aggregate({
        _sum: {
            total_days: true
        },
        where: {
            created_at: {
                gte: currentDateFirstMonth,
                lte: currentDate
            },
            NIK: NIK,
            status: "approved",
            leave_type: {
                in: ["personal_leave", "mandatory_leave"]
            }
        },
    });

    return usedLeave._sum.total_days || 0;
};

export const isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= end;
};

export const getYear = (date) => {
    return new Date(date).getFullYear();
};

export const getYearRange = (year = null) => {
    const currentYear = year || new Date().getFullYear();
    return {
        startOfYear: new Date(currentYear, 0, 1),
        endOfYear: new Date(currentYear, 11, 31)
    };
};

export const isWorkingDay = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; 
};


export const getDayName = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[new Date(date).getDay()];
};


export const formatDateIndonesia = (date) => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const calculateLeaveBalance = async (NIK) => {
    const [totalBalance, pendingDays, usedDays] = await Promise.all([
        getUserLeaveBalance(NIK),
        getPendingLeaveDays(NIK),
        getUsedLeaveDays(NIK)
    ]);

    const availableBalance = totalBalance - pendingDays - usedDays;

    return {
        total_balance: totalBalance,
        used_days: usedDays,
        pending_days: pendingDays,
        available_balance: availableBalance
    };
};