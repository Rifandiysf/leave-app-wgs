import { serviceCreateSetting, serviceGetSetting, serviceUpdateSetting } from "../services/setting.service.js"
import { formatSettingResponse } from "../utils/formatSettingResponse.utils.js"

export const createSeeting = async (req, res, next) => {
    try {
        const {
            imageUrl,
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

        const logo = req.file ? req.file.filename : null
        const image_url = logo ? `${req.protocol}://${req.get('host')}/uploads/${logo}` : null

        const data = {
            imageUrl: image_url,
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
        imageUrl,
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

    const logo = req.file ? req.file.filename : null
    const image_url = logo ? `${req.protocol}://${req.get('host')}/uploads/${logo}` : null

    const data = {
        imageUrl: image_url,
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