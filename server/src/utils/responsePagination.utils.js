// import { success } from "zod/v4"; // This import seems unused, can be removed

export const responsePagination = (message, serviceResult) => {
    console.log("serviceResult received by responsePagination:", serviceResult);
    const { employees, pagination } = serviceResult.data;

    const response = {
        success: true,
        message: message,
        pagination: {
            current_page: pagination.currentPage,
            last_visible_page: pagination.totalPages,
            has_next_page: pagination.currentPage < pagination.totalPages,
            item: {
                count: employees.length,
                total: pagination.total,
                per_page: pagination.limit
            }
        },
        data: employees,
    }

    return response;
}