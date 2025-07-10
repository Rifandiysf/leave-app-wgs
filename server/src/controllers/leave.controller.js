import {
  getAllLeavesService,
  getLeavesByFilterService
} from "../services/leave.service.js"

export const getAllLeaves = async (req, res) => {
  try {

    const leaves = await getAllLeavesService()

    res.status(201).json({
      message: "All leave requests retrieved successfully",
      data: leaves
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const getLeavesByFilter = async (req, res) => {
  try {
    const { value, type } = req.query;

    const leaves = await getLeavesByFilterService(type, value);

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