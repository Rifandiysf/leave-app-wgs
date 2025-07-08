import express from "express";
import { currentYearLeave, lastYearLeave } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get('/:nik/last-year', lastYearLeave);
userRoutes.get('/:nik/current-year', currentYearLeave);
export default userRoutes;