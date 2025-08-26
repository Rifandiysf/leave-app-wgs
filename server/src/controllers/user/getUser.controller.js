import { getUserByNIK } from "../../services/user/getUserByNIK.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const getUser = async (req, res, next) => {
    try {
        const decode = await decodeToken(req.cookies["Authorization"]);
        const { role, NIK } = decode;
        const { nik } = req.params;
        const isAdmin = ["admin", "super_admin"].includes(role);

        if (!isAdmin) {
            if (NIK !== nik) {
                const err = new Error("User requested has no permission");
                err.statusCode = 401;
                throw err;
            }
        }

        const user = await getUserByNIK(nik);

        res.status(200).json({
            success: true,
            message: `Data retrieve successfully`,
            requested_by: {
                role: role,
                nik: NIK
            },
            data: user
        });
    } catch (error) {
        next(error);
    }
}