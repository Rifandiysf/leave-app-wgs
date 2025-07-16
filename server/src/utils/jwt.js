import jwt from 'jsonwebtoken';
import { addToken } from '../services/auth.service.js';
import { JWT_SECRET } from '../config/env.js';
import prisma from './client.js';

export const generateToken = async (payload,expiresIn = '10m') => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    await addToken(token, payload.NIK);
    return token;
}

export const verifyToken = async (token) =>  {
    const checkIfTokenValid = await prisma.tb_jwt_token.findUnique({
        where: {
            access_token: token
        }
    });

    if (!checkIfTokenValid) {
        throw new Error("Invalid Token");
    }

    const decodeToken = jwt.verify(token, JWT_SECRET);
    return decodeToken;
}
