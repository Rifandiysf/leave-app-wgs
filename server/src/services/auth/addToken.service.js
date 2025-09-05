import prisma from "../../utils/client.js";

export const addToken = async (token, nik, deviceInfo, deviceId) => {
    try {
        const addedToken = await prisma.tb_jwt_token.create({
            data: {
                access_token: token,
                NIK: nik,
                device_info: deviceInfo,
                device_id: deviceId
            }
        })

        return addedToken;
    } catch (error) {
        return null;
    }
}