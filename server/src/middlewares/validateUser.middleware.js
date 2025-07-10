import { status } from "../../generated/prisma/index.js";
import { fetchUserData } from "../services/auth.service.js";
import bcrypt from 'bcrypt';

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log(password);
        const user = await fetchUserData("email", email);
        const match = await bcrypt.compare(password, user.password);

        if (req.session.user) {
            const error = new Error("user already logged-in");
            error.statusCode = 400
            throw error;
        }

        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        if (!match) {
            const error = new Error("email and password are not valid");
            error.statusCode = 400;
            throw error;
        }

        if (user.role === "magang") {
            const error = new Error(`Invalid role: ${user.role}`);
            error.statusCode = 401;
            throw error;
        }

        return next();
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}