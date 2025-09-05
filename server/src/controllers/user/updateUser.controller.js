import { updateUserByNIK } from "../../services/user/updateUserByNIK.service.js";

export const updateUser = async (req, res, next) => {
    const { nik } = req.params
    try {
        const updatedUser = await updateUserByNIK(nik, req.body) // Pass req.body as data

        res.status(201).json({
            status: "success",
            message: "successfully update user data",
            data: updatedUser
        })
    } catch (error) {
        error.cause = error.message;
        error.message = "failed to update user data";
        next(error)
    }
}