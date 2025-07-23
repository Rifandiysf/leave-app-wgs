import express from "express";
import { createMandatoryLeave, createSpecialLeave, getAllLeaves, getLeavesByFilter, getMandatoryLeaves, getSearchMandatoryLeave, getSearchSpecialLeave, getSpecialLeave, historyLeave, historyLeaveSearch, updateLeaveById, updateMandatoryLeave, updateSpecialLeave } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
import updateLeaveRequestSchema from "../validators/updateLeave.validator.js";
import { specialLeaveForm, specialLeaveFormUpdate } from "../validators/specialLeaveForm.validator.js";
import { mandatoryLeaveForm, mandatoryLeaveFormUpdate } from "../validators/mandatoryLeaveForm.validator.js";
import { checkStartDateTwoWeeksAhead } from "../middlewares/checkStartDateTwoWeeksAhead.middleware.js";

const leaveRoutes = express.Router();

leaveRoutes.get('/', getAllLeaves)
leaveRoutes.get('/search', getLeavesByFilter)

leaveRoutes.get('/logs', validateRole('super_admin', 'admin'), historyLeave);
leaveRoutes.get('/logs/search', validateRole('super_admin', 'admin'), historyLeaveSearch);

leaveRoutes.get('/special', getSpecialLeave)
leaveRoutes.get('/special/search', getSearchSpecialLeave)
leaveRoutes.post('/special', validate(specialLeaveForm), createSpecialLeave)
leaveRoutes.patch('/special/:id', validate(specialLeaveFormUpdate), updateSpecialLeave)

leaveRoutes.get('/mandatory', getMandatoryLeaves)
leaveRoutes.get('/mandatory/search', getSearchMandatoryLeave)
leaveRoutes.post('/mandatory', checkStartDateTwoWeeksAhead, validate(mandatoryLeaveForm), createMandatoryLeave)
leaveRoutes.patch('/mandatory/:id', validate(mandatoryLeaveFormUpdate), updateMandatoryLeave)

leaveRoutes.patch('/:id', validate(updateLeaveRequestSchema), updateLeaveById)

export default leaveRoutes;