import { getLeavesByFilterService } from "../../services/user-leave/getLeavesByFilter.service.js";
import { decodeToken } from "../../utils/jwt.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getLeavesByFilter = async (req, res, next) => {
    try {
        const { value, type, status, page = 1, limit = 10 } = req.query;

        const user = await decodeToken(req.cookies["Authorization"]);

        const leaves = await getLeavesByFilterService(user.NIK, type, status, value, page, limit);

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        const result = responsePagination('Filtered leave data retrieved successfully', leaves, limit)
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};