import prisma from "../utils/client.js"

export const serviceCreateSeeting = async (data) => {
    return await prisma.tb_settings.create({data})
}