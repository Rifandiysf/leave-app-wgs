import prisma from "../../utils/client.js";

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