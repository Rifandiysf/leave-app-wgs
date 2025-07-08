
import express from "express";
import { createLeaveRequest } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import {
    lastYearLeave,
    currentYearLeave
} from '../controllers/leave.controller.js';

const leaveRoutes = express.Router();

leaveRoutes.get('/lastYear/:nik', lastYearLeave);
leaveRoutes.get('/currentYear/:nik', currentYearLeave);
leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);

export default leaveRoutes;