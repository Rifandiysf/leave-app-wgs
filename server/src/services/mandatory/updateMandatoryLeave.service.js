import prisma from "../../utils/client.js";

export const updateMandatoryLeaveService = async (id, data) => {
    return await prisma.tb_mandatory_leave.update({
        where: { id_mandatory: id },
        data,
    });
};