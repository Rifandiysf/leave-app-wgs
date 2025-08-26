import prisma from "../../utils/client.js";

export const deleteToken = async (nik, deviceId) => {
    try {
        const deletedToken = await prisma.tb_jwt_token.deleteMany({
            where: {
                NIK: nik,
                device_id: deviceId
            }
        })
        return deletedToken;
    } catch (error) {
        return null;
    }
        
}