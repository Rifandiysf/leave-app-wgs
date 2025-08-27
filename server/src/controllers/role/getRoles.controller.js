import { getAllRoles } from "../../services/role/getAllRoles.service.js";

export const getRoles = async (req, res, next) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json({
            status: "success",
            data: roles
        });
    } catch (error) {
        next(error);
    }
};