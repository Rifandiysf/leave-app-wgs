export const checkStartDateTwoWeeksAhead = (req, res, next) => {
    const { start_date } = req.body;

    if (!start_date) {
        return res.status(400).json({
            success: false,
            message: "Start date is required"
        });
    }

    const inputDate = new Date(start_date);
    const now = new Date();

    const minAllowedDate = new Date(now.setHours(0, 0, 0, 0));
    minAllowedDate.setDate(minAllowedDate.getDate() + 15);

    if (inputDate < minAllowedDate) {
        return res.status(400).json({
            success: false,
            message: `Start date must be at least 14 days from today (${minAllowedDate.toISOString().split("T")[0]})`
        });
    }

    next();
};
