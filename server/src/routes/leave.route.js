
import express from "express";
import { createLeaveRequest, getAdminLeaveRequests } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';

const leaveRoutes = express.Router();


leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);
leaveRoutes.get('/admin', validateRole('super_admin', 'admin'), getAdminLeaveRequests);

export default leaveRoutes;