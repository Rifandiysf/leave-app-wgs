import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = (req, res, next) => {
    const header = req.header("Authorization");
    const token = header?.split(' ')[1];
    
    if (!verifyToken(token)) {
        return res.status(400).json({
            message: "Unauthorized. Please login to access this resource."
        })
    }
    
    return next();
}