import { fetchUserData } from "../services/auth.service.js";
import bcrypt from 'bcrypt';
import { decodeToken } from "../utils/jwt.js";

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await fetchUserData("email", email);
        
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        
        let hashpassword = await bcrypt.hash(user.password, 10);
        const match = await bcrypt.compare(password, hashpassword);

        if (!match) {
            const error = new Error("Email and password are not matched.");
            error.statusCode = 400;
            throw error;
        }

        if (user.role === "magang") {
            const error = new Error(`Your role does not have access to this system.`);
            error.statusCode = 401;
            throw error;
        }

        if (user.status_active === "resign") {
            const error = new Error(`Account is inactive`);
            error.statusCode = 401;
            throw error;
        }

        return next();
    } catch (error) {
        const statusCode = error && error.statusCode ? error.statusCode : 400;
        return res.status(statusCode).json({
            status: "failed",
            message: error.message,
            status_code: statusCode
        })
    }

}