import prisma from "../../utils/client.js";

export const getAllRoles = async () => {
    const roles = await prisma.tb_roles.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return roles;
};