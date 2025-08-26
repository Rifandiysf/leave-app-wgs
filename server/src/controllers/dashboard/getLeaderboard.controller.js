import { leaveLeaderboard } from "../../services/dashboard/leaveLeaderboard.service.js";

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