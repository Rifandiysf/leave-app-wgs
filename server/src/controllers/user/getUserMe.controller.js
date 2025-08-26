import { getUserByNIK } from "../../services/user/getUserByNIK.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const getUserMe = async (req, res, next) => {
    try {
        const decode = await decodeToken(req.cookies["Authorization"]);
        const { NIK } = decode;

        const user = await getUserByNIK(NIK);

        res.status(200).json({
            success: true,
            message: `Data retrieve successfully`,
            user_data: user
        });
    } catch (error) {
        next(error);
    }
}