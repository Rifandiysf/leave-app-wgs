import express from "express";
import { getAllLeaves, getLeavesByFilter } from '../controllers/leave.controller.js'

const leaveRoutes = express.Router();

leaveRoutes.get('', getAllLeaves)
leaveRoutes.get('/search', getLeavesByFilter)

export default leaveRoutes;