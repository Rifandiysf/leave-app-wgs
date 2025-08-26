import { deleteUserByNIK } from "../../services/user/deleteUserByNIK.service.js";

export const deleteUser = async (req, res, next) => {
    const { nik } = req.params
    try {
        const deletedUser = await deleteUserByNIK(nik);

        res.status(200).json({
            status: "success",
            message: "successfully deleted user data",
            data: deletedUser
        })
    } catch (error) {
        error.cause = error.message;
        error.message = "failed to delete user data";
        next(error)
    }
}