import express from "express";
import { createSeeting, getSetting, updateSetting } from "../controllers/setting.controller.js";
import { uploadLogo } from "../middlewares/uploadLogo.middleware.js";

const settingRoutes = express.Router();

settingRoutes.post('/', uploadLogo, createSeeting)
settingRoutes.get('/', getSetting)
settingRoutes.patch('/:id', uploadLogo, updateSetting)

export default settingRoutes;