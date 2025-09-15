import prisma from "../../utils/client.js"

export const serviceUpdateSetting = async (data) => {
    const setting = await prisma.tb_settings.findFirst();
    if (!setting) {
        throw new Error("Setting not found");
    }

    return await prisma.tb_settings.update({
        where: {
            id: setting.id
        },
        data
    })
}