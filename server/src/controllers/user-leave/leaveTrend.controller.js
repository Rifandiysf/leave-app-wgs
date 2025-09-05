import { getLeaveTrendByNik } from "../../services/user-leave/getLeaveTrendByNik.service.js";

export const leaveTrend = async (req, res, next) => {
    try {
        const {nik} = req.params
        const result = await getLeaveTrendByNik(nik)

        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                nik,
                trend : result.trend
            }
        })
    } catch(error) {
        error.cause = error.message
        error.message = 'failed to get leave data trends'
        next(error)
    }

}