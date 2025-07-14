import express, { urlencoded } from 'express';
import { PORT, HOSTNAME, SESSION_SECRET} from './config/env.js';
import routes from './routes/index.route.js';
import prisma from './utils/client.js';
import session from 'express-session';
import cors from 'cors'
import compression from 'compression';
import responseTime from 'response-time';
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(compression({
    threshold: 0
}))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    secure: false, // false for development only
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))


// const corsOption = {
//     origin: "http://localhost:3000",
//     credentials: true
// }
const corsOption = ['http://localhost:3000', 'http://10.10.101.178:3000']
app.use(cors({
    origin: corsOption,
    credentials: true
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