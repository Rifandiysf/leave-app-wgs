import prisma from "../../utils/client.js";
import { calculateHolidaysDays, createDateFromString } from '../../utils/leaves.utils.js';
import { updateLeave } from "../leave/updateLeave.service.js";

export const createLeave = async (data) => {
    let {
        title,
        leave_type,
        start_date,
        reason,
        NIK,
        status,
        fullname
    } = data;
    console.log(`fullname : ${fullname}`)

    console.log("TESTTT", new Date())

    console.log("Data di createLeave (full object):", JSON.stringify(data, null, 2));
    console.log("STATUS di createLeave:", status);
    console.log("Type of status:", typeof status);

    let end_date = data.end_date;
    let total_days = data.total_days;
    let id_special = null;

    if (leave_type === "special_leave") {
        id_special = data.id_special;
        if (!id_special) {
            throw new Error("id_special is required for special leave");
        }

        const specialLeave = await prisma.tb_special_leave.findUnique({
            where: { id_special }
        });

        if (!specialLeave) {
            throw new Error("Invalid id_special provided");
        }

        const duration = specialLeave.duration;
        const startDate = createDateFromString(start_date);

        if (specialLeave.type === 'month') {
            let tempDate = new Date(startDate);
            tempDate.setUTCMonth(tempDate.getUTCMonth() + duration);
            end_date = tempDate;

            total_days = calculateHolidaysDays(
                createDateFromString(start_date),
                createDateFromString(end_date)
            );

        } else {
            let count = 0;
            let tempDate = new Date(startDate);
            while (count < duration - 1) {
                tempDate.setUTCDate(tempDate.getUTCDate() + 1);
                const day = tempDate.getUTCDay();
                // if (day !== 0 && day !== 6) {
                count++;
                // }
            }
            end_date = tempDate;
            total_days = duration;
        }

        title = specialLeave.title;
        reason = specialLeave.title;
    }

    if (leave_type === 'mandatory_leave') {
        const { id_mandatory } = data;

        if (!status) {
            throw new Error("Status is required for mandatory leave and cannot be undefined.");
        }

        const mandatoryLeave = await prisma.tb_mandatory_leave.findUnique({
            where: { id_mandatory }
        });

        if (!mandatoryLeave) {
            throw new Error("Invalid id_mandatory provided");
        }

        let finalReason;
        if (status === "approved") {
            finalReason = "-";
        } else if (status === "rejected") {
            if (!reason || reason.trim() === "") {
                throw new Error("Reason is required when status is rejected");
            }
            finalReason = reason;
        } else {
            finalReason = data.reason || "mandatory leave created";
        }

        const getDatesInRange = (start, end) => {
            let arr = [];
            let dt = new Date(start);
            while (dt <= end) {
                const day = dt.getDay();
                if (day !== 0 && day !== 6) {
                    arr.push(new Date(dt));
                }
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        };

        const startDate = createDateFromString(mandatoryLeave.start_date);
        const endDate = createDateFromString(mandatoryLeave.end_date);
        let newMandatoryDates = getDatesInRange(startDate, endDate);

        const existingMandatory = await prisma.tb_leave.findMany({
            where: {
                NIK,
                leave_type: "mandatory_leave",
                status: "approved"
            },
            select: { start_date: true, end_date: true }
        });

        let existingMandatoryDates = [];
        for (let m of existingMandatory) {
            existingMandatoryDates.push(...getDatesInRange(m.start_date, m.end_date));
        }

        const existingPersonal = await prisma.tb_leave.findMany({
            where: {
                NIK,
                leave_type: "personal_leave",
                status: "approved"
            },
            select: { start_date: true, end_date: true }
        });

        let existingPersonalDates = [];
        for (let p of existingPersonal) {
            existingPersonalDates.push(...getDatesInRange(p.start_date, p.end_date));
        }

        const uniqueDates = newMandatoryDates.filter(date => {
            const dateStr = date.toISOString().split("T")[0];
            const inMandatory = existingMandatoryDates.some(d => d.toISOString().split("T")[0] === dateStr);
            const inPersonal = existingPersonalDates.some(d => d.toISOString().split("T")[0] === dateStr);
            return !inMandatory && !inPersonal;
        });

        const total_days = uniqueDates.length;

        const leaveYear = startDate.getFullYear();
        const startOfYear = new Date(leaveYear, 0, 1);
        const endOfYear = new Date(leaveYear, 11, 31, 23, 59, 59, 999);

        const existingLeave = await prisma.tb_leave.findFirst({
            where: {
                id_mandatory,
                NIK,
                start_date: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            },
        });

        if (existingLeave) {
            const mandatory = await updateLeave(
                existingLeave.id_leave,
                status,
                finalReason,
                NIK,
                fullname
            );

            console.log("Data mandatory")
            console.log(mandatory)
            return mandatory
        }

        const createdLeave = await prisma.tb_leave.create({
            data: {
                title: mandatoryLeave.title,
                leave_type: 'mandatory_leave',
                start_date: startDate,
                end_date: endDate,
                reason: finalReason,
                NIK,
                total_days,
                id_mandatory,
                created_at: new Date(),
                status: 'pending'
            }
        });


        if (status !== 'pending') {
            try {
                const updatedLeave = await updateLeave(
                    createdLeave.id_leave,
                    status,
                    finalReason,
                    NIK,
                    fullname
                );
                return updatedLeave;
            } catch (error) {
                await prisma.tb_leave.delete({
                    where: { id_leave: createdLeave.id_leave }
                });
                throw error;
            }
        }

        return createdLeave;
    }

    if (!total_days) {
        total_days = calculateHolidaysDays(
            createDateFromString(start_date),
            createDateFromString(end_date)
        );
    }

    const leaveData = {
        title,
        leave_type,
        start_date: createDateFromString(start_date),
        end_date: createDateFromString(end_date || start_date),
        reason,
        NIK,
        total_days,
        id_special
    };

    const leave2 = await prisma.tb_leave.create({
        data: leaveData,
    });

    return leave2
};