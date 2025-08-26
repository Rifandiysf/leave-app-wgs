import { getHistoryLeaveSearch } from "../../services/leave/getHistoryLeaveSearch.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const historyLeaveSearch = async (req, res, next) => {
  try {
    const { value = '', type = '', status = '' } = req.query;
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const result = await getHistoryLeaveSearch({
      value,
      type,
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    const paginationResponse = responsePagination("Filtered leave history data retrieved successfully", result, limit);
    res.status(200).json(paginationResponse)
  } catch (error) {
    next(error)
  }
};