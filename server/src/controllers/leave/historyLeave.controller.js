import { getHistoryLeave } from "../../services/leave/getHistoryLeave.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const historyLeave = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const result = await getHistoryLeave(page, limit)
    const paginationResponse = responsePagination("Leave history data retrieved successfully", result, limit);
    res.status(200).json(paginationResponse)

  } catch (error) {
    next(error)
  }
}