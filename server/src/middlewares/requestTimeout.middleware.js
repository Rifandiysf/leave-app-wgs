import { request } from "http"
import timeout from 'connect-timeout';

export const timeouthandle = async (req, res, next) => {
    try {
        if (req.path.includes('/api/v1/leaves/import')) {
            return next()
        } else{
            return timeout('60s')(req, res, next);
        }
    } catch (error) {
        next(error)
    }

}