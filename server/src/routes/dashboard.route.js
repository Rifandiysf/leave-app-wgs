import express from 'express';
import { getStatistics } from '../controllers/dashboard/getStatistics.controller.js';
import { getTrend } from '../controllers/dashboard/getTrend.controller.js';
import { getLeaderboard } from '../controllers/dashboard/getLeaderboard.controller.js';
import { getPendingLeaves } from '../controllers/dashboard/getPendingLeaves.controller.js';
import { validate } from "../middlewares/validate.js";
import { validateRole } from '../middlewares/validateRole.middleware.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/statistics', validateRole('super_admin', 'admin'), getStatistics);
dashboardRoutes.get('/trend', validateRole('super_admin', 'admin'), getTrend);
dashboardRoutes.get('/leaderboard', validateRole('super_admin', 'admin'), getLeaderboard);
dashboardRoutes.get('/pending-leave', validateRole('super_admin', 'admin'), getPendingLeaves)

export default dashboardRoutes;