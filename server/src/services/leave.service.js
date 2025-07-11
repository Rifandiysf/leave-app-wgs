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




