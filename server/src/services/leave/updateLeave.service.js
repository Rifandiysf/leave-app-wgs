import prisma from "../../utils/client.js";
import { createDateFromString } from "../../utils/leaves.utils.js";

export const updateLeave = async (id, status, reason, nik) => {
    try {
        const currentYear = new Date().getFullYear();
        const currentDate = new Date()
        const currentDateFirstMonth = new Date(currentYear, 0, 1)
        const currentYearLastMonth = new Date(currentYear, 11, 31, 23, 59, 59);
        console.log(currentYearLastMonth)

        const data = await prisma.tb_leave.findUnique({
            where: {
                id_leave: id,
            },
            include: {
                tb_users: true,
                tb_leave_log: {
                    take: 1,
                    orderBy: {
                        changed_at: "desc"
                    }
                }
            }
        });

        if (!data) {
            const err = new Error("Leave not found");
            err.statusCode = 404;
            throw err;
        }

        const start = createDateFromString(new Date(data.start_date));
        const end = createDateFromString(new Date(data.end_date));

        1

        if (start <= currentDate && data.leave_type !== 'special_leave') {
            const err = new Error("The start date of the leave has passed the current date");
            err.statusCode = 400;
            throw err;
        } else if (start < new Date().setHours(0, 0, 0, 0) && data.leave_type === 'special_leave') {
            const err = new Error("The start date of tssshe leave has passed the current date");
            err.statusCode = 400;
            throw err;
        }

        if (data.status === status && data.leave_type !== "mandatory_leave") {
            const err = new Error("New status and old status can't be the same");
            err.statusCode = 400;
            throw err;
        }

        const existing = await prisma.tb_leave.findFirst({
            where: {
                NIK: data.NIK,
                OR: [
                    {
                        start_date: { lte: end },
                        end_date: { gte: start },
                    },
                ],
                status: {
                    in: ["approved", "pending", "expired"]
                },
                NOT: {
                    id_leave: data.id_leave
                }
            },
        });

        const userBalance = await prisma.tb_balance.findMany({
            where: {
                NIK: data.NIK,
                expired_date: {
                    gt: new Date(),
                },
                receive_date: {
                    lte: currentYearLastMonth
                }
            },
            take: 2,
            orderBy: {
                expired_date: "desc" // [0] = currentYearBalance && [-1] = lastYearBalance
            }
        });

        console.log('before: ', userBalance);

        let updatedBalances = [...userBalance];
        let balancesUsed = [];
        let currentBalancesOnly = [];
        let historyBalancesUsed = [];
        let totalDaysUsed = data.total_days;

        if (data.tb_leave_log.length !== 0) {
            historyBalancesUsed = data.tb_leave_log[0].balances_used
        }

        const isStartDateNextYear = new Date().getFullYear() < data.start_date.getFullYear();
        console.log(isStartDateNextYear);
        const currentYearBalance = userBalance.find(balance => balance.receive_date.getFullYear() === currentYear);

        if ((isStartDateNextYear && totalDaysUsed > currentYearBalance.amount) && data.leave_type === "personal_leave") {
            const err = new Error(`Cannot approve leave for next year because total days ${totalDaysUsed} exceed current year\'s balance ${currentYearBalance.amount}`);
            err.statusCode = 400;
            throw err;
        }

        if (data.leave_type !== "special_leave") {
            // reduce
            // array di loop ini disort dari paling lama/ [-1] = currentBalance
            if ((data.status === "pending" || data.status === "rejected") && status === "approved") {

                if (existing) {
                    const err = new Error("There's overlap leave");
                    err.statusCode = 400;
                    throw err;
                }

                function reduceAmount(balances, daysUsed) {
                    for (let i = 0; i < balances.length; i++) {
                        let tempDays = balances[i].amount
                        balances[i].amount -= daysUsed;

                        if (balances[i].amount < 0 && i !== balances.length - 1) {
                            daysUsed = -1 * balances[i].amount
                            balances[i].amount = 0;
                        } else {
                            daysUsed = 0;
                        }

                        balancesUsed.push([balances[i].id_balance, balances[i].receive_date.getFullYear(), tempDays - balances[i].amount]);
                    }

                    return balances
                }

                if (isStartDateNextYear) {
                    updatedBalances = reduceAmount(updatedBalances, totalDaysUsed);
                    console.log(updatedBalances);
                } else {
                    updatedBalances = reduceAmount(updatedBalances.reverse(), totalDaysUsed);
                    console.log(updatedBalances)
                }
            }

            // restore
            // array di loop ini disort dari paling baru/ [0] = currentBalance
            if (data.status === "approved" && status === "rejected") {
                const restoredBalance = updatedBalances;

                for (let i = 0; i < restoredBalance.length; i++) {
                    const balance = restoredBalance[i];
                    balance.amount += historyBalancesUsed.find((item) => item[0] === balance.id_balance)?.[2] ?? 0;
                }
            }
        }

        if (data.leave_type == "personal_leave" && userBalance.find((bal) => bal.receive_date.getFullYear() === new Date().getFullYear())?.amount < 0) {
            const error = new Error('Insufficient leave balance');
            error.statusCode = 400;
            throw error;
        }

        const balanceUpdates = userBalance.map((balance) =>
            prisma.tb_balance.update({
                where: { id_balance: balance.id_balance },
                data: { amount: balance.amount }
            })
        );

        const result = await prisma.$transaction([
            prisma.tb_leave.update({ where: { id_leave: id }, data: { status: status } }),
            ...balanceUpdates,
            prisma.tb_leave_log.create({
                data: {
                    old_status: data.status,
                    new_status: status,
                    reason: reason,
                    changed_by_nik: nik,
                    id_leave: data.id_leave,
                    changed_at: new Date(),
                    balances_used: balancesUsed.sort((a, b) => b[1] - a[1]) ?? []
                }
            })
        ])

        return result[0]
    } catch (error) {
        throw error;
    }
}