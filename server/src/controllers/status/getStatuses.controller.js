import { getAllStatuses } from "../../services/status/getAllStatuses.service.js";

export const getStatuses = async (req, res, next) => {
    try {
        const statuses = await getAllStatuses();
        res.status(200).json({
            status: "success",
            data: statuses,
            meta: {
                totalItems: statuses.length,
                itemsPerPage: statuses.length,
                currentPage: 1,
                totalPages: 1
            }
        });
    } catch (error) {
        next(error);
    }
};