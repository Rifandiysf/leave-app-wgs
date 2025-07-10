import {
  getAllLeaves,
  getLeavesByType,
} from "../services/leave.service.js"
import { createLeave, getHistoryLeave } from "../services/leave.service.js"


export const createLeaveRequest = async (req, res) => {
  try {
    const user = req.session.user

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

export const getAdminLeaveRequests = async (req, res) => {
  const { type } = req.query

  if (type === "personal") {
    return getAdminPersonalLeave(req, res)
  } else if (type === "mandatory") {
    return getAdminMandatoryLeave(req, res)
  } else if (type === "special") {
    return getAdminSpecialLeave(req, res)
  }

  return getAdminAllLeaveRequests(req, res)
}

const getAdminAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await getAllLeaves()
    res.status(200).json({
      message: "All leave requests retrieved successfully",
      data: leaves,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAdminPersonalLeave = async (req, res) => {
  try {
    const personalLeaves = await getLeavesByType("personal_leave")
    res.status(200).json({
      message: "Personal leave requests retrieved successfully",
      data: personalLeaves,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAdminMandatoryLeave = async (req, res) => {
  try {
    const mandatoryLeaves = await getLeavesByType("mandatory_leave")
    res.status(200).json({
      message: "Mandatory leave requests retrieved successfully",
      data: mandatoryLeaves,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAdminSpecialLeave = async (req, res) => {
  try {
    const specialLeaves = await getLeavesByType("special_leave")
    res.status(200).json({
      message: "Special leave requests retrieved successfully",
      data: specialLeaves,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const historyLeave = async (req, res) => {
  try {
    const result = await getHistoryLeave()
    res.status(200).json({succes: true, data: result})
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({succes: false, message: 'Server Error'})
  }
}

export const historyLeaveSearch = async (req, res) => {
  try {
    const {value, type, status} = req.query

    const result = await getHistoryLeave({
      value: value || '',
      type: type || '',
      status: status || ''
    })
    
    res.status(200).json({success: true, data: result})
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({success: false, message: error.message})
  }
}
