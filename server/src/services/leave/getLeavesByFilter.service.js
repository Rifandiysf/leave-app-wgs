import prisma from "../../utils/client.js";

export const getLeavesByFilterService = async (type, value, page, limit) => {
    const where = {
        status: 'pending'
    };

    if (type) {
        const typeMapping = {
            personal_leave: 'personal_leave',
            mandatory_leave: 'mandatory_leave',
            special_leave: 'special_leave'
        };
        const mapped = typeMapping[type.toLowerCase()];
        if (!mapped) throw new Error('Invalid leave type');
        where.leave_type = mapped;
    }

    if (value) {
        where.OR = [
            { tb_users: { is: { fullname: { contains: value, mode: 'insensitive' } } } }
        ];
    }

    const skip = (page - 1) * limit;

    const leaves = await prisma.tb_leave.findMany({
        orderBy: { created_at: 'desc' },
        where,
        skip,
        take: limit,
        include: {
            tb_users: {
                select: { fullname: true }
            }
        }
    });

    const data = leaves.map(leave => ({
        ...leave,
        name: leave.tb_users.fullname
    }));

    const total = await prisma.tb_leave.count({ where });
    const totalPages = Math.ceil(total / limit);

    return { data, total, page, totalPages };
};