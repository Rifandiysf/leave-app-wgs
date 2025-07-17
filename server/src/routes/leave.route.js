import express from "express";
import { historyLeave, historyLeaveSearch, updateLeaveById, getAllLeaves } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import updateLeaveRequestSchema from "../validators/updateLeave.validator.js";
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';  

const leaveRoutes = express.Router();

leaveRoutes.get('/', isAuthenticated, validateRole('super_admin', 'admin'), getAllLeaves);

leaveRoutes.get('/logs', isAuthenticated, validateRole('super_admin', 'admin'), historyLeave);
leaveRoutes.get('/logs/search', isAuthenticated, validateRole('super_admin', 'admin'), historyLeaveSearch);

leaveRoutes.patch('/:id', isAuthenticated, validate(updateLeaveRequestSchema), updateLeaveById);

export default leaveRoutes;
