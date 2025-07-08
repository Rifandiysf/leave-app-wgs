import express from 'express';
import { createLeaveRequest } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';

const leaveRoutes = express.Router();

leaveRoutes.post('/', validate(leaveRequestSchema), createLeaveRequest);

export default leaveRoutes;