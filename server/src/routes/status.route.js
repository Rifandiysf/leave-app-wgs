import express from 'express';
import { getStatuses } from '../controllers/status/getStatuses.controller.js';

const router = express.Router();

router.get('/', getStatuses);

export default router;