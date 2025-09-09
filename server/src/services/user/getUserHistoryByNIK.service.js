import prisma from "../../utils/client.js"
import { createDateFromString, formatDateIndonesia } from "../../utils/leaves.utils.js"

export const getUserHistoryByNIK = async (nik, limit = 10, page = 1, dataFilter) => {
    try {
        const offset = (page - 1) * limit

        const dataSource = dataFilter || null

        const data = await prisma.$queryRaw`  
        SELECT * FROM (
        SELECT 'leave' AS data_source, 
        l."NIK", 
        l.id_leave, 
        NULL AS id_adjustment,
        l.title,
        l.leave_type,
        l.start_date,
        l.end_date,
        l.total_days,
        l.reason,
        l.status,
        (SELECT balances_used FROM tb_leave_log WHERE tb_leave_log.id_leave = l.id_leave ORDER BY tb_leave_log.changed_at DESC LIMIT 1) AS balances_used,
        (SELECT actor_fullname FROM tb_leave_log WHERE tb_leave_log.id_leave = l.id_leave ORDER BY tb_leave_log.changed_at DESC LIMIT 1) AS changed_by,
        (SELECT reason FROM tb_leave_log WHERE tb_leave_log.id_leave = l.id_leave ORDER BY tb_leave_log.changed_at DESC LIMIT 1) AS reason_log,
        NULL AS adjustment_value,
        NULL AS notes,
        NULL AS actor,
        NULL AS balance_year,
        created_at
        FROM tb_leave as l
        WHERE l."NIK" = ${nik} 

        UNION ALL

        SELECT 'adjustment' AS data_source,
        a."NIK",
        NULL AS id_leave,
        a.id_adjustment,
        NULL AS title,
        NULL AS leave_type,
        NULL AS start_date,
        NULL AS end_date,
        NULL AS total_days,
        NULL AS reason,
        NULL AS status,
        NULL AS balance_used,
        NULL AS changed_by,
        NULL AS reason_log,
        a.adjustment_value,
        a.notes,
        a.actor,
        a.balance_year,
        created_at
        FROM tb_balance_adjustment as a
        WHERE a."NIK" = ${nik}
        
        ORDER BY created_at DESC) AS combined_result

        WHERE combined_result.data_source = coalesce(${dataSource}, combined_result.data_source)`

        const modifiedResult = data.map((item) => {
            if (item.data_source === "leave") { 
                const startDate = formatDateIndonesia(item.start_date);
                const endDate = formatDateIndonesia(item.end_date);

                item.start_date = startDate
                item.end_date = endDate

                delete item.id_adjustment
                delete item.adjustment_value
                delete item.notes
                delete item.actor
                delete item.balance_year
            }

            if (item.data_source === "adjustment") {
                delete item.id_leave
                delete item.title
                delete item.leave_type
                delete item.start_date
                delete item.end_date
                delete item.total_days
                delete item.reason
                delete item.status
                delete item.balances_used
                delete item.changed_by
                delete item.reason_log

                item.date = formatDateIndonesia(createDateFromString(item.created_at))
                item.time = item.created_at.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: undefined }).replace('.', ':')
            }

            return item
        })
        
        return modifiedResult
    } catch (error) {
        throw error
    }
}