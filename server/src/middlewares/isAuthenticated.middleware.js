export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    
    return next();
}