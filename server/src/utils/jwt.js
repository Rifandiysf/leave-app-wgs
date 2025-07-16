import jwt, { decode } from 'jsonwebtoken';
import { addToken, deleteToken } from '../services/auth.service.js';
import { JWT_SECRET } from '../config/env.js';
import prisma from './client.js';

export const generateToken = async (payload, expiresIn = '50s') => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    const newToken = await addToken(token, payload.NIK);
    if (!newToken) {
        const oldToken = await prisma.tb_jwt_token.findUnique({
            where: {
                NIK: payload.NIK
            }
        });

        if (!await verifyToken(oldToken.access_token)) {
            await prisma.$transaction(async (tx) => {
                await deleteToken(oldToken.access_token, tx);
                await addToken(token, payload.NIK, tx);
            });
        } else {
            const error = new Error("User already logged in");
            error.statusCode = 400;
            throw error;
        }
    }

    return token;
}

export const verifyToken = async (token) => {
    try {
        const oldToken = await prisma.tb_jwt_token.findUnique({
            where: {
                access_token: token
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
    const decodeToken = jwt.decode(token, JWT_SECRET);

    return decodeToken;
}
