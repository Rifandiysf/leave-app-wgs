import express from 'express';
import authRoutes from './auth.route.js';
import leaveRoutes from './leave.route.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
import { validate } from '../middlewares/validate.js';
import userRoutes from './user.route.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import settingRoutes from './setting.route.js';
import { getApiEmployee } from '../utils/getApiEmployee.utils.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);
router.use('/leaves', isAuthenticated, validateRole('super_admin', 'admin'), leaveRoutes);
router.use('/setting', isAuthenticated, validateRole('super_admin'), settingRoutes)

export default router;