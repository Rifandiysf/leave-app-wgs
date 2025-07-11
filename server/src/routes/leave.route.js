import express from "express";
<<<<<<< HEAD
import { getAllLeaves, getLeavesByFilter } from '../controllers/leave.controller.js'
=======
import { getAdminLeaveRequests } from '../controllers/leave.controller.js';
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';
>>>>>>> development/backend

const leaveRoutes = express.Router();

leaveRoutes.get('', getAllLeaves)
leaveRoutes.get('/search', getLeavesByFilter)

export default leaveRoutes;