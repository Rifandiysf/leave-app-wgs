import { updateLeave } from "../services/leave.service.js";

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
  }
}