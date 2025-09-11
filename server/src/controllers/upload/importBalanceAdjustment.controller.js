import path from "path";
import { importBalanceAdjustmentServices } from "../../services/upload/importBalanceAdjustment.services.js";
import { decodeToken } from "../../utils/jwt.js"
import fs from 'fs'

export const importBalanceAdjustment = async (req, res, next) => {
    try {
        const decodedToken = await decodeToken(req.cookies["Authorization"]);
         const actor = {
            role: decodedToken.tb_roles.name,
            name: decodedToken.fullname
        };
        const filepath = path.resolve("src", "temp", req.file.originalname)
        const process = await importBalanceAdjustmentServices(filepath, actor)

        if (process) {
            fs.unlink(filepath, (err) => {
                if (err) {
                    throw err
                }
            })

            res.json({
                success: true,
                message: "Balance Adjustment data imported successfully.",
                data: {
                    process
                }
            })
        }
    } catch (error) {
        fs.unlink(path.resolve("src", "temp", req.file.originalname), (error) => {
            if (error) {
                next(error)
            }
        })

        next(error)
    }
}