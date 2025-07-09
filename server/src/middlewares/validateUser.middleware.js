import { fetchUserData } from "../services/auth.service.js";

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await fetchUserData("email", email);

        if (req.session.user) {
            const error = new Error("user already logged-in");
            error.statusCode = 400
            throw error;
        }

        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        if (user.password != password) {
            const error = new Error("email and password are not valid");
            error.statusCode = 400;
            throw error;
        }

        if (user.role.toString() == "magang") {
            const error = new Error("user not found");
            error.statusCode = 401;
            throw error;
        }

        return next();
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error"
        })
    }

}