import express from 'express'
import { uploadFile } from '../middlewares/uploadFile.middleware.js';
import { importFile } from '../controllers/upload/importFile.controller.js';
import { exportFile } from '../controllers/upload/exportFile.controller.js';

const uploadRoutes = express.Router();

uploadRoutes.use('/import', uploadFile, importFile);
uploadRoutes.use('/export', exportFile);

export default uploadRoutes