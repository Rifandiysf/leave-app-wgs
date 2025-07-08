export const isAuthenticated = (req, res, next) => {
    if(!res.session && req.session.user) {
        return res.status(401).json({
            message: "Login ei"
        });
    }
    return next();
}