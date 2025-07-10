import {
  getAllLeaves,
  getLeavesByType,
} from "../services/leave.service.js"


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
