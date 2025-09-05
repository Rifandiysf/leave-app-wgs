import prisma from "../../utils/client.js"

export const serviceCreateSetting = async (data) => {
    return await prisma.tb_settings.create({data})
}