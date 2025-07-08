import {
    getLeaveBalanceByYear,
} from "../services/user.service.js"


export const lastYearLeave = async (req, res) => {
    const { nik } = req.params
    const lastYear = new Date().getFullYear() - 1

    try {
        const leave = await getLeaveBalanceByYear(nik, lastYear)

        if (!leave) {
            return res.status(404).json({ message: "Last year's leave quota not found" })
        }

        res.json(leave)
    } catch (error) {
        res.status(500).json({ message: "Error retrieving last year data", error: error.message })
    }
}

export const currentYearLeave = async (req, res) => {
    const { nik } = req.params
    const currentYear = new Date().getFullYear()

    try {
        const leave = await getLeaveBalanceByYear(nik, currentYear)

        if (!leave) {
            return res.status(404).json({ message: "Current year's leave quota not found" })
        }

        res.json(leave)
    } catch (error) {
        res.status(500).json({ message: "Error retrieving current year data", error: error.message })
    }
}