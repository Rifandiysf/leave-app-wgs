import { exportFileServices } from "../../services/upload/exportFile.service.js";

export const exportFile = async (req, res, next) => {
  try {
    const target = req.query.target  
    const result = await exportFileServices(target);

    res.download('./src/temp/result.csv');
  } catch (error) {
    next(error)
  }
}