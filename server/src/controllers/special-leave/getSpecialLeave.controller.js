import { getSpecialLeaveService } from "../../services/special-leave/getSpecialLeave.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getSpecialLeave = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const gender = req.user.isMale ? 'm' : 'f'

    const result = await getSpecialLeaveService(gender, page, limit);

    const paginationResponse = responsePagination("All special leave was successfully taken", result);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
  }
};