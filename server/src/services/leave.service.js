import prisma from "../utils/client.js";


export const getAllLeavesService = async () => {
    return await prisma.tb_leave.findMany({})
}


export const getLeavesByFilterService = async (type, value) => {
    const whereClause = {
        status: 'pending',
    };

    if (type) {
        const typeMapping = {
            personal: 'personal_leave',
            mandatory: 'mandatory_leave',
            special: 'special_leave'
        };

        const mappedType = typeMapping[type.toLowerCase()];
        if (!mappedType) {
            throw new Error('Invalid leave type. Allowed values: personal, mandatory, special');
        }

        whereClause.leave_type = mappedType;
    }

    if (value) {
        whereClause.OR = [
            {
                title: {
                    contains: value,
                    mode: 'insensitive'
                }
            }
        ];
    }

    console.log('Filter yang dikirim ke Prisma:', whereClause);

    const results = await prisma.tb_leave.findMany({
        where: whereClause
    });

    return results;
};

