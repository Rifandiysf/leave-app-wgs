import prisma from "../../utils/client.js";

export const getHistoryLeaveSearch = async ({ value, type, status, page = 1, limit = 10 }) => {
    try {
        const changeFormat = (text) =>
            text?.trim().toLowerCase().replace(/\s+/g, '_');

        const offset = (page - 1) * limit;

        const whereCondition = {
            ...(type && { leave_type: changeFormat(type) }),
            ...(status && { status: status }),
            NOT: { status: 'pending' },
            ...(value && {
                tb_users: {
                    fullname: {
                        contains: value,
                        mode: 'insensitive'
                    }
                }
            })
        };

        const total = await prisma.tb_leave.count({ where: whereCondition });
        const totalPages = Math.ceil(total / limit);

        const leaves = await prisma.tb_leave.findMany({
            where: whereCondition,
            orderBy: { created_at: 'desc' },
            skip: offset,
            take: limit,
            include: {
                tb_users: {
                    select: {
                        fullname: true
                    }
                },
                tb_leave_log: {
                    orderBy: { changed_at: 'desc' },
                    take: 1,
                    select: {
                        reason: true,
                        balances_used: true,
                        tb_users: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        });

        const formattedLeaves = leaves.map(leave => {
            const latestLog = leave.tb_leave_log?.[0] || {
                reason: "-",
                tb_users: { fullname: "-" }
            };

            return {
                id_leave: leave.id_leave,
                title: leave.title,
                leave_type: leave.leave_type,
                start_date: leave.start_date,
                end_date: leave.end_date,
                total_days: leave.total_days,
                reason: leave.reason,
                status: leave.status,
                created_at: leave.created_at,
                NIK: leave.NIK,
                fullname: leave.tb_users?.fullname || "Unknown",
                id_special: leave.id_special,
                id_mandatory: leave.id_mandatory,
                tb_leave_log: latestLog
            };
        });

        

        return {
            data: {
                employees: formattedLeaves, // Renamed 'data' to 'employees' for consistency
                pagination: {
                    total: total,
                    totalPages: totalPages,
                    currentPage: page,
                    limit: limit
                }
            }
        };
    } catch (error) {
        throw error;
    }
};