import prisma from "../../utils/client.js";

export const getUserByNIK = async (nik) => {
    try {
        const currentDate = new Date();
        const currentDateFirstMonth = new Date(new Date().getFullYear(), 0, 1);
        const currentDateLastMonth = new Date(new Date().getFullYear(), 11, 31);

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
                    take: 2,
                    where: {
                        expired_date: {
                            gte: new Date()
                        }
                    },
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
        const currentBalance = tb_balance.filter((bal) => new Date().getFullYear() === bal.receive_date.getFullYear())?.[0]?.amount ?? 0;
        const lastYearBalance = tb_balance.filter((bal) => new Date().getFullYear() !== bal.receive_date.getFullYear())?.[0]?.amount ?? 0;

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
                name: user.tb_roles.name
            },
            balance: {
                total_amount: currentBalance + lastYearBalance || 0,
                current_amount: currentBalance,
                carried_amount: lastYearBalance,
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