import prisma from "../../utils/client.js";

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