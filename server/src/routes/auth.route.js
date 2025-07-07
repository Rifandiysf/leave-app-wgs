import express from 'express';

const authRoutes = express.Router();

authRoutes.get('/signup', signup);
authRoutes.get('/signout', signout);