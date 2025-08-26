import { createLeave } from "../../services/user-leave/createLeave.service.js";
import { decodeToken } from "../../utils/jwt.js";

export const createLeaveRequest = async (req, res, next) => {
    try {
        const user = await decodeToken(req.cookies["Authorization"])

        console.log("Raw request body:", req.body);
        console.log("Request headers:", req.headers);
        console.log("Content-Type:", req.headers['content-type']);

        const leave = await createLeave({
            ...req.body,
            NIK: user.NIK,
            total_days: req.workingDays
        })

        // console.log("Data yang akan dikirim ke createLeave:", requestData);


        res.status(201).json({
            message: "Leave request created successfully",
            data: leave,
        })
    } catch (error) {
        next(error)
    }
}