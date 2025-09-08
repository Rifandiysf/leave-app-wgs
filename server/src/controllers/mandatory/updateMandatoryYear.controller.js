import { updateMandatoryYearService } from "../../services/mandatory/updateMandatoryYearService.service.js"

export const updateMandatoryYear = async (req, res) => {
    try {
        const year = req.params
        const data = await updateMandatoryYearService(year)

        res.status(201).json({
            message: "Mandatory leave updated successfully",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}