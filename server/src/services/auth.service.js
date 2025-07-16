import { email } from "zod/v4";
import prisma from "../utils/client.js";
import bcrypt from 'bcrypt';
import { role } from "../../generated/prisma/index.js";

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

export const addToken = async (token, nik) => {
    try {
        const addedToken = await prisma.tb_jwt_token.create({
            data: {
                access_token: token,
                NIK: nik
            }
        })

        return addedToken;
    } catch (error) {
        return null;
    }

}

export const deleteToken = async (token) => {
    try {
        const deletedToken = await prisma.tb_jwt_token.delete({
            where: {
                access_token: token
            }
        })

        return deletedToken;
    } catch (error) {
        error.message = "Invalid token";
        throw error;
    }
        
}
