import express from 'express';
import { getStatistics, getTrend, getLeaderboard} from '../controllers/dashboard.controller.js';
import { validate } from "../middlewares/validate.js";
import { validateRole } from '../middlewares/validateRole.middleware.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/statistics', validateRole('super_admin', 'admin'), getStatistics);
dashboardRoutes.get('/trend', validateRole('super_admin', 'admin'), getTrend);
dashboardRoutes.get('/leaderboard', validateRole('super_admin', 'admin'), getLeaderboard);

export default dashboardRoutes;