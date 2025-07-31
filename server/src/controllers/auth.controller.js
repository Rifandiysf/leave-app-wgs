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
        const user = await fetchUserData("email", email.toLowerCase());
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
            role: user.role,
        }

        const deviceData = {
            deviceInfo: deviceInfoData,
            deviceId: deviceId
        }
        

        const newToken = await generateToken(userData, deviceData);

        res.cookie('Authorization', newToken);
        res.cookie('device-id', deviceId);
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
       next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const deviceId = req.get("device-id");
        const header = req.get("authorization");
        const token = header?.split(' ')[1];

        // check expired token.
        const decode = decodeToken(token)

        // check if token are exist in database.
        await deleteToken(decode.NIK, deviceId);

        res.status(200).json({
            success: true,
            message: "You have been successfully logged out.",
        });
    } catch (error) {
        next(error);
    }
}