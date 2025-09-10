import fs from 'fs'
import { importFileServices } from "../../services/upload/importFile.service.js";
import { decodeToken } from '../../utils/jwt.js';

export const importFile = async (req, res, next) => {
  try {
    const actor = await decodeToken(req.cookies["Authorization"])
    const process = await importFileServices(`./src/temp/${req.file.originalname}`, actor)
    if (process) {
      fs.unlink(`./src/temp/${req.file.originalname}`, (err) => {
        if (err) {
          throw err
        }
      })

      res.json({
        success: true,
        data: {
          process
        }
      })
    }

  } catch (error) {
    fs.unlink(`./src/temp/${req.file.originalname}`, (err) => {
      if (err) {
        next(error)
      }
    })
    
    next(error)
  }
}