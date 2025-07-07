import express from 'express'

import authRoute from './routes/auth.route.js'

const app = express()
const hostName = '127.0.0.1'
const port = 3000

app.use('/api/auth', authRoute)

app.listen(port, hostName () => {
    console.log(`Server running at http://${hostName}:${port}`)
})