import { deleteToken } from "../services/auth.service.js";
import prisma from "../utils/client.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const header = req.get("authorization");

        if (!header) {
            throw new Error("Authorization header not found");
        }

        const token = header.split(' ')[1];
        const decodeToken = await verifyToken(token);

        if (!decodeToken) {
            throw new Error("Invalid Credentials");
        }

        return next();
    } catch (error) {

        if (error.name === "TokenExpiredError" && token) {
            await deleteToken(token);
            error.message = "login session expired"
        }
        
        res.status(408).json({
            status: false,
            status_code: 408,
            message: "Unauthorized. Please login to access this resource.",
            detail: error.message
        })
    }
    // const header =
    // if (decode.payload) {
    //     return res.status(400).json({
    //         message: "Unauthorized. Please login to access this resource."
    //     });
    // }
    
    // return next();
}