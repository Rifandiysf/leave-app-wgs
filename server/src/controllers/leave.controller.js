import { createLeave } from "../services/leave.service.js";
import prisma from "../utils/client.js";

export const createLeaveRequest = async (req, res) => {
    try {

        const user = req.session.user;

        const leave = await createLeave({
            ...req.body,
            NIK: user.NIK
        })

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const getLeaveRequests = async (req, res) => {
    const { type } = req.query

    if (type === 'personal') {
        return getPersonalLeave(req, res)
    } else if (type === 'mandatory') {
        return getMandatoryLeave(req, res)
    } else if (type === 'special') {
        return getSpecialLeave(req, res)
    }

    return getAllLeaveRequests(req, res)
}

const getAllLeaveRequests = async (req, res) => {
    try {
        const leaves = await prisma.tb_leave.findMany()
        res.status(200).json({
            message: 'All leave requests retrieved successfully',
            data: leaves,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

const getPersonalLeave = async (req, res) => {
    try {
        const personalLeaves = await prisma.tb_leave.findMany({
            where: { leave_type: 'personal_leave' },
        })

        res.status(200).json({
            message: 'Personal leave requests retrieved successfully',
            data: personalLeaves,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getMandatoryLeave = async (req, res) => {
    try {
        const mandatoryLeaves = await prisma.tb_leave.findMany({
            where: { leave_type: 'mandatory_leave' },
        })

        res.status(200).json({
            message: 'Mandatory leave requests retrieved successfully',
            data: mandatoryLeaves,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getSpecialLeave = async (req, res) => {
    try {
        const specialLeaves = await prisma.tb_leave.findMany({
            where: { leave_type: 'special_leave' },
        })

        res.status(200).json({
            message: 'Special leave requests retrieved successfully',
            data: specialLeaves,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
