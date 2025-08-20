import express from 'express'
import { uploadFile } from '../middlewares/uploadFile.middleware.js';
import { exportFile, importFile } from '../controllers/upload.controller.js';

const uploadRoutes = express.Router();

uploadRoutes.use('/import', uploadFile, importFile);
uploadRoutes.use('/export', exportFile);

export default uploadRoutes