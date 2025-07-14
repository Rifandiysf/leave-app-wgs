import express from "express";
import { createSpecialLeave, getSpecialLeave, historyLeave, historyLeaveSearch, updateLeaveById, updateSpecialLeave } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import updateLeaveRequestSchema from "../validators/updateLeave.validator.js";
import { specialLeaveForm, specialLeaveFormUpdate } from "../validators/specialLeaveForm.validator.js";

const leaveRoutes = express.Router();

leaveRoutes.get('/logs', validateRole('super_admin', 'admin'), historyLeave);
leaveRoutes.get('/logs/search', validateRole('super_admin', 'admin'), historyLeaveSearch);

leaveRoutes.get('/special', getSpecialLeave)
leaveRoutes.post('/special', validate(specialLeaveForm), createSpecialLeave)
leaveRoutes.patch('/special/:id', validate(specialLeaveFormUpdate), updateSpecialLeave)
leaveRoutes.delete('/special/:id', )

leaveRoutes.patch('/:id', validate(updateLeaveRequestSchema), updateLeaveById)
export default leaveRoutes;