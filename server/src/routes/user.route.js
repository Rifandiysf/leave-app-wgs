import express from "express";
import { createLeaveRequest, getLeaveRequestsById, getLeavesByFilter, allUsers, getUser, updateUser, deleteUser, getLeaveRequests, modifyAmount, getUserMe, getAllMandatoryLeaves, leaveTrend} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import leaveRequestSchema from "../validators/leave.validator.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";
import { getAllUsers } from "../services/user.service.js";
import { validateLeaveBalance } from "../middlewares/validateLeaveBalance.middleware.js";
import { validateSpecialLeaveNotWeekend } from "../middlewares/validateSpecialLeaveNotWeekend.js";
import { checkDuplicateLeave } from "../middlewares/checkDuplicateLeave .middleware.js";
import { validateStartDate } from "../middlewares/validateStartDate.middleware.js";
import { validateLeaveDateRange } from "../middlewares/validateLeaveDateRange.middleware.js";
import { getSpecialLeave } from "../controllers/leave.controller.js";

const userRoutes = express.Router();

userRoutes.get('/special', getSpecialLeave)
userRoutes.get('/mandatory', getAllMandatoryLeaves)

userRoutes.post('/leave', validate(leaveRequestSchema), validateStartDate, checkDuplicateLeave, validateLeaveDateRange, validateLeaveBalance, validateSpecialLeaveNotWeekend, createLeaveRequest);
userRoutes.get('/leave', getLeaveRequests);
userRoutes.get('/leave/search', getLeavesByFilter);
userRoutes.get('/leave/:id', getLeaveRequestsById);

userRoutes.get('/me', getUserMe);
userRoutes.get('/:nik', getUser);
userRoutes.patch('/:nik', updateUser);
userRoutes.delete('/:nik', validateRole("admin", "super_admin"), deleteUser);

userRoutes.patch('/:nik/balance',validateRole("admin", "super_admin"), modifyAmount);
userRoutes.get('/', validateRole("admin", "super_admin") ,allUsers);
userRoutes.get('/:nik/leave-trend', validateRole("admin", "super_admin"), leaveTrend);

export default userRoutes;