

import jwt from 'jsonwebtoken';
import { SESSION_SECRET } from '../config/env.js';

export const login = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Autentikasi gagal. User tidak ditemukan." });
        }

        const payload = {
            NIK: user.NIK,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: `Welcome ${user.fullname}`,
            token: token, 
            data: {
                NIK: user.NIK,
                fullname: user.fullname,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login controller error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

export const logout = (req, res) => {
    res.status(200).json({ message: "Logout berhasil" });
};