import { deleteToken, fetchUserData } from "../services/auth.service.js";
import { decodeToken, generateToken } from "../utils/jwt.js";
import { getDeviceInfo } from "../utils/UAParser.js";
import { v4 as uuidv4 } from "uuid"

export const login = async (req, res, next) => {
    const { email } = req.body;
    let deviceId = req.get("device-id");
    if (!deviceId) {
        deviceId = uuidv4();
    }

    try {
        const user = await fetchUserData("email", email);
        const deviceInfo = await getDeviceInfo(req.get("user-agent"));

        if (!user) {
            const error = new Error('user not found');
            error.statusCode = 404;
            throw error;
        }

        const deviceInfoData = `${deviceInfo.browser.version}-${deviceInfo.browser.name}-${deviceInfo.os.name}`;

        const userData = {
            NIK: user.NIK,
            email: user.email,
            fullname: user.fullname,
            password: user.password,
            role: user.role,
            deviceInfo: deviceInfoData,
            deviceId: deviceId
        }

        const newToken = await generateToken(userData);

        res.setHeader('Authorization', `Bearer ${newToken}`);
        res.setHeader('device-id', deviceId);
        res.status(200).json({
            success: true,
            message: `Welcome ${user.fullname}`,
            data: {
                nik: user.NIK,
                name: user.fullname,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const logout = async (req, res, next) => {
    try {
        const deviceId = req.get("device-id");
        const header = req.get("authorization");
        const token = header?.split(' ')[1];

        const decode = decodeToken(token)
        await deleteToken(decode.NIK, deviceId);
        res.status(200).json({
            success: true,
            message: "You have been successfully logged out.",
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
            status_code: 400
        });
    }
}