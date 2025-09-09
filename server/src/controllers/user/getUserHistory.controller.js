import { success } from "zod/v4"
import { getUserHistoryByNIK } from "../../services/user/getUserHistoryByNIK.service.js"

export const getUserHistory = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || undefined
        const limit = Number(req.query.limit) || undefined
        const dataSource = ["adjustment", "leave"]
        const resources = dataSource.includes(req.query.resources) ? req.query.resources : undefined;
        
        const userHistory = await getUserHistoryByNIK(req.params.nik, limit, page, resources)

        res.status(200).json({
            success: true,
            message: "User history data retrieved successfully",
            data: userHistory
        })
    } catch (error) {
        next(error)
    }
}