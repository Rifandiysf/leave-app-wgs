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

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        let password = await bcrypt.hash(user.password, 10);

        const userCopy = {
            NIK: user.NIK,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            status: user.status_active,
            password: password
        }
        
        return userCopy;
    } catch (error) {
        // for development only
        if (process.env.NODE_ENV = "development") {
            throw new Error("Request time out");
        }
    }
}

export const addToken = async (token) => {
    const addedToken = await prisma.tb_jwt_token.create({
        data: {
            access_token: token
        }
    })

    return addedToken;
}

export const deleteToken = async (token) => {
    const deletedToken = await prisma.tb_jwt_token.delete({
        where: {
            access_token: token
        }
    })

    return deletedToken;
}
