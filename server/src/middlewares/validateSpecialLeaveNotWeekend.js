export const validateSpecialLeaveNotWeekend = (req, res, next) => {
    try {
        const { leave_type, start_date, end_date } = req.body;

        const start = new Date(start_date);
        const end = new Date(end_date);

        const current = new Date(start);
        while (current <= end) {
            const day = current.getDay();
            if (day === 0 || day === 6) {
                const error = new Error("Special leave cannot include weekends (Saturday or Sunday)");
                error.status = 400;
                error.date = current.toISOString().slice(0, 10);
                return next(error);
            }
            current.setDate(current.getDate() + 1);
        }

        next();
    } catch (error) {
        error.status = 500;
        error.message = "Internal server error during weekend validation";
        return next(error);
    }
};
