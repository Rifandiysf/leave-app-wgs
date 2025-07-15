import { status } from "../../generated/prisma/index.js";
import { fetchUserData } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const payload = await fetchUserData("email", email);

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
        
        return res.status(200).json({
            message: `Welcome ${payload.fullname}`,
            data: token,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const logout = (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1])
    try {
        // const header = req.header("Authorization");
        // const token = header.split(' ')[1]
        // const data = verifyToken(token)
        // console.log(data);
        // console.log(req.user.email);
        if (!req.data.user.fullname) {
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
            status: "failed",
            message: error.message,
            status_code: 400
        })
    }
}