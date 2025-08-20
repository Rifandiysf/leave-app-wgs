import express, { urlencoded } from 'express';
import { PORT, HOSTNAME} from './config/env.js';
import routes from './routes/index.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import compression from 'compression';
import responseTime from 'response-time';
import morgan from 'morgan'
import errorHandler from './middlewares/errorHandler.middleware.js';
import './jobs/leaveScheduler.js';
import './jobs/autoMandatoryLeave.js';
import { timeouthandle } from './middlewares/requestTimeout.middleware.js';

const app = express()
app.use(timeouthandle)
app.use(morgan('dev'));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(cookieParser());
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


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
