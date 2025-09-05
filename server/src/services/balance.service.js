import { Prisma } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js"
import { createDateFromString, formatDateIndonesia } from "../utils/leaves.utils.js"

export const getAllBalanceAdjustment = async (page, limit, startDate, endDate, balanceYear, searchValue) => {
    try {
        const offset = (page - 1) * limit
        const totalLogs = await prisma.tb_balance_adjustment.count();

        console.log('test', searchValue);
        const logs = await prisma.tb_balance_adjustment.findMany({
            skip: offset,
            take: limit,
            omit: {
                id_adjustment: true
            },
            where: {
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
            },
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
            time: log.created_at.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: undefined }).replace('.', ':'),
            actor: log.actor,
            notes: log.notes
        }))

        const result = {
            data: logsModified,
            total: totalLogs,
            totalPages: Math.ceil(totalLogs / limit),
            page: page
        }

        return result
    } catch (error) {
        throw error
    }
}

export const getAllBalanceAdjustmentByNIK = async (page, limit, nik, searchValue, startDate, endDate, balanceYear) => {
    try {
        const offset = (page - 1) * limit
        const totalLogs = await prisma.tb_balance_adjustment.count();

        console.log('test', searchValue);
        const logs = await prisma.tb_balance_adjustment.findMany({
            skip: offset,
            take: limit,
            omit: {
                id_adjustment: true
            },
            where: {
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
            },
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
            time: log.created_at.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: undefined }).replace('.', ':'),
            actor: log.actor,
            notes: log.notes
        }))

        const result = {
            data: logsModified,
            total: totalLogs,
            totalPages: Math.ceil(totalLogs / limit),
            page: page
        }

        return result
    } catch (error) {
        throw error
    }
}