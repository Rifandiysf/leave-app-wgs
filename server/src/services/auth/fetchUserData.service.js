import prisma from "../../utils/client.js";

export const fetchUserData = async (params, uniqueId) => {
    try {
        const user = await prisma.tb_users.findUnique({
            where: {
                [params]: uniqueId,
            },
            include: {
                role: true, // Include role data
                status: true // Include status data
            }
        })

        return user;
    } catch (error) {
        throw error;
    }
}