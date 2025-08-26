import prisma from "../../utils/client.js";

export const deleteUserByNIK = async (nik) => {
    const deletedUser = await prisma.tb_users.update({
        where: {
            NIK: nik,
            NOT: {
                status_active: "resign"
            }
        },
        data: {
            status_active: "resign"
        }
    })

    return deletedUser;

    // inactive all leave related to the user 
    // const userLeaves = await prisma.tb_leave.updateMany({
    //     where: {
    //         NIK: nik
    //     },
    //     data: {
    //         // update user leaves to incative
    //     }
    // })

}