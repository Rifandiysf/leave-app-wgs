import { getSearchMandatoryLeaveService } from "../../services/mandatory/getSearchMandatoryLeave.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getSearchMandatoryLeave = async (req, res, next) => {
  try {
    const { value = '', page = 1, limit = 10 } = req.query;

    const result = await getSearchMandatoryLeaveService(value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Search mandatory leave data retrived succesfully", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error);
  }
};