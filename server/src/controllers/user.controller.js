import { role } from "../../generated/prisma/index.js"
import { findUserByNIK, getLeaveBalanceByYear, getLeavesByNIK, updateUserByNIK, deleteUserByNIK } from "../services/user.service.js"
import prisma from "../utils/client.js"
import { Prisma } from "../../generated/prisma/index.js"


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
            requested_by: {
                role: role,
                nik : NIK
            },
            data: user
        });
    } catch (error) {
        res.status(error.statusCode).json({
            status: "failed",
            message: error.message,
        })
    }
}

export const updateUser = async (req, res) => {
    const { nik } = req.params
    try {
        const updatedUser = await updateUserByNIK(nik)

        res.status(201).json({
            status: "success",
            message: "successfully update user data",
            data: updatedUser
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "failed to update user data",
            reason: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    const { nik } = req.params
    try {
        const deletedUser = await deleteUserByNIK(nik);

        res.status(200).json({
            status: "success",
            message: "successfully deleted user data",
            data: deletedUser 
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "failed to delete user data",
            reason: error.message
        });
    }
}