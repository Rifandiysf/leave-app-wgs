import prisma from "../../utils/client.js";

export const getUserCurrentYearLeaveBalance = async (NIK) => {
    const currentDate = new Date();

    const latestBalance = await prisma.tb_balance.findFirst({
        where: {
            NIK: NIK,
            expired_date: {
                gte: currentDate
            }
        },
        orderBy: {
            expired_date: "desc"
        }
    });

    return latestBalance?.amount || 0;
};