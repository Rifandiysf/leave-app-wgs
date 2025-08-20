import express from "express";
import { createSeeting, getSetting, updateSetting } from "../controllers/setting.controller.js";
import { uploadSettingImages } from "../middlewares/uploadSettingImages.middleware.js";

const settingRoutes = express.Router();

settingRoutes.post('/', uploadSettingImages, createSeeting)
settingRoutes.get('/', getSetting)
settingRoutes.patch('/:id', uploadSettingImages, updateSetting)

export default settingRoutes;