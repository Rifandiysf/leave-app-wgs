import express from 'express'
import { PORT, HOSTNAME } from './config/env.js'

const app = express()

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})