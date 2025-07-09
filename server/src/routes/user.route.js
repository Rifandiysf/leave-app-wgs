import express from "express";
import { getUser, updateUser, deleteUser, currentYearLeave, getLeaveRequests, lastYearLeave,  } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { validateRole } from "../middlewares/validateRole.middleware.js";

const userRoutes = express.Router();

userRoutes.get('/:nik/last-year', lastYearLeave);
userRoutes.get('/:nik/current-year', currentYearLeave);
userRoutes.get('/:nik', isAuthenticated, getUser);
userRoutes.patch('/:nik', isAuthenticated, updateUser);
userRoutes.delete('/:nik', isAuthenticated, validateRole("admin", "super_admin"), deleteUser);

userRoutes.get('/leave', getLeaveRequests);


export default userRoutes;