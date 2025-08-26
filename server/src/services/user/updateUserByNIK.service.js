import prisma from "../../utils/client.js";

export const updateUserByNIK = async (nik, data) => {
    const updateData = {};

    if (data.fullname) updateData.fullname = data.fullname;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = data.password;
    if (data.gender) updateData.gender = data.gender;
    if (data.join_date) updateData.join_date = data.join_date;
    if (data.role_id) updateData.role_id = data.role_id;
    if (data.status_id) updateData.status_id = data.status_id;

    const updatedUser = await prisma.tb_users.update({
        where: {
            NIK: nik
        },
        data: updateData,
        include: {
            role: true,
            status: true
        }
    })

    if (!updatedUser) {
        const error = new Error("user not found");
        error.statusCode = 404;
        throw error
    }

    return updatedUser
}