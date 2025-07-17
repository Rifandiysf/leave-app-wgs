import express from 'express';
import { PORT, HOSTNAME, SESSION_SECRET} from './config/env.js';
import prisma from './utils/client.js';

import cors from 'cors';
import compression from 'compression';
import responseTime from 'response-time';
import morgan from 'morgan';


import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import leaveRoutes from './routes/leave.route.js';


const app = express();
app.use(morgan('dev'));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(compression({
 threshold: 0
}));


const corsOptions = {
 origin: ['http://localhost:3000', 'http://10.10.101.178:3000'], 
 credentials: true,
optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leaves', leaveRoutes);

app.listen(PORT, HOSTNAME, () => {
console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});


app.get('/', async (req, res) => {
 if (!req.session.user) {
return res.status(400).json({
 message: "Invalid Credentials"
});
 }

 const user = await prisma.tb_users.findUnique({
where: {
 NIK: req.session.user.NIK
 }
 });

 res.status(200).json({
 message: `Welcome ${user.fullname} you login at ${req.session.user.loginDate}`,
data: user,
 });
});