import { createDateFromString } from "../utils/leaves.utils.js"

export const validateLeaveDateRange = (req, res, next) => {
    const { start_date, end_date } = req.body

    const startDate = createDateFromString(new Date(start_date))
    const endDate = createDateFromString(new Date(end_date))

    if(endDate <= startDate){
        const error = new Error("Your leave end date cannot be less than your start date. Please double-check.")
        next(error)
    }
    next()
}