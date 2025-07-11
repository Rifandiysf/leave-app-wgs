
import express from "express";
import { updateLeaveById } from "../controllers/leave.controller.js";
import { validate } from "../middlewares/validate.js";
import updateLeaveRequestSchema from "../validators/updateLeave.validator.js";

const leaveRoutes = express.Router();

leaveRoutes.patch('/:id', validate(updateLeaveRequestSchema), updateLeaveById)
export default leaveRoutes;