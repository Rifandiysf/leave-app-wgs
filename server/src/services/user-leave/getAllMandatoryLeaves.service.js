import prisma from "../../utils/client.js";
import { createDateFromString, formatDateIndonesia } from '../../utils/leaves.utils.js';
import { decodeToken } from "../../utils/jwt.js";
import { leave_type } from "../../../generated/prisma/index.js";

export const getAllMandatoryLeavesService = async (page = 1, limit = 10, req) => {
    const skip = (page - 1) * limit;

    const decoded = await decodeToken(req.cookies["Authorization"]);
    const userNIK = decoded.NIK;

    const [rawData, total] = await Promise.all([
        prisma.tb_mandatory_leave.findMany({
            skip,
            take: limit,
            orderBy: { start_date: 'asc' },
            where: { is_active: true }
        }),
        prisma.tb_mandatory_leave.count({
            where: { is_active: true }
        })
    ]);

    const userLeaves = await prisma.tb_leave.findMany({
        where: {
            NIK: userNIK,
            leave_type: leave_type.mandatory_leave
        },
        select: {
            id_mandatory: true,
            status: true
        }
    });

    const leaveMap = {};
    for (const leave of userLeaves) {
        leaveMap[leave.id_mandatory] = leave.status;
    }

    const data = rawData.map(item => {
        const startDate = createDateFromString(item.start_date);

        const confirmBefore = new Date(startDate);
        confirmBefore.setDate(confirmBefore.getDate() - 6);

        const tanggalFormatted = formatDateIndonesia(confirmBefore);
        const message = `konfimasi cuti sebelum tanggal ${tanggalFormatted}`;

        const status = leaveMap[item.id_mandatory];
        let taken = true;

        if (status === 'approved') {
            taken = true;
        } else if (status === 'rejected') {
            taken = false;
        }

        return { ...item, message, taken };
    });

    const totalPages = Math.ceil(total / limit);
    return {
        data: {
            employees: data,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                total: total,
                limit: limit
            }
        }
    };
};