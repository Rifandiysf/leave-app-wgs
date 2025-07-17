import { decodeToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

export const validateRole = (...role) => {
    return async (req, res, next) => {
        const user = jwt.decode(req.get("authorization").split(' ')[1]) 

        if (!user) {
            return res.status(403).json({
                message: "Access denied. No role found."
            });
        }

        if (!role.includes(user.role)) {
            return res.status(403).json({
                message: `Access denied.`
            });
        }

        next();
    };
}