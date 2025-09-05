import prisma from "../../utils/client.js"

export const serviceGetSetting = async () => {
    return await prisma.tb_settings.findMany()
}