import express from "express";
import { createLeaveRequest, currentYearLeave, getLeaveRequests, getLeaveRequestsById, getLeavesByFilter, lastYearLeave } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import leaveRequestSchema from "../validators/leave.validator.js";

const userRoutes = express.Router();

userRoutes.get('/:nik/last-year', lastYearLeave);
userRoutes.get('/:nik/current-year', currentYearLeave);

userRoutes.post('/leave', validate(leaveRequestSchema), createLeaveRequest);
userRoutes.get('/leave', getLeaveRequests)
userRoutes.get('/leave/search', getLeavesByFilter)
userRoutes.get('/leave/:id', getLeaveRequestsById)

export default userRoutes;