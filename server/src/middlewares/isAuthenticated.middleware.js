import { deleteToken } from "../services/auth.service.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    const header = req.get("authorization");

    const token = header?.split(' ')[1];

    try {
        if (!header || !token) {
            throw new Error("Authorization header not found");
        }

        const decodeToken = await verifyToken(token);

        if (!decodeToken) {
            throw new Error("Invalid Credentials");
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
