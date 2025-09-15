import express from "express";
import { createSeeting } from '../controllers/setting/createSetting.controller.js';
import { getSetting } from '../controllers/setting/getSetting.controller.js';
import { updateSetting } from '../controllers/setting/updateSetting.controller.js';
import { uploadSettingImages } from "../middlewares/uploadSettingImages.middleware.js";

const settingRoutes = express.Router();

settingRoutes.post('/', uploadSettingImages, createSeeting)
settingRoutes.get('/', getSetting)
settingRoutes.patch('/', uploadSettingImages, updateSetting)

export default settingRoutes;