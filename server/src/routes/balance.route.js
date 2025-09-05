import express from 'express'
import { validateRole } from '../middlewares/validateRole.middleware.js'
import { getHistoryBalanceAdjustment } from '../controllers/balance/getHistoryBalanceAdjustment.controller.js';
import { getHistoryBalanceAdjustmenByNIK } from '../controllers/balance/getHistoryBalanceAdjustmenByNIK.controller.js';

const balanceRoutes = express.Router()

balanceRoutes.get('/logs', validateRole('admin', 'super_admin'), getHistoryBalanceAdjustment)
balanceRoutes.get('/logs/me', getHistoryBalanceAdjustmenByNIK)

export default balanceRoutes