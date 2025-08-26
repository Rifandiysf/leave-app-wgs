import express from "express";
import { createLeaveRequest } from "../controllers/user-leave/createLeaveRequest.controller.js";
import { getLeaveRequests } from "../controllers/user-leave/getLeaveRequests.controller.js";
import { getLeavesByFilter } from "../controllers/user-leave/getLeavesByFilter.controller.js";
import { getLeaveRequestsById } from "../controllers/user-leave/getLeaveRequestsById.controller.js";
import { getAllMandatoryLeaves } from "../controllers/user-leave/getAllMandatoryLeaves.controller.js";
import { leaveTrend } from "../controllers/user-leave/leaveTrend.controller.js";
import { allUsers } from "../controllers/user/allUsers.controller.js";
import { getUser } from "../controllers/user/getUser.controller.js";
import { getUserMe } from "../controllers/user/getUserMe.controller.js";
import { updateUser } from "../controllers/user/updateUser.controller.js";
import { deleteUser } from "../controllers/user/deleteUser.controller.js";
import { modifyAmount } from "../controllers/user-balance/modifyAmount.controller.js";
import { validate } from "../middlewares/validate.js";
import leaveRequestSchema from "../validators/leave.validator.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";

import { validateLeaveBalance } from "../middlewares/validateLeaveBalance.middleware.js";
import { validateSpecialLeaveNotWeekend } from "../middlewares/validateSpecialLeaveNotWeekend.js";
import { checkDuplicateLeave } from "../middlewares/checkDuplicateLeave .middleware.js";
import { validateStartDate } from "../middlewares/validateStartDate.middleware.js";
import { validateLeaveDateRange } from "../middlewares/validateLeaveDateRange.middleware.js";
import { getSpecialLeave } from "../controllers/special-leave/getSpecialLeave.controller.js";

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