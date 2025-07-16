import { deleteToken, fetchUserData, addToken } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
    const { email } = req.body;
    const header = req.get("authorization");
    const token = header?.split(' ')[1];

    // todo: add validation if token expired then delete that token and create new token;
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

        const newToken = await generateToken(userData);

        res.setHeader('Authorization', `Bearer ${newToken}`).json({
            success: true,
            message: `Welcome ${user.fullname}`,
            data: {
                nik: user.NIK,
                name: user.fullname,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const logout = async (req, res, next) => {
    try {
        const header = req.get("authorization");
        const token = header?.split(' ')[1];

        await deleteToken(token);

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