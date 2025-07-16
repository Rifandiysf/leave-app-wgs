import { success } from "zod/v4";
import { role, status } from "../../generated/prisma/index.js";
import { deleteToken, fetchUserData, addToken } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { verifyToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await fetchUserData("email", email);

        if (!user) {
            const error = new Error('user not found');
            error.statusCode = 404;
            throw error;
        }

        const userData = {
            NIK: user.NIK,
            email: user.email,
            fullname: user.fullname,
            password: user.password,
            role: user.role
        }

        const token = await generateToken(userData);
        
        res.setHeader('Authorization', `Bearer ${token}`).json({
            success: true,
            message: `Welcome ${user.fullname}`,
            data: {
                nik: user.NIK,
                name: user.fullname,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(400).json({
            message: error.message
        });
    }
}

export const logout = (req, res, next) => {
    try {
        const header = req.get("authorization");
        const token = header?.split(' ')[1];

        deleteToken(token);

        res.status(200).json({
            success: true,
            message: "You have been successfully logged out.",
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
            status_code: 400
        });
    }
}