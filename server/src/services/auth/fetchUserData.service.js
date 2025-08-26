import prisma from "../../utils/client.js";

export const fetchUserData = async (params, uniqueId) => {
    try {
        const user = await prisma.tb_users.findUnique({
            where: {
                [params]: uniqueId,
            }
        })

        return user;
    } catch (error) {
        throw error;
    }
}