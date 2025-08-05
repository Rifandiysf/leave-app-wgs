import { serviceCreateSeeting } from "../services/setting.service.js"

export const createSeeting = async (req, res, next) => {
    try {
        const { color } = req.body
        const logo = req.file ? req.file.filename : null

        const data = { color, logo }

        const settings = await serviceCreateSeeting(data)

        res.status(200).json({
            message: 'successfully created the settings',
            data: settings
        })
    } catch (error) {
        next(error)
    }
}
