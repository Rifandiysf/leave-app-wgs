import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { deleteToken } from '../services/auth.service.js';
import { decodeToken, verifyToken } from '../utils/jwt.js';

export const isAuthenticated = async (req, res, next) => {
    const header = req.get("authorization");
    const token = header?.split(' ')[1];
    const deviceId = req.get("device-id");
    
    try {
        if (!header || !token) {
            throw new Error("Authorization header not found");
        }

        const decodedToken = await decodeToken(token);

        const isValid = await verifyToken(token);

        if (!decodedToken || !isValid) {
            throw new Error("Invalid session: your authentication token is either incorrect or expired.");
        }

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError" && token) {
            await deleteToken(token, deviceId);
            error.message = "Login session expired";
        }

        return res.status(408).json({
            status: false,
            status_code: 408,
            message: "Unauthorized. Please login to access this resource.",
            detail: error.message
        });
    }
};
