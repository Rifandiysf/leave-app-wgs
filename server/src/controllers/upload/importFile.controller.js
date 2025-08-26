import fs from 'fs'
import { importFileServices } from "../../services/upload/importFile.service.js";

export const importFile = async (req, res, next) => {
  try {
    const process = await importFileServices(`./src/temp/${req.file.originalname}`)
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
        throw err
      }
    })
    next(error)
  }
}