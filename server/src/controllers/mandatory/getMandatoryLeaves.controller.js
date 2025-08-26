import { getAllMandatoryLeavesService } from "../../services/mandatory/getAllMandatoryLeaves.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getMandatoryLeaves = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllMandatoryLeavesService(page, limit);

    const paginationResponse = responsePagination("All mandatory leave was successfully taken", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
  }
};