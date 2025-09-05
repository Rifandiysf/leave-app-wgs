import { pendingLeaves } from "../../services/dashboard/pendingLeaves.service.js";

export const getPendingLeaves = async (req, res, next) => {
    try {
        const leaveList  = await pendingLeaves();
        res.status(200).json({
            message: 'Successfully get pending leave data',
            data: {
                pendingLeaveList: leaveList
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed get pending leave data',
            detail: error.message
        })
    }
}