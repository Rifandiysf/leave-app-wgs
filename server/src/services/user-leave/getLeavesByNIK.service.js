import prisma from "../../utils/client.js";

export const getLeavesByNIK = async (NIK, page, limit) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.tb_leave.findMany({
            skip,
            take: limit,
            where: { NIK },
            include: {
                tb_leave_log: {
                    orderBy: { changed_at: 'desc' },
                    take: 1,
                    select: {
                        reason: true,
                        tb_users: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.tb_leave.count({ where: { NIK } }),
    ]);

    const transformedData = data.map(item => {
        const log = item.tb_leave_log[0];
        return {
            ...item,
            tb_leave_log: log
                ? log
                : {
                    reason: "-",
                    tb_users: {
                        fullname: "-"
                    }
                }
        };
    });

    return {
        data: transformedData,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};