import prisma from "../../utils/client.js"
import { createDateFromString, formatDateIndonesia } from "../../utils/leaves.utils.js"

export const getAllBalanceAdjustmentByNIK = async (page, limit, nik, searchValue, startDate, endDate, balanceYear) => {
    try {
        const offset = (page - 1) * limit
        const filter = {
            NIK: nik,
            created_at: {
                gte: startDate || undefined,
                lte: endDate || undefined
            },
            balance_year: balanceYear || undefined,
            OR: [
                {
                    tb_users: {
                        fullname: {
                            contains: searchValue || undefined,
                            mode: "insensitive"
                        }
                    }
                },
                {
                    NIK: {
                        contains: searchValue || undefined,
                        mode: "insensitive"
                    }
                },
                {
                    actor: {
                        contains: searchValue || undefined,
                        mode: "insensitive"
                    }
                }
            ]
        }

        const totalLogs = await prisma.tb_balance_adjustment.count({where: filter });

        console.log('test', searchValue);
        const logs = await prisma.tb_balance_adjustment.findMany({
            skip: offset,
            take: limit,
            omit: {
                id_adjustment: true
            },
            where: filter,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                tb_users: true
            }
        })

        const logsModified = logs.map((log) =>
        ({
            NIK: log.NIK,
            name: log.tb_users.fullname,
            adjustment_value: log.adjustment_value,
            balance_year: log.balance_year.toString(),
            date: formatDateIndonesia(createDateFromString(log.created_at)),
            time: log.created_at.toLocaleTimeString().slice(0, 5).replace('.', ':'),
            actor: log.actor,
            notes: log.notes
        }))

        return {
            data: {
                employees: logsModified, // Renamed 'data' to 'employees' for consistency
                pagination: {
                    total: totalLogs,
                    totalPages: Math.ceil(totalLogs / limit),
                    currentPage: page,
                    limit: limit
                }
            }
        };
    } catch (error) {
        throw error;
    }
};