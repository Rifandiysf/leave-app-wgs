import { success } from "zod/v4";

export const responsePagination = (message, result, limit) => {
    const response = {
        success: true,
        message: message,
        pagination: {
            current_page: result.page,
            last_visible_page: result.totalPages,
            has_next_page: result.page < result.totalPages,
            item: {
                count: result.data.length,
                total: result.total,
                per_page: parseInt(limit)
            }
        },
        data: result.data,
    }

    return response;
}