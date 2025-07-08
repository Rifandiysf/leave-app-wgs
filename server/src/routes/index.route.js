import express from 'express';
import authRoutes from './auth.route.js';
import leaveRoutes from './leave.route.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';

const router = express.Router();

router.use('/auth/', authRoutes)
router.use('/leave', isAuthenticated, leaveRoutes)

export default router;