import prisma from "../../utils/client.js";

export const getSearchSpecialLeaveService = async (data, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const where = {
        title: {
            contains: data,
            mode: 'insensitive'
        }
    };

    const [results, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            where,
            skip,
            take: limit,
            orderBy: { title: 'asc' },
        }),
        prisma.tb_special_leave.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data: {
            employees: results, // Renamed 'data' to 'employees' for consistency
            pagination: {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
};