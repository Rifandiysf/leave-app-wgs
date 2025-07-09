import express from "express";
import { currentYearLeave, getLeaveRequests, getUser, lastYearLeave,  } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";

const userRoutes = express.Router();

userRoutes.get('/:nik/last-year', lastYearLeave);
userRoutes.get('/:nik/current-year', currentYearLeave);
userRoutes.get('/:nik', isAuthenticated, getUser);

userRoutes.get('/leave', getLeaveRequests);


export default userRoutes;