import prisma from "../../utils/client.js";

export const getSpecialLeaveService = async (gender, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_special_leave.findMany({
            skip,
            take: limit,
            orderBy: { title: 'asc' },
            where: {
                applicable_gender: {
                    in: [gender, 'mf']
                }
            }
        }),
        prisma.tb_special_leave.count({
            where: {
                applicable_gender: {
                    in: [gender, 'mf']
                }
            }
        }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // return { data, total, totalPages, page };
    return {
        data: {
            data: data,
            pagination: {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    }
};