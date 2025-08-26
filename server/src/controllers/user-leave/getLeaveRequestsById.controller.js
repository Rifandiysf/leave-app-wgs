import { getLeavesById } from "../../services/user-leave/getLeavesById.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const getLeaveRequestsById = async (req, res) => {
    try {

        const { id } = req.params
        const user = await decodeToken(req.cookies["Authorization"])

        const leaves = await getLeavesById(user.NIK, id)

        res.status(201).json({
            message: 'Successfully retrieved leave data by ID',
            data: leaves
        })

    } catch (error) {
        next(error)
    }
}