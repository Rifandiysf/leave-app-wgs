import {statisticDashboard, trendDashboard, leaveLeaderboard, pendingLeaves} from "../services/dashboard.service.js";

export const getStatistics = async (req, res) => {
    try {
        const dataStatistic = await statisticDashboard();

        res.status(200).json({
            message: 'Statistics fetched succesfully',
            data: dataStatistic
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch statistics',
            error: error.message
        })
    }
}

export const getTrend = async (req, res) => {
    try {
        const { year } = req.query
        const currentYear = year ? parseInt(year, 10) : new Date().getFullYear()

        const trend = await trendDashboard(currentYear);

        res.status(200).json({
            message: "Successfully get leave data trend",
            data: {
                year : currentYear,
                trend
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get leave data trend",
            detail: error.message,
        });
    }
}

export const getLeaderboard = async (req, res, next) => {
    try {
        //terbanyak
        const leaderboardDesc = await leaveLeaderboard("desc")
        //terendah
        const leaderboardAsc = await leaveLeaderboard("asc")
        res.status(200).json({
            message: 'Successfully fetched leave leaderboard',
            data : {
                most_used : leaderboardAsc.slice(0, 5),
                least_used : leaderboardDesc.slice(0, 5)
            }
        })
    } catch (error) {
        console.error("Error fetching leave leaderboard:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch leave leaderboard",
            detail: error.message
        });
    }
}

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