import express from 'express'
import { validateRole } from '../middlewares/validateRole.middleware.js'
import { getAllBalanceAdjustment, getAllBalanceAdjustmentByNIK } from '../services/balance.service.js'
import { getHistoryBalanceAdjustmenByNIK, getHistoryBalanceAdjustment } from '../controllers/balance.controller.js'

const balanceRoutes = express.Router()

balanceRoutes.get('/logs', validateRole('admin', 'super_admin'), getHistoryBalanceAdjustment)
balanceRoutes.get('/logs/me', getHistoryBalanceAdjustmenByNIK)

export default balanceRoutes