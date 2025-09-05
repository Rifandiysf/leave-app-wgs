import { getUserLeaveBalance } from "./getUserLeaveBalance.service.js";
import { getPendingLeaveDays } from "./getPendingLeaveDays.service.js";
import { getUsedLeaveDays } from "./getUsedLeaveDays.service.js";

export const calculateLeaveBalance = async (NIK) => {
    const [totalBalance, pendingDays, usedDays] = await Promise.all([
        getUserLeaveBalance(NIK),
        getPendingLeaveDays(NIK),
        getUsedLeaveDays(NIK)
    ]);

    const availableBalance = totalBalance - pendingDays - usedDays;

    return {
        total_balance: totalBalance,
        used_days: usedDays,
        pending_days: pendingDays,
        available_balance: availableBalance
    };
};