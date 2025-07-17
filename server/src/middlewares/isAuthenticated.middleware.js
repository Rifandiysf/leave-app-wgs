import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { deleteToken } from '../services/auth.service.js';

export const isAuthenticated = async (req, res, next) => {
    const header = req.get("authorization");
    const token = header?.split(' ')[1];

    try {
        if (!header || !token) {
            throw new Error("Authorization header not found");
        }

        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        if (!decodedToken) {
            throw new Error("Invalid session: your authentication token is either incorrect or expired.");
        }

        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError" && token) {
            await deleteToken(token);
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
