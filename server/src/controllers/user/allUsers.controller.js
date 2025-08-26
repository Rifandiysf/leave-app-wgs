import { getAllUsers } from "../../services/user/getAllUsers.service.js";
import { responsePagination } from "../../utils/responsePagination.utils.js";

export const allUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || ''
        const gender = req.query.gender || ''
        const status = req.query.status || ''
        const role = req.query.role || ''

        const dataUsers = await getAllUsers(page, limit, search, gender, status, role);

        const response = responsePagination("Successfully retrieved user data", dataUsers, limit);
        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
};