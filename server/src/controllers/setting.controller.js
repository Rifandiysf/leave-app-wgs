import { serviceCreateSetting, serviceGetSetting } from "../services/setting.service.js"

export const createSeeting = async (req, res, next) => {
    try {
        const { color } = req.body
        const logo = req.file ? req.file.filename : null

        const data = { color, logo }

        const settings = await serviceCreateSetting(data)

        res.status(200).json({
            message: 'successfully created the settings',
            data: settings
        })
    } catch (error) {
        next(error)
    }
}

export const getSetting = async (req, res, next) => {
    try {
        const data = await serviceGetSetting()

        res.status(200).json({
            message: "successfully retrieved the setting data",
            data: data
        })
    } catch (error) {
        next(error)
    }
}