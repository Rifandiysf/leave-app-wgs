import prisma from "../../utils/client.js";

export const createMandatoryLeaveService = async (data) => {
    return await prisma.tb_mandatory_leave.create({ data });
};