import { fetchUserData } from "../services/auth.service.js";

export const validateUser = async (req, res, next) => {
    if (req.session.user) {
        next()
    }
    const { email, password } = req.body;
    try {
        const user = await fetchUserData("email", email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password != password) {
            throw new Error("email and password are not valid ")
        }

        if (user.role.toString() == "magang") {
            throw new Error(`invalid role: ${user.role}`);
        }

        return next();
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}