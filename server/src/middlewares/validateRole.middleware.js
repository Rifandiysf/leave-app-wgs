export const validateRole = (...role) => {
    return (req, res, next) => {
        const user = req.session.user; 

        if (!user) {
            return res.status(403).json({
                message: "Access denied. No role found."
            });
        }

        if (!role.includes(user.role)) {
            return res.status(403).json({
                message: `Access denied.`
            });
        }

        next();
    };
}