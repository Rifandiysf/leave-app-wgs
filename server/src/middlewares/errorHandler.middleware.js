const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        status_code: err.statusCode || 500,
        message: err.message ?? 'Internal Server Error',
        detail: err.cause || '',
        stack: process.env.NODE_ENV === "development" ? err.stack : ""
    });
}

export default errorHandler;