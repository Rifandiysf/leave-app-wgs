import express from "express";
import { createSeeting, getSetting } from "../controllers/setting.controller.js";
import { uploadLogo } from "../middlewares/uploadLogo.middleware.js";

const settingRoutes = express.Router();

settingRoutes.post('/', uploadLogo, createSeeting)
settingRoutes.get('/', getSetting)

export default settingRoutes;