import { fetchUserData } from "../services/auth.service.js";
import bcrypt from 'bcrypt';

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await fetchUserData("email", email);

        if (!user) {
            const error = new Error("Email atau password salah.");
            error.statusCode = 401; 
            throw error;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error = new Error("Email atau password salah.");
            error.statusCode = 401;
            throw error;
        }

        if (user.role === "magang") {
            const error = new Error(`Role Anda tidak memiliki akses ke sistem ini.`);
            error.statusCode = 403; 
            throw error;
        }

      
        if (user.status_active === "resign") {
            const error = new Error(`Akun ini sudah tidak aktif.`);
            error.statusCode = 401;
            throw error;
        }

        
        req.user = user;
        return next();
        
    } catch (error) {
        
        return res.status(error.statusCode || 400).json({
            status: "failed",
            message: error.message
        });
    }
};