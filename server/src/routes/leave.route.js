
import express from "express";
import { createLeaveRequest, getAdminLeaveRequests, historyLeave, historyLeaveSearch } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/role.middleware.js';

const leaveRoutes = express.Router();


leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);
leaveRoutes.get('/admin', validateRole('super_admin', 'admin'), getAdminLeaveRequests);
leaveRoutes.get('/logs', validateRole('super_admin', 'admin'), historyLeave);
leaveRoutes.get('/logs/search', validateRole('super_admin', 'admin'), historyLeaveSearch);


export default leaveRoutes;