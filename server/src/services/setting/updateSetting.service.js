import prisma from "../../utils/client.js"

export const serviceUpdateSetting = async (id, data) => {
    return await prisma.tb_settings.update({
        where: {
            id: id
        },
        data
    })
}