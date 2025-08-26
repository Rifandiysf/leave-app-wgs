import prisma from "../../utils/client.js";

export const createSpecialLeaveService = async (data) => {
    return await prisma.tb_special_leave.create({
        data,
    })
}