import prisma from "../utils/client.js"
import { createDateFromString } from "../utils/leaves.utils.js"

export const getAllBalanceAdjustment = async (page = 1, limit = 10) => {
 try {
        const offset = (page - 1) * limit
        const totalLogs = await prisma.tb_balance_adjustment.count();

        const logs = await prisma.tb_balance_adjustment.findMany({
            skip: offset,
            take: limit,
            omit: {
                id_adjustment: true
            },
            include: {
                tb_users: true
            }
        })

        const logsModified = logs.map((log) => ({
            NIK: log.NIK,
            name: log.tb_users.fullname,
            adjustment_value: log.adjustment_value,
            balance_year: log.balance_year,
            created_at: createDateFromString(log.created_at),
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

export const getAllBalanceAdjustmentByNIK = async (page = 1, limit = 10, nik) => {
    try {
        const offset = (page - 1) * limit
        const totalLogs = await prisma.tb_balance_adjustment.count();

        const logs = await prisma.tb_balance_adjustment.findMany({
            skip: offset,
            take: limit,
            where: {
                NIK: nik
            },
            omit: {
                id_adjustment: true
            },
            include: {
                tb_users: true
            }
        })

        const logsModified = logs.map((log) => ({
            NIK: log.NIK,
            name: log.tb_users.fullname,
            balance_year: log.balance_year,
            adjustment_value: log.adjustment_value,
            created_at: createDateFromString(log.created_at),
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