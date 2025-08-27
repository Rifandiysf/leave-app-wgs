import prisma from "../../utils/client.js";

export const getAllMandatoryLeavesService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_mandatory_leave.findMany({
            skip,
            take: limit,
            orderBy: { start_date: 'asc' },
        }),
        prisma.tb_mandatory_leave.count()
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