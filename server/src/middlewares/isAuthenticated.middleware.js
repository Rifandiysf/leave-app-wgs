import prisma from "../utils/client.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const header = req.get("authorization");
        const token = header.split(' ')[1];

        const checkIfTokenValid = await prisma.tb_jwt_token.findUnique({
            where: {
                access_token: token
            }
        });

        if (!checkIfTokenValid) {
            throw new Error("Invalid Token");
        }

        const decodeToken = verifyToken(token);

        if (!decodeToken) {
            throw new Error("Invalid Credentials");
        }

        return next();
    } catch (error) {
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