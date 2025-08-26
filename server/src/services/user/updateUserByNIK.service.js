import prisma from "../../utils/client.js";

export const updateUserByNIK = async (nik, data) => {
    const updatedUser = await prisma.tb_users.update({
        where: {
            NIK: nik
        },
        data: {
            status_active: "active",
            join_date: new Date()
        }
    })

    if (!updatedUser) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error
    }

    return updatedUser
}