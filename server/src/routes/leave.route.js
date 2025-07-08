import express from 'express';
import { createLeaveRequest, getLeaveRequests } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/role.middleware.js';

const leaveRoutes = express.Router();

leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);
leaveRoutes.get('/admin', validateRole('super_admin'), getLeaveRequests);

export default leaveRoutes;