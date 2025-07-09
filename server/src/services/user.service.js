import prisma from "../utils/client.js"

export const createLeave = async (data) => {
    const {
        title,
        leave_type,
        start_date,
        end_date,
        reason,
        NIK,
    } = data;

    let id_special = null;
    let id_mandatory = null;

    if (leave_type === "special_leave") {
        id_special = data.id_special;
        if (!id_special) {
            throw new Error("id_special is required for special leave");
        }
    } else if (leave_type === "mandatory_leave") {
        id_mandatory = data.id_mandatory || null;
        if (!id_mandatory) {
            throw new Error("id_mandatory is required for mandatory leave");
        }
    }

    if (id_special) {
        const specialLeaveExists = await prisma.tb_special_leave.findUnique({
            where: { id_special: id_special }
        });
        if (!specialLeaveExists) {
            throw new Error("Invalid id_special provided");
        }
    }

    if (id_mandatory) {
        const mandatoryLeaveExists = await prisma.tb_mandatory_leave.findUnique({
            where: { id_mandatory: id_mandatory }
        });
        if (!mandatoryLeaveExists) {
            throw new Error("Invalid id_mandatory provided");
        }
    }

    const total_days =
        Math.ceil(
            (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
        ) + 1;

    const leaveData = {
        title,
        leave_type,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        reason,
        NIK,
        total_days,
        id_special,
        id_mandatory
    };

    console.log("Data yang dikirim ke Prisma:", leaveData);

    return await prisma.tb_leave.create({
        data: leaveData,
    });
};


export const getLeavesByNIK = async (NIK) => {
    return await prisma.tb_leave.findMany({
        where: {
            NIK: NIK,
        },
    })
}

export const getLeavesById = async (NIK, id_leave) => {
    return await prisma.tb_leave.findMany({
        where: {
            id_leave: id_leave,
            NIK: NIK
        }
    })
}

export const getLeavesByFilterService = async (NIK, type, status) => {
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
        const allowedStatus = ['pending', 'approved', 'reject'];
        const lowerStatus = status.toLowerCase();

        if (!allowedStatus.includes(lowerStatus)) {
            throw new Error('Invalid leave status. Allowed: waiting, approved, reject');
        }

        whereClause.status = lowerStatus;
    }

    return await prisma.tb_leave.findMany({
        where: whereClause
    });
};


export const getLeaveBalanceByYear = async (nik, year) => {
    const startDate = new Date(`${year}-01-01`)
    const endDate = new Date(`${year}-12-31`)

    return await prisma.tb_balance.findFirst({
        where: {
            NIK: nik,
            receive_date: {
                gte: startDate,
                lte: endDate,
            },
        },
        select: {
            amount: true,
        },
    })
}
