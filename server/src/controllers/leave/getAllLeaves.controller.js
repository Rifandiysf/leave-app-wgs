import { getAllLeavesService } from "../../services/leave/getAllLeaves.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getAllLeaves = async (req, res, next) => {
  try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const leaves = await getAllLeavesService(page, limit)

    const paginationResponse = responsePagination("Leave data retrieved successfully", leaves, limit);

    res.status(200).json(paginationResponse);

  } catch (error) {
    next(error)
  }
}