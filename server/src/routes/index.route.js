import express from 'express';
import authRoutes from './auth.route.js';
import leaveRoutes from './leave.route.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
import { validate } from '../middlewares/validate.js';
import userRoutes from './user.route.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import settingRoutes from './setting.route.js';
import { getApiEmployee } from '../utils/getApiEmployee.utils.js';
import uploadRoutes from './upload.route.js';
import dashboardRoutes from './dashboard.route.js';
import balanceRoutes from './balance.route.js';
import roleRoutes from './role.route.js'; // Import new role route
import statusRoutes from './status.route.js'; // Import new status route

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);
router.use('/leaves', isAuthenticated, validateRole('super_admin', 'admin'), leaveRoutes);
router.use('/setting', isAuthenticated, settingRoutes)
router.use('/uploads', isAuthenticated, uploadRoutes)
router.use('/dashboard', isAuthenticated, dashboardRoutes);
router.use('/balances', isAuthenticated, balanceRoutes)

// New routes for roles and statuses
router.use('/roles', isAuthenticated, validateRole('super_admin', 'admin'), roleRoutes);
router.use('/statuses', isAuthenticated, validateRole('super_admin', 'admin'), statusRoutes);

export default router;