import prisma from "../../utils/client.js";

export const getHistoryLeave = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const total = await prisma.tb_leave.count({
        where: {
            NOT: { status: 'pending' }
        }
    });


    const totalPages = Math.ceil(total / limit);

    const leaves = await prisma.tb_leave.findMany({
        skip: offset, // Add skip
        take: limit,  // Add take
        where: {
            NOT: { status: 'pending' }
        },
        orderBy: { created_at: 'desc' },
        include: {
            tb_users: {
                select: { fullname: true }
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
        const latestLog = leave.tb_leave_log[0] || null;

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
            id_special: leave.id_special,
            id_mandatory: leave.id_mandatory,
            leave_log: latestLog
                ? {
                    reason: latestLog.reason,
                    balances_used: latestLog.balances_used,
                    actor_fullname: latestLog.tb_users?.fullname
                }
                : {
                    reason: "-",
                    balances_used: "-",
                    actor_fullname: "-"
                }
        };
    });

    return {
        data: {
            data: formattedLeaves,
            pagination: {
                total: total,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        }
    };
};