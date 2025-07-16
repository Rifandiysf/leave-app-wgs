import { success } from "zod/v4";
import { role, status } from "../../generated/prisma/index.js";
import { deleteToken, fetchUserData, addToken } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
import { verifyToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const payload = await fetchUserData("email", email);
        console.log("Payload:", payload);

        if (!payload) {
            const error = new Error('user not found');
            error.statusCode = 404;
            throw error;
        }

        const user = {
            NIK: payload.NIK,
            email: payload.email,
            fullname: payload.fullname,
            password: payload.password,
            role: payload.role
        }

        const token = generateToken(user);

        addToken(token);
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
    console.log()
    try {
        const header = req.get("authorization");
        const token = header?.split(' ')[1];

        deleteToken(token);

        res.status(200).json({
            success: true,
            message: "You have been successfully logged out.",
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
            status_code: 400
        })
    }
}