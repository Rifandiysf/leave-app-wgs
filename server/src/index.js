import express from 'express'
import { PORT, HOSTNAME } from './config/env.js';
import routes from './routes/index.route.js';

const app = express()

app.use('/api/v1', routes);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})