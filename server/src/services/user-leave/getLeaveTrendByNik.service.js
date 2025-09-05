import prisma from "../../utils/client.js";

export const getLeaveTrendByNik = async (nik) => {
    const user = await prisma.tb_users.findUnique({
        where: { NIK: nik },
        select: { join_date: true }

    })

    if (!user) {
        return {
            message: `User with NIK ${nik} not found`,
            trend: {}

        }
    }

    const joinYear = user.join_date.getFullYear()
    const currentYear = new Date().getFullYear()


    const leaves = await prisma.tb_leave.findMany({
        where: {
            NIK: nik,
            status: 'approved',
            start_date: {
                gte: user.join_date
            }
        },
        orderBy: {
            start_date: 'asc'

        }
    })

    if (leaves.length === 0) {
        return {
            message: `There is no leave data for NIK ${nik} since joining in ${joinYear}`,
            trend: {}

        }
    }

    const trend = {}
    for (let year = joinYear; year <= currentYear; year++) {
        trend[year] = {
            mandatory_leave: 0,
            special_leave: 0,
            personal_leave: 0
        }
    }


    leaves.forEach((leave) => {
        const year = leave.start_date.getFullYear()
        const leaveType = leave.leave_type?.toLowerCase()

        if (!leaveType) {
            throw new Error(`Unknown leave type ${leaveType}`);
            return;
        }

        trend[year][leaveType] += 1
    })

    return {
        message: `Successfully get leave data trends for NIK ${nik}`,
        trend
    }
}