export const timeouthandle = async (req, res, next) => {
        if (req.timedout) {
        return res.status(408).json({
                status: 408,
                message: "request time out"
        });
    }

    next();
}