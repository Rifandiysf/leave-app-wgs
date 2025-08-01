import express, { urlencoded } from 'express';
import { PORT, HOSTNAME} from './config/env.js';
import routes from './routes/index.route.js';
import cors from 'cors'
import compression from 'compression';
import responseTime from 'response-time';
import morgan from 'morgan'
import timeout from 'connect-timeout';
import errorHandler from './middlewares/errorHandler.middleware.js';
import './jobs/leaveScheduler.js';

const app = express()
app.use(timeout('5s'));
app.use(morgan('dev'));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(compression({
    threshold: 0
}))

const corsOption = ['http://localhost:3000', 'http://10.10.101.178:3000']
app.use(cors({
    origin: corsOption,
    credentials: true,
    exposedHeaders: ["Authorization", "device-id"]
}))

app.use('/api/v1/', routes);
app.use(errorHandler);


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
