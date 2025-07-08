
import express from "express";
import { createLeaveRequest, getAdminLeaveRequests, getKaryawanLeaveRequests } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/role.middleware.js';

const leaveRoutes = express.Router();


leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);
leaveRoutes.get('/admin', validateRole('super_admin', 'admin'), getAdminLeaveRequests);
leaveRoutes.get('/karyawan', validateRole('karyawan_tetap', 'karyawan_kontrak'), getKaryawanLeaveRequests);

export default leaveRoutes;