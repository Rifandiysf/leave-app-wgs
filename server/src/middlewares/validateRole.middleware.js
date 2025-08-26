import { decodeToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

export const validateRole = (...allowedRoles) => {
    return async (req, res, next) => {
        const token = req.cookies["Authorization"];
        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        try {
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.role || !decoded.role.slug) {
                return res.status(403).json({
                    message: "Access denied. Invalid token or role information missing."
                });
            }

            const userRoleSlug = decoded.role.slug;

            if (!allowedRoles.includes(userRoleSlug)) {
                return res.status(403).json({
                    message: `Access denied. Your role (${userRoleSlug}) is not authorized for this action.`
                });
            }

            // Attach user information to request for further use if needed
            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Invalid token."
            });
        }
    };
}