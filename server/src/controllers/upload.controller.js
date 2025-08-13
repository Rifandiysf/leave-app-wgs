import fs from 'fs'
import { exportFileServices, importFileServices } from "../services/upload.service.js"

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

export const exportFile = async (req, res, next) => {
  try {
    const target = req.query.target  
    const result = await exportFileServices(target);

    res.download('./src/temp/result.csv');
  } catch (error) {
    next(error)
  }
}

