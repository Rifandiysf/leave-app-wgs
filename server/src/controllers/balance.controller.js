import { getAllBalanceAdjustment, getAllBalanceAdjustmentByNIK } from "../services/balance.service.js"
import { decodeToken } from "../utils/jwt.js"
import { responsePagination } from "../utils/responsePagination.utils.js"

export const getHistoryBalanceAdjustment = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const year = parseInt(req.query.year)

        console.log(typeof page);

        const logs = await getAllBalanceAdjustment(page, limit, year)

        const result = responsePagination("Balance Adjustment logs retrieved successfully", logs, limit)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const getHistoryBalanceAdjustmenByNIK = async (req, res, next) => {
     try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const year = parseInt(req.query.year)
        const user = await decodeToken(req.cookies["Authorization"]);

        const logs = await getAllBalanceAdjustmentByNIK(page, limit, user.NIK)

        const result = responsePagination("Balance Adjustment logs retrieved successfully", logs, limit)

        res.status(200).json({result})
    } catch (error) {
        next(error)
    }
}