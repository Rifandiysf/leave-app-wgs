import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { deleteToken } from '../services/auth.service.js';
import { decodeToken, verifyToken } from '../utils/jwt.js';

export const isAuthenticated = async (req, res, next) => {
    const header = req.get("authorization");
    const token = header?.split(' ')[1];
    const deviceId = req.get("device-id");
    
    try {
        if (!deviceId || !token) {
            throw new Error("Authorization header not found");
        }

        const decodedToken = await decodeToken(token);

        const isValid = await verifyToken(token);

        if (!decodedToken || !isValid) {
            throw new Error("Unauthorized. please login to access this resources.");
        }

        return next();
    } catch (error) {
        error.statusCode = 401
        if (error.name === "TokenExpiredError" && token) {
            await deleteToken(token, deviceId);
            error.cause = "Login session expired";
        }

        next(error)
    }
};
