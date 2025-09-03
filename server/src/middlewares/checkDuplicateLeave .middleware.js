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

        const overlappingMandatory = await prisma.tb_mandatory_leave.findFirst({
            where: {
                is_active: true,
                start_date: { lte: end },
                end_date: { gte: start },
            },
        });

        if (overlappingMandatory) {
            const error = new Error(
                `Cannot apply for personal leave. There is a mandatory leave period from ${overlappingMandatory.start_date.toDateString().slice(4)} to ${overlappingMandatory.end_date.toDateString().slice(4)}.`
            );
            error.statusCode = 400;
            return next(error);
        }

        const existingLeaves = await prisma.tb_leave.findMany({
            where: {
                NIK: user.NIK,
                start_date: { lte: end },
                end_date: { gte: start },
            },
        });

        if (existingLeaves.length > 0) {
            const mandatoryLeave = existingLeaves.find(leave => leave.leave_type === 'mandatory_leave');
            if (mandatoryLeave) {
                const error = new Error(
                    `Cannot apply for personal leave. You have an overlapping mandatory leave from ${mandatoryLeave.start_date.toDateString().slice(4)} to ${mandatoryLeave.end_date.toDateString().slice(4)}.`
                );
                error.statusCode = 400;
                return next(error);
            }

            const otherLeave = existingLeaves.find(leave => leave.leave_type !== 'mandatory_leave' && ['pending', 'approved'].includes(leave.status));
            if (otherLeave) {
                const error = new Error(
                    `You already have a leave request from ${otherLeave.start_date.toDateString().slice(4)} to ${otherLeave.end_date.toDateString().slice(4)}.`
                );
                error.statusCode = 400;
                return next(error);
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};
