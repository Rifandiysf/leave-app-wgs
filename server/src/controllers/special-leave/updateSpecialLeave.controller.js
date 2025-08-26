import { updateSpecialLeaveService } from "../../services/special-leave/updateSpecialLeave.service.js";

export const updateSpecialLeave = async (req, res) => {
  try {

    const { id } = req.params
    const data = req.body

    const specialLeaves = await updateSpecialLeaveService(id, data)

    res.status(200).json({
      message: "Special leave updated successfully",
      data: specialLeaves
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}