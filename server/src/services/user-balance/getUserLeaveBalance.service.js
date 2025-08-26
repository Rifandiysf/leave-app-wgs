import prisma from "../../utils/client.js";

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