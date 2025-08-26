import prisma from "../../utils/client.js";

export const deleteUserByNIK = async (nik) => {
    // Find the ID for the 'Resign' status
    const resignStatus = await prisma.tb_statuses.findUnique({
        where: {
            name: "Resign"
        },
        select: {
            id: true
        }
    });

    if (!resignStatus) {
        const error = new Error("Resign status not found in tb_statuses. Please seed the database.");
        error.statusCode = 500;
        throw error;
    }

    const deletedUser = await prisma.tb_users.update({
        where: {
            NIK: nik,
            NOT: {
                status_id: resignStatus.id // Use status_id instead of status_active
            }
        },
        data: {
            status_id: resignStatus.id // Update status_id to 'Resign' status ID
        },
        include: {
            role: true,
            status: true
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