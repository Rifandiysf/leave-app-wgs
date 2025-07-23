export const timeouthandle = async (req, res, next) => {
        if (req.timedout && err.timeout === 5000) {
        const error = new Error("Request time out");
        error.statusCode = 408;
        next(error);
    }
    
    next();
}