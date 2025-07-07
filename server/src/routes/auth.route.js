import express from 'express';

const authRoutes = express.Router();

authRoutes.get('/login', login);
authRoutes.get('/logout', logout);