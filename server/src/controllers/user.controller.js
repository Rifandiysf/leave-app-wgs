import { createLeave, getLeaveBalanceByYear, getLeavesByFilterService, getLeavesById, getLeavesByNIK, } from "../services/user.service.js"


export const createLeaveRequest = async (req, res) => {
    try {
        const user = req.session.user

        console.log("Request body:", req.body);
        console.log("id_special di body:", req.body.id_special);

        const leave = await createLeave({
            ...req.body,
            NIK: user.NIK,
        })

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export const getLeaveRequests = async (req, res) => {
    try {
        const user = req.session.user
        const leaves = await getLeavesByNIK(user.NIK)

        res.status(201).json({
            message: "Leave requests retrieved successfully",
            data: leaves,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }

}

export const getLeavesByFilter = async (req, res) => {
    try {
        const { type, status } = req.query;
        const user = req.session.user;

        const leaves = await getLeavesByFilterService(user.NIK, type, status);

        res.status(200).json({
            message: 'Filtered leave data retrieved successfully',
            data: leaves
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


export const getLeaveRequestsById = async (req, res) => {
    try {

        const { id } = req.params
        const user = req.session.user

        const leaves = await getLeavesById(user.NIK, id)

        res.status(201).json({
            message: 'Successfully retrieved leave data by ID',
            data: leaves
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

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