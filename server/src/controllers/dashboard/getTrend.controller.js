import { trendDashboard } from "../../services/dashboard/trendDashboard.service.js";

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