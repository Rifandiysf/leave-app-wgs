import jwt, { decode } from 'jsonwebtoken';
import { addToken, deleteToken } from '../services/auth.service.js';
import { JWT_SECRET } from '../config/env.js';
import prisma from './client.js';

export const generateToken = async (payload, expiresIn = '50s') => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    const newToken = await addToken(token, payload.NIK, payload.deviceInfo);
    if (!newToken) {
        const oldToken = await prisma.tb_jwt_token.findFirst({
            where: {
                access_token: token,
                NIK: payload.NIK,
                user_agent: payload.deviceInfo
            }
        });

        console.log(payload.deviceInfo)

        if (!oldToken) {
            const newToken2 = await addToken(token, payload.NIK, payload.deviceInfo);
            console.log(newToken2)
            return;
        }

        console.log("adasd");


        if (!await verifyToken(oldToken.access_token, oldToken.user_agent)) {
            await prisma.$transaction(async (tx) => {
                await deleteToken(oldToken.access_token, oldToken.user_agent, tx);
                await addToken(token, payload.NIK, payload.deviceInfo,tx);
            });
        } else {
            const error = new Error("User already logged in");
            error.statusCode = 400;
            throw error;
        }
    }

    return token;
}

export const verifyToken = async (token, deviceInfo) => {
    if (!token) return false;
    try {
        const oldToken = await prisma.tb_jwt_token.findFirst({
            where: {
                access_token: token,
                user_agent: deviceInfo
            }
        });

        if (!oldToken) {
            console.log("Token not found in database");
            return false;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return false;
    }
};

export const decodeToken = async (token) => {
    try {
        const decodeToken = jwt.verify(token, JWT_SECRET);

        return decodeToken;
    } catch (error) {
        throw error;
    }
    
}
