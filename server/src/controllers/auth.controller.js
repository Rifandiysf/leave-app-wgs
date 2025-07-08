import { fetchUserData } from "../services/auth.service.js";
import prisma from "../utils/client.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await fetchUserData("email", email);

        req.session.user = { NIK: user.NIK, loginDate: (new Date()).toISOString()};

        return res.status(200).json({
            message: `Welcome ${user.fullname}`,
            loginDate: req.session.user.loginDate,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const logout = (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('invalid action');
        }

        req.session.destroy((err) => {
            if (err) throw new Error(err.message);

            res.clearCookie('connect.sid');
            res.status(200).json({
                message: "you have been logged out"
            })
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}