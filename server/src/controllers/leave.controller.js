import {
  getAllLeavesService,
  updateLeave,
  getLeavesByFilterService
} from "../services/leave.service.js"

export const updateLeaveById = async (req, res) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const { NIK } = req.session.user

  try {
    const updatedLeave = await updateLeave(id, status, reason, NIK);

    if (!updatedLeave) {
      throw new Error("leave not found");
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Successfully updated leave data',
      data: {
        updated_leave: updatedLeave
      }
    })
  } catch (error) {
    return res.status(400).json({
      status : 'failed',
      message: 'failed updated leave data'
    })
}}

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