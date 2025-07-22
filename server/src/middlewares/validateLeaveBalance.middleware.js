import { decodeToken } from '../utils/jwt.js';
import {
    getUserLeaveBalance,
    getPendingLeaveDays,
    isValidDateRange,
    calculateHolidaysDays,
} from '../utils/leaves.utils.js';

export const validateLeaveBalance = async (req, res, next) => {
    try {
        const { start_date, end_date, leave_type } = req.body;
        const { NIK } = await decodeToken(req.get("authorization").split(' ')[1]);

        if (!['personal_leave', 'mandatory_leave'].includes(leave_type)) {
            return next();
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (!isValidDateRange(startDate, endDate)) {
            const error = new Error("Start date cannot be after end date");
            error.status = 400;
            return next(error);
        }

        const requestedHolidaysDays = calculateHolidaysDays(startDate, endDate);

        const totalLeaveBalance = await getUserLeaveBalance(NIK);
        const pendingDays = await getPendingLeaveDays(NIK);
        const availableLeaveBalance = totalLeaveBalance - pendingDays;

        if (requestedHolidaysDays > availableLeaveBalance) {
            const error = new Error(
                `Insufficient leave balance. Available: ${availableLeaveBalance} days, Requested: ${requestedHolidaysDays} Holidays days`
            );
            error.statusCode = 400;
            error.data = {
                total_balance: totalLeaveBalance,
                pending_days: pendingDays,
                available_balance: availableLeaveBalance,
                requested_Holidays_days: requestedHolidaysDays
            };
            return next(error);
        }

        req.HolidaysDays = requestedHolidaysDays;

        next();
    } catch (error) {
        error.statusCode = 500;
        error.message = "Internal server error during leave balance validation";
        return next(error);
    }
};
