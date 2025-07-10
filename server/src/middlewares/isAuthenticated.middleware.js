export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).json({
            message: "Unauthorized. Please login to access this resource."
        })
    }
    
    return next();
}