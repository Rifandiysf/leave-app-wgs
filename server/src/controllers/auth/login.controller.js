import { fetchUserData } from "../../services/auth/fetchUserData.service.js";
import { generateToken } from "../../utils/jwt.js";
import { getDeviceInfo } from "../../utils/UAParser.js";
import { v4 as uuidv4 } from "uuid"

export const login = async (req, res, next) => {
    const { email } = req.body;
    let deviceId = req.cookies["device-id"];
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
            role: {
                id: user.role.id,
                name: user.role.name,
                slug: user.role.slug
            },
            status: {
                id: user.status.id,
                name: user.status.name
            },
            gender: user.gender
        }

        const deviceData = {
            deviceInfo: deviceInfoData,
            deviceId: deviceId
        }


        const newToken = await generateToken(userData, deviceData);

        res.cookie('Authorization', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 86400000)
        });
        res.cookie('device-id', deviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 86400000)
        });
        res.status(200).json({
            success: true,
            message: `Welcome ${user.fullname}`,
            data: {
                nik: user.NIK,
                name: user.fullname,
                role: {
                    id: user.role.id,
                    name: user.role.name,
                    slug: user.role.slug
                }
            }
        });
    } catch (error) {
        next(error);
    }
}