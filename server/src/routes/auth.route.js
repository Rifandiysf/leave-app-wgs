import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.get('/logout', logout);

export default authRoutes;