import { fetchUserData } from "../services/auth.service.js";
import bcrypt from 'bcrypt';
import { verifyToken } from "../utils/jwt.js";

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    const header = req.header("Authorization");

    try {

        // if () {
        //     const error = new Error("user already logged-in");
        //     error.statusCode = 400
        //     throw error;
        // }

        const user = await fetchUserData("email", email);
        const match = await bcrypt.compare(password, user.password);

        if (!match || !user) {
            const error = new Error("Email and password are not matched.");
            error.statusCode = 400;
            throw error;
        }

        if (user.role === "magang") {
            const error = new Error(`Your role does not have access to this system.`);
            error.statusCode = 401;
            throw error;
        }

        if (user.status === "resign") {
            const error = new Error(`Account is inactive`);
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: "failed",
            message: error.message,
            status_code: error.statusCode
        })
    }

}