export const validateSpecialLeaveNotWeekend = (req, res, next) => {
    const { leave_type, start_date, end_date } = req.body;

    if (leave_type !== 'special_leave') return next();

    const start = new Date(start_date);
    const end = new Date(end_date);

    const current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day === 0 || day === 6) {
            return res.status(400).json({
                message: "Special leave cannot include weekends (Saturday or Sunday)",
                date: current.toISOString().slice(0, 10)
            });
        }
        current.setDate(current.getDate() + 1);
    }

    next();
};
