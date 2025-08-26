import { getAllRoles } from "../../services/role/getAllRoles.service.js";

export const getRoles = async (req, res, next) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json({
            status: "success",
            data: roles,
            meta: {
                totalItems: roles.length,
                itemsPerPage: roles.length,
                currentPage: 1,
                totalPages: 1
            }
        });
    } catch (error) {
        next(error);
    }
};