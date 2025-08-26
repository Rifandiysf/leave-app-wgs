import { getUserByNIK } from "../../services/user/getUserByNIK.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const getUser = async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.cookies["Authorization"]);
        const { role, NIK } = decodedToken;
        const { nik } = req.params;
        
        // Check if role and role.slug exist before accessing
        const isAdmin = role && role.slug && ["admin", "super_admin"].includes(role.slug);

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
                role: role.slug, // Use role.slug for consistency
                nik: NIK
            },
            data: user
        });
    } catch (error) {
        next(error);
    }
}