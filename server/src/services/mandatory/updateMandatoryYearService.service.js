import prisma from "../../utils/client.js";

export const updateMandatoryYearService = async (data) => {
    const { year } = data;

    const leaves = await prisma.tb_mandatory_leave.findMany({
        where: { is_active: true },
    });

    const updatePromises = leaves.map((leave) => {
        const startDate = new Date(leave.start_date);
        const endDate = new Date(leave.end_date);

        const newStartDate = new Date(Date.UTC(year, startDate.getUTCMonth(), startDate.getUTCDate()));
        const newEndDate = new Date(Date.UTC(year, endDate.getUTCMonth(), endDate.getUTCDate()));

        return prisma.tb_mandatory_leave.update({
            where: { id_mandatory: leave.id_mandatory }, 
            data: {
                start_date: newStartDate,
                end_date: newEndDate,
            },
        });
    });

    return await prisma.$transaction(updatePromises);
};
