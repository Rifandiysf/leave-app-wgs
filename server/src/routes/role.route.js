import express from 'express';
import { getRoles } from '../controllers/role/getRoles.controller.js';

const router = express.Router();

router.get('/', getRoles);

export default router;