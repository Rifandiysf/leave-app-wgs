import { createSpecialLeaveService } from "../../services/special-leave/createSpecialLeave.service.js";

export const createSpecialLeave = async (req, res) => {
  const data = req.body
  try {

    const specialLeaves = await createSpecialLeaveService(data)

    res.status(201).json({
      message: "Special leave created successfully",
      data: specialLeaves,
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}