import { serviceUpdateSetting } from "../../services/setting/updateSetting.service.js";
import { formatSettingResponse } from "../../utils/formatSettingResponse.utils.js";

export const updateSetting = async (req, res, next) => {
    const data = {};

    for (const key in req.body) {
        if (req.body[key] !== undefined) {
            data[key] = req.body[key];
        }
    }

    const lightFile = req.files && req.files['light_image'] ? req.files['light_image'][0].filename : null;
    if (lightFile) {
        data.light_image = `${req.protocol}://${req.get('host')}/uploads/${lightFile}`;
    }

    const darkFile = req.files && req.files['dark_image'] ? req.files['dark_image'][0].filename : null;
    if (darkFile) {
        data.dark_image = `${req.protocol}://${req.get('host')}/uploads/${darkFile}`;
    }

    try {
        const settings = await serviceUpdateSetting(data);

        res.status(200).json({
            message: "successfully updated the setting data",
            data: formatSettingResponse(settings)
        });
    } catch (error) {
        next(error);
    }
};