import { createMandatoryLeaveService } from "../../services/mandatory/createMandatoryLeave.service.js";

export const createMandatoryLeave = async (req, res, next) => {
  const data = req.body
  try {
    const mandatoryLeaves = await createMandatoryLeaveService(data);
    res.status(201).json({
      success: true,
      message: "Mandatory leave created successfully",
      data: mandatoryLeaves
    });
  } catch (error) {
    next(error)
  }
};