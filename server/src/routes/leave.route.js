
import express from "express";
import { validate } from '../middlewares/validate.js';
import leaveRequestSchema from '../validators/leave.validator.js';
import { validateRole } from '../middlewares/validateRole.middleware.js';

const leaveRoutes = express.Router();

export default leaveRoutes;