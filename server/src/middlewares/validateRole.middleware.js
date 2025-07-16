import { verifyToken } from "../utils/jwt.js";

export const validateRole = (...role) => {
    return async (req, res, next) => {
        const user = await verifyToken(req.get("authorization").split(' ')[1]) 

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