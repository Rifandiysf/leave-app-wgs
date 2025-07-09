import { email } from "zod/v4";
import prisma from "../utils/client.js";
import bcrypt from 'bcrypt';
import { role } from "../../generated/prisma/index.js";


export const fetchUserData = async (params, uniqueId) => {
    const user = await prisma.tb_users.findUnique({
        where: {
            [params]: uniqueId,
            NOT: {
                status_active: "resign"
            }
        }
    })
    
    let password = await bcrypt.hash(user.password, 10);

    const userCopy = {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        status: user.status_active,
        password: password
    }

    return userCopy;
}
