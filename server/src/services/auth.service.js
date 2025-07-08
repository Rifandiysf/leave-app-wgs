import prisma from "../utils/client.js";

export const fetchUserData = async (params, uniqueId) => {
    return await prisma.tb_users.findUnique({
            where: {
                [params]: uniqueId
            }
    })
}