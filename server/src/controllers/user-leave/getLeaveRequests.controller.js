import { getLeavesByNIK } from "../../services/user-leave/getLeavesByNIK.service.js";
import { decodeToken } from "../../utils/jwt.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const getLeaveRequests = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const user = await decodeToken(req.cookies["Authorization"])
        const leaves = await getLeavesByNIK(user.NIK, page, limit)

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        const pagination = responsePagination("Leave requests retrieved successfully", leaves)

        res.status(201).json(pagination)
    } catch (error) {
        next(error)
    }
}