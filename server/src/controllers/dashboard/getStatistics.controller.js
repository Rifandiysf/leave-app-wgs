import { statisticDashboard } from "../../services/dashboard/statisticDashboard.service.js";

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