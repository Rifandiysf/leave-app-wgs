import express from 'express';
import { login } from '../controllers/auth/login.controller.js';
import { logout } from '../controllers/auth/logout.controller.js';
import { validateUser } from '../middlewares/validateUser.middleware.js';
import { validate } from '../middlewares/validate.js';
import loginFormRequest from '../validators/loginForm.validator.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
const authRoutes = express.Router();

authRoutes.post('/login', validate(loginFormRequest), validateUser, login);
authRoutes.get('/logout', isAuthenticated, logout);

// authRoutes.post('/login', validate(loginFormRequest),validateUser, login);
// authRoutes.get('/logout', isAuthenticated, logout);

export default authRoutes;