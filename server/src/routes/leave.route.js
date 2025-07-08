
import express from "express";
import { createLeaveRequest, getLeaveRequests } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
import {
    lastYearLeave,
    currentYearLeave
} from '../controllers/leave.controller.js';
import { validateRole } from '../middlewares/role.middleware.js';

const leaveRoutes = express.Router();

leaveRoutes.get('/lastYear/:nik', lastYearLeave);
leaveRoutes.get('/currentYear/:nik', currentYearLeave);
leaveRoutes.post('/', isAuthenticated, validate(leaveRequestSchema), createLeaveRequest);
leaveRoutes.get('/admin', validateRole('super_admin', 'admin'), getLeaveRequests);

export default leaveRoutes;