import { getUserByNIK } from "../../services/user/getUserByNIK.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const getUser = async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.cookies["Authorization"]);
        const { tb_roles, NIK } = decodedToken; // Destructure tb_roles instead of role
        const { nik } = req.params;
        
        // Check if tb_roles and tb_roles.slug exist before accessing
        const isAdmin = tb_roles && tb_roles.slug && ["admin", "super_admin"].includes(tb_roles.slug);

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
            data: user
        });
    } catch (error) {
        next(error);
    }
}