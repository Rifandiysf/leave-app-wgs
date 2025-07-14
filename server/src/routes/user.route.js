import express from "express";
import { createLeaveRequest, getLeaveRequestsById, getLeavesByFilter, allUsers, getUser, updateUser, deleteUser, getLeaveRequests, modifyAmount} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import leaveRequestSchema from "../validators/leave.validator.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";
import { getAllUsers } from "../services/user.service.js";
import { validateLeaveBalance } from "../middlewares/validateLeaveBalance.middleware.js";
import { validateSpecialLeaveNotWeekend } from "../middlewares/validateSpecialLeaveNotWeekend.js";

const userRoutes = express.Router();

userRoutes.post('/leave', validate(leaveRequestSchema), validateLeaveBalance, validateSpecialLeaveNotWeekend, createLeaveRequest);
userRoutes.get('/leave', getLeaveRequests);
userRoutes.get('/leave/search', getLeavesByFilter);
userRoutes.get('/leave/:id', getLeaveRequestsById);

userRoutes.get('/:nik', getUser);
userRoutes.patch('/:nik', updateUser);
userRoutes.delete('/:nik', validateRole("admin", "super_admin"), deleteUser);

userRoutes.get('/', allUsers);
userRoutes.patch('/:nik/balance', modifyAmount);

export default userRoutes;