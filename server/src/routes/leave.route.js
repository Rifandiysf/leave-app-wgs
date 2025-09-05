import express from "express";
import { getAllLeaves } from '../controllers/leave/getAllLeaves.controller.js';
import { getLeavesByFilter } from '../controllers/leave/getLeavesByFilter.controller.js';
import { historyLeave } from '../controllers/leave/historyLeave.controller.js';
import { historyLeaveSearch } from '../controllers/leave/historyLeaveSearch.controller.js';
import { updateLeaveById } from '../controllers/leave/updateLeaveById.controller.js';
import { createMandatoryLeave } from '../controllers/mandatory/createMandatoryLeave.controller.js';
import { getMandatoryLeaves } from '../controllers/mandatory/getMandatoryLeaves.controller.js';
import { getSearchMandatoryLeave } from '../controllers/mandatory/getSearchMandatoryLeave.controller.js';
import { updateMandatoryLeave } from '../controllers/mandatory/updateMandatoryLeave.controller.js';
import { createSpecialLeave } from '../controllers/special-leave/createSpecialLeave.controller.js';
import { getSpecialLeave } from '../controllers/special-leave/getSpecialLeave.controller.js';
import { getSpecialLeaveAdmin } from '../controllers/special-leave/getSpecialLeaveAdmin.controller.js';
import { getSearchSpecialLeave } from '../controllers/special-leave/getSearchSpecialLeave.controller.js';
import { updateSpecialLeave } from '../controllers/special-leave/updateSpecialLeave.controller.js';
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

leaveRoutes.get('/special', getSpecialLeaveAdmin)
leaveRoutes.get('/special/search', getSearchSpecialLeave)
leaveRoutes.post('/special', validate(specialLeaveForm), createSpecialLeave)
leaveRoutes.patch('/special/:id', validate(specialLeaveFormUpdate), updateSpecialLeave)

leaveRoutes.get('/mandatory', getMandatoryLeaves)
leaveRoutes.get('/mandatory/search', getSearchMandatoryLeave)
leaveRoutes.post('/mandatory', checkStartDateTwoWeeksAhead, validate(mandatoryLeaveForm), createMandatoryLeave)
leaveRoutes.patch('/mandatory/:id', validate(mandatoryLeaveFormUpdate), updateMandatoryLeave)

leaveRoutes.patch('/:id', validate(updateLeaveRequestSchema), updateLeaveById)

export default leaveRoutes;