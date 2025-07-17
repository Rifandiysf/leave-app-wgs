import prisma from "../utils/client.js";

export const fetchUserData = async (params, uniqueId) => {
    try {
        const user = await prisma.tb_users.findUnique({
            where: {
                [params]: uniqueId,
            }
        })

        return user;
    } catch (error) {
        throw error;
    }
}

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
        error.message = "Invalid token";
        throw error;
    }
        
}
