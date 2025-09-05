import { adjustModifyAmount } from "../../services/user-balance/adjustModifyAmount.service.js";
import prisma from '../../utils/client.js'
import { decodeToken } from "../../utils/jwt.js";

export const modifyAmount = async (req, res, next) => {
    try {
        const { nik } = req.params;
        const { adjustment_value, notes, leave_type } = req.body;
        const token = req.cookies["Authorization"];

        const decodedToken = await decodeToken(token);
        const actor = {
            nik: decodedToken.NIK,
            role: decodedToken.role,
            name: decodedToken.fullname
        };

        console.log(actor.name);

        if (!actor.nik || !actor.role) {
            const error = new Error("Unauthorized: incomplete token data");
            error.statusCode = 401;
            throw error;
        }

        if (actor.nik === nik) {
            const error = new Error("You are not allowed to add your own leave balance");
            error.statusCode = 403;
            throw error;
        }

        const targetUser = await prisma.tb_users.findFirst({
            where: { NIK: nik,
                isActive: true
             },
            select: { tb_roles: { select: { name: true } } }
        });

        if (!targetUser) {
            const error = new Error("Target user not found");
            error.statusCode = 404;
            throw error;
        }

        const targetRole = targetUser.tb_roles.name;

        const result = await adjustModifyAmount(
            nik,
            adjustment_value,
            notes,
            actor,
            targetRole,
            leave_type
        );

        res.status(200).json({ message: 'Balance adjusted successfully', data: result });
    } catch (error) {
        next(error);
    }
};