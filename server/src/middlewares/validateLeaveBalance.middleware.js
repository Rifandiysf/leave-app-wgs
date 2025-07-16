import { verifyToken } from '../utils/jwt.js';
import { 
    calculateWorkingDays, 
    getUserLeaveBalance, 
    getPendingLeaveDays, 
    isValidDateRange 
} from '../utils/leaves.utils.js';

export const validateLeaveBalance = async (req, res, next) => {
    try {
        const { start_date, end_date, leave_type } = req.body;
        const { NIK } = await verifyToken(req.get("authorization").split(' ')[1]);
        if (!['personal_leave', 'mandatory_leave'].includes(leave_type)) {
            return next();
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (!isValidDateRange(startDate, endDate)) {
            return res.status(400).json({
                message: "Start date cannot be after end date"
            });
        }

        const requestedWorkingDays = calculateWorkingDays(startDate, endDate);

        const totalLeaveBalance = await getUserLeaveBalance(NIK);
        const pendingDays = await getPendingLeaveDays(NIK);
        const availableLeaveBalance = totalLeaveBalance - pendingDays;

        if (requestedWorkingDays > availableLeaveBalance) {
            return res.status(400).json({
                message: `Insufficient leave balance. Available: ${availableLeaveBalance} days, Requested: ${requestedWorkingDays} working days`,
                data: {
                    total_balance: totalLeaveBalance,
                    pending_days: pendingDays,
                    available_balance: availableLeaveBalance,
                    requested_working_days: requestedWorkingDays
                }
            });
        }

        req.workingDays = requestedWorkingDays;

        next();
    } catch (error) {
        console.error('Error in validateLeaveBalance middleware:', error);
        res.status(500).json({
            message: "Internal server error during leave balance validation",
            detail: error.message
        });
    }
};
