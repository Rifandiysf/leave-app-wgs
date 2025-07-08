import express from "express";
import {
    lastYearLeave,
    currentYearLeave
} from '../controllers/leave.controller.js';

const leaveRoutes = express.Router();

leaveRoutes.get('/lastYear/:nik', lastYearLeave);
leaveRoutes.get('/currentYear/:nik', currentYearLeave);

export default leaveRoutes;