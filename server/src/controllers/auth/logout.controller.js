import { deleteToken } from "../../services/auth/deleteToken.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const logout = async (req, res, next) => {
    try {
        const deviceId = req.cookies["device-id"];
        const token = req.cookies["Authorization"];
        console.log(token);

        // check expired token.
        const decode = decodeToken(token)

        // check if token are exist in database.
        await deleteToken(decode.NIK, deviceId);

        res.clearCookie("Authorization", {
            httpOnly: true,
            secure: true,
            path: "/"
        });
        res.clearCookie("device-id", {
            httpOnly: true,
            secure: true,
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "You have been successfully logged out.",
        });
    } catch (error) {
        next(error);
    }
}