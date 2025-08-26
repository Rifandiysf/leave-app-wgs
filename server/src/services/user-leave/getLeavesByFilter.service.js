import prisma from "../../utils/client.js";

export const getLeavesByFilterService = async (NIK, type, status, value, page, limit) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereClause = {
        NIK,
    };

    if (type) {
        const typeMapping = {
            personal: 'personal_leave',
            mandatory: 'mandatory_leave',
            special: 'special_leave'
        };

        const mappedType = typeMapping[type.toLowerCase()];
        if (!mappedType) {
            throw new Error('Invalid leave type. Allowed: personal, mandatory, special');
        }

        whereClause.leave_type = mappedType;
    }

    if (status) {
        const allowedStatus = ['pending', 'approved', 'rejected'];
        const lowerStatus = status.toLowerCase();

        if (!allowedStatus.includes(lowerStatus)) {
            throw new Error('Invalid leave status. Allowed: pending, approved, rejected');
        }

        whereClause.status = lowerStatus;
    }

    if (value) {
        whereClause.OR = [
            {
                title: {
                    contains: value,
                    mode: 'insensitive',
                },
            },
        ];
    }

    const [data, total] = await Promise.all([
        prisma.tb_leave.findMany({
            skip,
            take: limitNum,
            where: whereClause,
            orderBy: { created_at: 'desc' },
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
        prisma.tb_leave.count({ where: whereClause }),
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