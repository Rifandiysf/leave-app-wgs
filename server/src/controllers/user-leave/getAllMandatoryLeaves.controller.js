import { getAllMandatoryLeavesService } from "../../services/user-leave/getAllMandatoryLeaves.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getAllMandatoryLeaves = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await getAllMandatoryLeavesService(page, limit, req); 

        const paginationResponse = responsePagination("All mandatory leave was successfully taken", result);

        res.status(200).json(paginationResponse);
    } catch (error) {
        next(error)
    }
};