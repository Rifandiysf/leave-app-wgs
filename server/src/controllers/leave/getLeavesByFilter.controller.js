import { getLeavesByFilterService } from "../../services/leave/getLeavesByFilter.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getLeavesByFilter = async (req, res, next) => {
  try {
    const { value, type, page = 1, limit = 10 } = req.query;

    const leaves = await getLeavesByFilterService(type, value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Filtered leave data retrieved successfully", leaves, limit);

    res.status(200).json(paginationResponse);

  } catch (error) {
    next(error)
  }
}