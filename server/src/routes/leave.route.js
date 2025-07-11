import express from "express";
import { historyLeave, historyLeaveSearch, updateLeaveById } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import updateLeaveRequestSchema from "../validators/updateLeave.validator.js";

const leaveRoutes = express.Router();

leaveRoutes.get('/logs', validateRole('super_admin', 'admin'), historyLeave);
leaveRoutes.get('/logs/search', validateRole('super_admin', 'admin'), historyLeaveSearch);

leaveRoutes.patch('/:id', validate(updateLeaveRequestSchema), updateLeaveById)
export default leaveRoutes;