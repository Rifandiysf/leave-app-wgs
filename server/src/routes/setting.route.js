import express from "express";
import { createSeeting } from "../controllers/setting.controller.js";
import { uploadLogo } from "../middlewares/uploadLogo.middleware.js";

const settingRoutes = express.Router();

settingRoutes.post('/', uploadLogo, createSeeting)

export default settingRoutes;