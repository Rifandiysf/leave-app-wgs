import { serviceCreateSetting, serviceGetSetting, serviceUpdateSetting } from "../services/setting.service.js"
import { formatSettingResponse } from "../utils/formatSettingResponse.utils.js"

export const createSeeting = async (req, res, next) => {
    try {
        const {
            light_background,
            light_foreground,
            light_card,
            light_cardForeground,
            light_primary,
            light_primaryForeground,
            light_secondary,
            light_secondaryForground,
            dark_background,
            dark_foreground,
            dark_card,
            dark_cardForeground,
            dark_primary,
            dark_primaryForeground,
            dark_secondary,
            dark_secondaryForground
        } = req.body

        const lightFile = req.files['light_image'] ? req.files['light_image'][0].filename : null
        const darkFile = req.files['dark_image'] ? req.files['dark_image'][0].filename : null

        const light_image = lightFile ? `${req.protocol}://${req.get('host')}/uploads/${lightFile}` : null
        const dark_image = darkFile ? `${req.protocol}://${req.get('host')}/uploads/${darkFile}` : null

        const data = {
            light_image,
            dark_image,
            light_background,
            light_foreground,
            light_card,
            light_cardForeground,
            light_primary,
            light_primaryForeground,
            light_secondary,
            light_secondaryForground,
            dark_background,
            dark_foreground,
            dark_card,
            dark_cardForeground,
            dark_primary,
            dark_primaryForeground,
            dark_secondary,
            dark_secondaryForground
        }

        const settings = await serviceCreateSetting(data)

        res.status(201).json({
            message: 'successfully created the settings',
            data: formatSettingResponse(settings)
        })
    } catch (error) {
        next(error)
    }
}



export const getSetting = async (req, res, next) => {
    try {
        const data = await serviceGetSetting()

        const setting = data[0]

        res.status(200).json({
            message: "successfully retrieved the setting data",
            data: formatSettingResponse(setting)
        })
    } catch (error) {
        next(error)
    }
}

export const updateSetting = async (req, res, next) => {
    const {
        light_background,
        light_foreground,
        light_card,
        light_cardForeground,
        light_primary,
        light_primaryForeground,
        light_secondary,
        light_secondaryForground,
        dark_background,
        dark_foreground,
        dark_card,
        dark_cardForeground,
        dark_primary,
        dark_primaryForeground,
        dark_secondary,
        dark_secondaryForground
    } = req.body

    const lightFile = req.files['light_image'] ? req.files['light_image'][0].filename : null
    const darkFile = req.files['dark_image'] ? req.files['dark_image'][0].filename : null

    const light_image = lightFile ? `${req.protocol}://${req.get('host')}/uploads/${lightFile}` : null
    const dark_image = darkFile ? `${req.protocol}://${req.get('host')}/uploads/${darkFile}` : null

    const data = {
        light_image,
        dark_image,
        light_background,
        light_foreground,
        light_card,
        light_cardForeground,
        light_primary,
        light_primaryForeground,
        light_secondary,
        light_secondaryForground,
        dark_background,
        dark_foreground,
        dark_card,
        dark_cardForeground,
        dark_primary,
        dark_primaryForeground,
        dark_secondary,
        dark_secondaryForground
    }
    const { id } = req.params

    console.log("Update setting ID:", id)

    try {
        const settings = await serviceUpdateSetting(id, data)

        res.status(200).json({
            message: "successfully updated the setting data",
            data: formatSettingResponse(settings)
        })
    } catch (error) {
        next(error)
    }
}