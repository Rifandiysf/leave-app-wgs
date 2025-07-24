export const validateStartDate = (req, res, next) => {
    const { start_date } = req.body

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    if (startDate <= today) {
        const error = new Error("The start date must be later than today.");
        error.status = 400;
        return next(error);
    }

    next()
}