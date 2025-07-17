
export const validateRole = (...allowedRoles) => {
    return (req, res, next) => {
        
        const user = req.user; 

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ 
                message: "Akses ditolak. Anda tidak memiliki hak akses yang diperlukan." 
            });
        }
        
        next();
    };
};