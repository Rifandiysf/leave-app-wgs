import { getAllBalanceAdjustment } from "../../services/balance/getAllBalanceAdjustment.service.js";
import { createDateFromString } from "../../utils/leaves.utils.js"
import { responsePagination } from "../../utils/responsePagination.utils.js"

export const getHistoryBalanceAdjustment = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const startDate = req.query.start ? createDateFromString(req.query.start) : undefined
        const endDate = req.query.end ? createDateFromString(req.query.end) : undefined
        const balanceYear = parseInt(req.query.year)
        const searchValue = req.query.value

        endDate?.setUTCHours(23, 59, 59);

        const logs = await getAllBalanceAdjustment(page, limit, startDate, endDate, balanceYear, searchValue)

        const result = responsePagination("Balance Adjustment logs retrieved successfully", logs)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}