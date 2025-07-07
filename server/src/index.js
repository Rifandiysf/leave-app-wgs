import express, { urlencoded } from 'express';
import { PORT, HOSTNAME } from './config/env.js';
import routes from './routes/index.route.js';
import prisma from './utils/client.js';

const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/v1', routes);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});

// root for testing
app.get('/', async (req, res) => {
    const user = await prisma.tb_users.findMany();
    res.status(200).json({
        data: user,
        message: "Server Running"
    })
})