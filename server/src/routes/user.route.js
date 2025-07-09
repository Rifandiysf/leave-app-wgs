import express from "express";
import { currentYearLeave, getLeaveRequests, lastYearLeave, allUsers } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get('/:nik/last-year', lastYearLeave);
userRoutes.get('/:nik/current-year', currentYearLeave);

userRoutes.get('/leave', getLeaveRequests);

userRoutes.get('/', allUsers);

export default userRoutes;