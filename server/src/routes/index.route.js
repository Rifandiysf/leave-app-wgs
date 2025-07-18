import express from 'express';
import authRoutes from './auth.route.js';
import leaveRoutes from './leave.route.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
import { validate } from '../middlewares/validate.js';
import userRoutes from './user.route.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';

const router = express.Router();

//temporaly
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/leaves', leaveRoutes);

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);
router.use('/leaves', isAuthenticated, validateRole('super_admin', 'admin'), leaveRoutes);

export default router;