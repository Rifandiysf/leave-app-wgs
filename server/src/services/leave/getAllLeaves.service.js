import prisma from "../../utils/client.js";

export const getAllLeavesService = async (page, limit) => {
    const skip = (page - 1) * limit;

    const leaves = await prisma.tb_leave.findMany({
        skip,
        take: limit,
        include: {
            tb_users: {
                select: { fullname: true }
            }
        },
        orderBy: { created_at: 'desc' },
        where: {
            status: 'pending'
        },
    });

    const mappedLeaves = leaves.map(leave => ({
        ...leave,
        name: leave.tb_users.fullname
    }))

    const total = await prisma.tb_leave.count();
    const totalPages = Math.ceil(total / limit);

    return {
        data: {
            data: mappedLeaves,
            pagination: {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
};