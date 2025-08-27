import { fetchUserData } from "../services/auth/fetchUserData.service.js";
import bcrypt, { hash } from 'bcrypt';
import { decodeToken } from "../utils/jwt.js";

export const validateUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await fetchUserData("email", email.toLowerCase());

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        console.log(`email user : ${user.email}`)
        console.log(`password user : ${user.password}`)

        // Correct password comparison
        let hashpassword = await bcrypt.hash(user.password, 10);

        const match = await bcrypt.compare(password, hashpassword);
        console.log(match)

        if (!match) {
            const error = new Error("Your email or password is incorrect.");
            error.statusCode = 400;
            throw error;
        }

        // Check user active status
        if (!user.is_active) {
            const error = new Error(`Account is no longer active.`);
            error.statusCode = 401;
            throw error;
        }

        // Check for "magang" role using slug
        if (user.tb_roles && user.tb_roles.slug === "magang") {
            const error = new Error(`Your role does not have access to this system.`);
            error.statusCode = 401;
            throw error;
        }

        return next();
    } catch (error) {
        next(error);
    }

}