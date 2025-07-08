import express, { urlencoded } from 'express';
import { PORT, HOSTNAME, SESSION_SECRET} from './config/env.js';
import routes from './routes/index.route.js';
import prisma from './utils/client.js';
import session from 'express-session';

const app = express()
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}))
app.use('/api/v1/', routes);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});

// root for testing
app.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const user = await prisma.tb_users.findUnique({
        where: {
            NIK: req.session.user.NIK
        }
    });

    res.status(200).json({
        message: `Welcome ${user.fullname} you login at ${req.session.user.loginDate}`,
        data: user,
    })
})