import prisma from "../../utils/client.js";
import { createDateFromString } from "../../utils/leaves.utils.js";

export const getUserByNIK = async (nik) => {
    try {
        const currentDate = createDateFromString(new Date());
        const currentYear = currentDate.getFullYear()
        const currentDateFirstMonth = createDateFromString(new Date(currentYear, 0, 1));
        const currentDateLastMonth = createDateFromString(new Date(currentYear, 11, 31, 23, 59, 59));

        const user = await prisma.tb_users.findUnique({
            select: {
                NIK: true,
                fullname: true,
                email: true,
                isMale: true,
                join_date: true,
                tb_roles: true, 
                tb_statuses: true, 
                tb_balance: {
                    take: 3,
                    orderBy: {
                        expired_date: "desc"
                    }
                },
            },
            where: {
                NIK: nik,
                NOT: {
                    tb_roles: {
                        slug: "magang"
                    }
                }
            }
        });

        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        const { tb_balance, NIK, fullname, isMale } = user;
        const currentBalance = tb_balance.filter((bal) => currentYear === bal.receive_date.getFullYear())?.[0]?.amount ?? 0;
        const lastYearBalance = tb_balance.filter((bal) => currentYear - 1 === bal.receive_date.getFullYear())?.[0]?.amount ?? 0;
        const lastTwoYearBalance = tb_balance.filter((bal) => currentYear - 2 === bal.receive_date.getFullYear())?.[0]?.amount ?? 0;
        const totalAmount = currentDate > createDateFromString(new Date(currentYear, 3, 1)) ? currentBalance + lastYearBalance : currentBalance + lastYearBalance + lastTwoYearBalance

        const pending_request = await prisma.tb_leave.count({
            where: {
                created_at: {
                    lte: currentDate
                },
                NIK: nik,
                status: "pending",
                leave_type: {
                    in: ["personal_leave", "mandatory_leave"]
                }
            },
        });

        const approved_request = await prisma.tb_leave.aggregate({
            _sum: {
                total_days: true
            },
            where: {
                start_date: {
                    gte: currentDateFirstMonth,
                    lte: currentDateLastMonth,
                },
                NIK: NIK,
                status: "approved",
                leave_type: {
                    in: ["personal_leave", "mandatory_leave"]
                }
            },
        });

        const userCopy = {
            NIK: NIK,
            fullname: fullname,
            isMale: isMale,
            status: {
                id: user.tb_statuses.id,
                name: user.tb_statuses.name
            },
            role: {
                id: user.tb_roles.id,
                name: user.tb_roles.name,
                slug: user.tb_roles.slug
            },
            balance: {
                total_amount: totalAmount || 0,
                current_amount: currentBalance,
                carried_amount: lastYearBalance,
                last_two_year_amount: lastTwoYearBalance,
                used_days: approved_request._sum.total_days || 0,
                pending_request: pending_request || 0,
            }
        }

        return userCopy;
    } catch (error) {
        console.log(error);
        throw error;
    }

}