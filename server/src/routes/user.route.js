import express from "express";
import { createLeaveRequest, getLeaveRequestsById, getLeavesByFilter, allUsers, getUser, updateUser, deleteUser, getLeaveRequests} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import leaveRequestSchema from "../validators/leave.validator.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";
import { getAllUsers } from "../services/user.service.js";

const userRoutes = express.Router();

userRoutes.post('/leave', validate(leaveRequestSchema), createLeaveRequest);
userRoutes.get('/leave', getLeaveRequests);
userRoutes.get('/leave/search', getLeavesByFilter);
userRoutes.get('/leave/:id', getLeaveRequestsById);

userRoutes.get('/:nik', isAuthenticated, getUser);
userRoutes.patch('/:nik', isAuthenticated, updateUser);
userRoutes.delete('/:nik', isAuthenticated, validateRole("admin", "super_admin"), deleteUser);

userRoutes.get('/', allUsers);

export default userRoutes;