import fs from 'fs'
import { importFileServices } from "../../services/upload/importFile.service.js";
import { decodeToken } from '../../utils/jwt.js';
import path from 'path';

export const importFile = async (req, res, next) => {
  try {
    const actor = await decodeToken(req.cookies["Authorization"])
    const filepath = path.resolve("src", "temp", req.file.originalname)
    const process = await importFileServices(filepath, actor)
    if (process) {
      fs.unlink(filepath, (err) => {
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
    fs.unlink(path.resolve("src", "temp", req.file.originalname), (err) => {
      if (err) {
        next(error)
      }
    })
    
    next(error)
  }
}