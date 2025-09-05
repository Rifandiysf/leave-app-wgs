import prisma from "../../utils/client.js";

export const getAllStatuses = async () => {
    const statuses = await prisma.tb_statuses.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return statuses;
};