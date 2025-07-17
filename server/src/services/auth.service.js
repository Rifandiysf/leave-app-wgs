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

export const addToken = async (token, nik, deviceInfo) => {
    try {
        const addedToken = await prisma.tb_jwt_token.create({
            data: {
                access_token: token,
                NIK: nik,
                user_agent: deviceInfo,
            }
        })

        return addedToken;
    } catch (error) {
        return null;
    }
}

export const deleteToken = async (token, deviceInfo) => {
    try {
        const deletedToken = await prisma.tb_jwt_token.delete({
            where: {
                access_token: token,
                user_agent: deviceInfo
            }
        })

        return deletedToken;
    } catch (error) {
        error.message = "Invalid token";
        throw error;
    }
        
}
