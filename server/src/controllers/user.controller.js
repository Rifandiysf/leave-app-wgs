import { role } from "../../generated/prisma/index.js"
import { findUserByNIK, getLeaveBalanceByYear, getLeavesByNIK, } from "../services/user.service.js"


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

export const getLeaveRequests = async (req, res) => {
    try {
        const user = req.session.user
        const leaves = await getLeavesByNIK(user.NIK)

        res.status(200).json({
            message: "Leave requests retrieved successfully",
            data: leaves,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export const getUser = async (req, res) => {
    const { nik } = req.params;
    const { role, NIK } = req.session.user;
    const isAdmin = ["admin", "super_admin"].includes(role);
    try {
        if(!isAdmin) {
            if (NIK !== nik) {
                const err = new Error("User requested has no permission");
                err.statusCode = 400;
                throw err;
            }
        }

        const user = await findUserByNIK(nik);

        res.status(200).json({
            status: "successful",
            message: `Data retrieve successfully`,
            userRequested: {
                role: role,
                nik : NIK
            },
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })
    }
}

export const updateUser = () => {

}