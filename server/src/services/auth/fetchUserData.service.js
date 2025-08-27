import prisma from "../../utils/client.js";

export const fetchUserData = async (params, uniqueId) => {
    try {
        const user = await prisma.tb_users.findUnique({
            where: {
                [params]: uniqueId,
            },
            include: {
                tb_roles: true, 
                tb_statuses: true 
            }
        })
        console.log("Fetched user data:", user);
        return user;
    } catch (error) {
        throw error;
    }
}