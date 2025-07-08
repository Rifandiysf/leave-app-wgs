import { createLeave } from "../services/leave.service.js";

export const createLeaveRequest = async (req, res) => {
    try {

        const user = req.session.user;

        const leave = await createLeave({
            ...req.body,
            NIK : user.NIK
        })

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}