import { updateLeave } from "../../services/leave/updateLeave.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const updateLeaveById = async (req, res, next) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const decodedToken = await decodeToken(req.cookies["Authorization"]);
  const { NIK, fullname } = decodedToken;

  try {
    const updatedLeave = await updateLeave(id, status, reason, NIK, fullname);

    if (!updatedLeave) {
      const error = new Error("leave not found");
      error.statusCode = 404;
      error.cause = "leave not found in database"
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully updated leave data',
      data: {
        updated_leave: updatedLeave
      }
    })
  } catch (error) {
    next(error)
  }
}