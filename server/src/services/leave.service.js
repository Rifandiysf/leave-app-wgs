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

