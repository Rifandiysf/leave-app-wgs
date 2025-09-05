import prisma from "../../utils/client.js";

export const getSpecialLeaveServiceAdmin = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            skip,
            take: limit,
            orderBy: { title: 'asc' }
        }),
        prisma.tb_special_leave.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data: {
            employees: data, // Renamed 'data' to 'employees' for consistency
            pagination: {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
};