import { serviceCreateSetting, serviceGetSetting, serviceUpdateSetting } from "../services/setting.service.js"

export const createSeeting = async (req, res, next) => {
    try {
        const {
            background,
            foreground,
            card,
            cardForeground,
            primary,
            primaryForeground,
            secondary,
            secondaryForground
        } = req.body

        const logo = req.file ? req.file.filename : null
        const imageUrl = logo ? `${req.protocol}://${req.get('host')}/uploads/${logo}` : null

        const data = {
            imageUrl,
            background,
            foreground,
            card,
            cardForeground,
            primary,
            primaryForeground,
            secondary,
            secondaryForground
        }


        const settings = await serviceCreateSetting(data)

        res.status(201).json({
            message: 'successfully created the settings',
            data: {
                imageUrl: settings.imageUrl,
                baseColor: {
                    background: settings.background,
                    foreground: settings.foreground
                },
                cardColor: {
                    card: settings.card,
                    cardForeground: settings.cardForeground
                },
                primaryColor: {
                    primary: settings.primary,
                    primaryForeground: settings.primaryForeground
                },
                secondaryColor: {
                    secondary: settings.secondary,
                    secondaryForground: settings.secondaryForground
                }
            }
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
            data: {
                imageUrl: setting.imageUrl,
                baseColor: {
                    background: setting.background,
                    foreground: setting.foreground
                },
                cardColor: {
                    card: setting.card,
                    cardForeground: setting.cardForeground
                },
                primaryColor: {
                    primary: setting.primary,
                    primaryForeground: setting.primaryForeground
                },
                secondaryColor: {
                    secondary: setting.secondary,
                    secondaryForground: setting.secondaryForground
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

export const updateSetting = async (req, res, next) => {
    const {
        background,
        foreground,
        card,
        cardForeground,
        primary,
        primaryForeground,
        secondary,
        secondaryForground
    } = req.body

    const logo = req.file ? req.file.filename : null
    const imageUrl = logo ? `${req.protocol}://${req.get('host')}/uploads/${logo}` : null

    const data = {
        imageUrl,
        background,
        foreground,
        card,
        cardForeground,
        primary,
        primaryForeground,
        secondary,
        secondaryForground
    }
    const { id } = req.params
    
    console.log("Update setting ID:", id)

    try {
        const settings = await serviceUpdateSetting(id, data)

        res.status(200).json({
            message: "successfully updated the setting data",
            data: {
                imageUrl: settings.imageUrl,
                baseColor: {
                    background: settings.background,
                    foreground: settings.foreground
                },
                cardColor: {
                    card: settings.card,
                    cardForeground: settings.cardForeground
                },
                primaryColor: {
                    primary: settings.primary,
                    primaryForeground: settings.primaryForeground
                },
                secondaryColor: {
                    secondary: settings.secondary,
                    secondaryForground: settings.secondaryForground
                }
            }
        })
    } catch (error) {
        next(error)
    }
}