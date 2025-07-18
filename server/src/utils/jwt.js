import jwt, { decode } from 'jsonwebtoken';
import { addToken, deleteToken } from '../services/auth.service.js';
import { JWT_SECRET } from '../config/env.js';
import prisma from './client.js';

export const generateToken = async (payload, deviceData,expiresIn = '24h') => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    const newToken = await addToken(token, payload.NIK, deviceData.deviceInfo, deviceData.deviceId);
    if (!newToken) {
        const oldToken = await prisma.tb_jwt_token.findFirst({
            where: {
                NIK: payload.NIK,
                device_id: deviceData.deviceId
            }
        });

        if (!oldToken) {
            const overlappToken = await addToken(token, payload.NIK, deviceData.deviceInfo, deviceData.deviceId);
            return;
        }

        if (!await verifyToken(oldToken.access_token, oldToken.device_id)) {
            await prisma.$transaction(async (tx) => {
                await deleteToken(oldToken.NIK, oldToken.device_id, tx);
                await addToken(token, payload.NIK, deviceData.deviceInfo, deviceData.deviceId, tx);
            });
        } else {
            const error = new Error("User already logged in");
            error.statusCode = 400;
            throw error;
        }
    }

    return token;
}

export const verifyToken = async (token, deviceId) => {
    if (!token) return false;
    try {
        const oldToken = await prisma.tb_jwt_token.findFirst({
            where: {
                access_token: token,
                device_id: deviceId
            }
        });

        if (!oldToken) {
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
