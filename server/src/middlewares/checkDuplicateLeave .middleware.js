import prisma from "../utils/client.js";
import { decodeToken } from "../utils/jwt.js";

const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const checkDuplicateLeave = async (req, res, next) => {
    try {
        const token = req.cookies["Authorization"];
        const user = await decodeToken(token);
        const { start_date, end_date, leave_type } = req.body;

        if (leave_type !== "personal_leave") {
            return next();
        }

        if (!isValidDate(start_date) || (end_date && !isValidDate(end_date))) {
            const error = new Error("Invalid date format. Please use YYYY-MM-DD");
            error.statusCode = 400;
            return next(error);
        }

        const start = new Date(start_date);
        const end = end_date ? new Date(end_date) : start;

        const existing = await prisma.tb_leave.findFirst({
            where: {
                NIK: user.NIK,
                OR: [
                    {
                        start_date: { lte: end },
                        end_date: { gte: start },
                    },
                ],
                status: {
                    in: ["approved", "pending", "expired"]
                },
            },
        });

        if (existing) {
            const error = new Error("You already have a leave request during this period.");
            error.statusCode = 400;
            return next(error);
        }

        next();
    } catch (err) {
        next(err);
    }
};
