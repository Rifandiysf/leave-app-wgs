import { leave_type } from "../../generated/prisma/index.js";
import prisma from "../utils/client.js";


export const getAllLeaves = async () => {
    return await prisma.tb_leave.findMany()
}

export const getLeavesByType = async (type) => {
    return await prisma.tb_leave.findMany({
        where: {
            leave_type: type,
        },
    })
}



export const createLeave = async (data) => {
    const { title, leave_type, start_date, end_date, reason, NIK } = data

    const total_days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)) + 1;

    return await prisma.tb_leave.create({
        data: {
            title: title,
            leave_type: leave_type,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            reason: reason,
            NIK: NIK,
            total_days: total_days
        }
    });

}

export const getHistoryLeaveSearch = async ({value, type, status}) => {
    const changeFormat = (text) => {
        return text?.trim().toLowerCase().replace(/\s+/g, '_')
    }
    const leaves = await prisma.tb_leave.findMany({
        where : {
            ...(type && {leave_type: changeFormat(type)}),
            ...(status && {status: status})
        },
        orderBy : {start_date: 'desc'}
    })

    const history = await Promise.all(
        leaves.map(async (leave) => {
            const user = await prisma.tb_users.findUnique({
                where : {NIK: leave.NIK},
                select : {fullname: true}
            })

            if (value && !user?.fullname.toLowerCase().includes(value.toLowerCase())) {
                return null
            }


            const latestLog = await prisma.tb_leave_log.findFirst({
                where: {id_leave: leave.id_leave},
                orderBy : {changed_at: 'desc'}
            })

            if (latestLog) {
                const changer = await prisma.tb_users.findUnique({
                    where : {NIK : latestLog.changed_by_nik},
                    select : {fullname : true}
                })
            }

            return {
                name: user?.fullname || 'Unknown',
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                leave_used: leave.total_days,
                status: leave.status
            }
        })
    )

    return history.filter(Boolean)
}

export const getHistoryLeave = async () => {
    const leaves = await prisma.tb_leave.findMany({
        orderBy : {start_date: 'desc'}
    })

    const history = await Promise.all(
        leaves.map(async (leave) => {
            const user = await prisma.tb_users.findUnique({
                where : {NIK: leave.NIK},
                select : {fullname: true}
            })

            const latestLog = await prisma.tb_leave_log.findFirst({
                where: {id_leave: leave.id_leave},
                orderBy : {changed_at: 'desc'}
            })

            if (latestLog) {
                const changer = await prisma.tb_users.findUnique({
                    where : {NIK : latestLog.changed_by_nik},
                    select : {fullname : true}
                })
            }

            return {
                name: user?.fullname || 'Unknown',
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                leave_used: leave.total_days,
                status: leave.status
            }
        })
    )

    return history
}