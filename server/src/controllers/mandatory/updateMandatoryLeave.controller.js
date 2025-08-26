import { updateMandatoryLeaveService } from "../../services/mandatory/updateMandatoryLeave.service.js";

export const updateMandatoryLeave = async (req, res) => {
  try {

    const { id } = req.params
    const data = req.body

    const mandatoryLeave = await updateMandatoryLeaveService(id, data)

    res.status(200).json({
      message: "Mandatory leave updated successfully",
      data: mandatoryLeave
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};