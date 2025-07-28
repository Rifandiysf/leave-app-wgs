import { createDateFromString } from "../utils/leaves.utils.js"

export const validateStartDate = (req, res, next) => {
    const { start_date } = req.body

    const startDate = createDateFromString(start_date)
    const today = createDateFromString(new Date())

    if (startDate.getTime() === today.getTime()) {
        const error = new Error("Leave cannot be requested for today. Please request leave at least one day in advance.")
        error.status = 400;
        return next(error)
    }
    if (startDate.getTime() < today.getTime()) {
        const error = new Error("The leave start date cannot be in the past. Please select a future date.");
        error.status = 400;
        return next(error);
    }

    next()
}
