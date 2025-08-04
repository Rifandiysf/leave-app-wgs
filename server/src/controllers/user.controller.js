import { success } from "zod/v4";
import { createLeave, getLeavesByFilterService, getLeavesById, getAllUsers, updateUserByNIK, deleteUserByNIK, getUserByNIK, getLeavesByNIK, adjustModifyAmount } from "../services/user.service.js"
import prisma from '../utils/client.js'
import { decodeToken } from "../utils/jwt.js";
import { responsePagination } from "../utils/responsePagination.utils.js";


export const createLeaveRequest = async (req, res, next) => {
    try {
        const user = await decodeToken(req.cookies["Authorization"])

        console.log("Request body:", req.body);
        console.log("id_special di body:", req.body.id_special);

        const leave = await createLeave({
            ...req.body,
            NIK: user.NIK,
            total_days: req.workingDays
        })

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave,
        })
    } catch (error) {
        next(error)
    }
}

export const getLeaveRequests = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const user = await decodeToken( req.cookies["Authorization"])
        const leaves = await getLeavesByNIK(user.NIK, page, limit)

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        const pagination = responsePagination("Leave requests retrieved successfully", leaves, limit)

        res.status(201).json(pagination)
    } catch (error) {
        next(error)
    }
}

export const getLeavesByFilter = async (req, res, next) => {
    try {
        const { value, type, status, page = 1, limit = 10 } = req.query;

        const user = await decodeToken(req.cookies["Authorization"]);

        const leaves = await getLeavesByFilterService(user.NIK, type, status, value, page, limit);

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        const result = responsePagination('Filtered leave data retrieved successfully', leaves, limit)
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};


export const getLeaveRequestsById = async (req, res) => {
    try {

        const { id } = req.params
        const user = await decodeToken(req.cookies["Authorization"])

        const leaves = await getLeavesById(user.NIK, id)

        res.status(201).json({
            message: 'Successfully retrieved leave data by ID',
            data: leaves
        })

    } catch (error) {
        next(error)
    }
}

export const allUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || ''
        const gender = req.query.gender || ''
        const status = req.query.status || ''
        const role = req.query.role || ''

        const dataUsers = await getAllUsers(page, limit, search, gender, status, role);

        const response = responsePagination("Successfully retrieved user data", dataUsers, limit);
        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
};

export const getUser = async (req, res, next) => {
    try {
        const decode = await decodeToken(req.cookies["Authorization"]);
        const { role, NIK } = decode;
        const { nik } = req.params;
        const isAdmin = ["admin", "super_admin"].includes(role);

        if (!isAdmin) {
            if (NIK !== nik) {
                const err = new Error("User requested has no permission");
                err.statusCode = 401;
                throw err;
            }
        }

        const user = await getUserByNIK(nik);

        res.status(200).json({
            success: true,
            message: `Data retrieve successfully`,
            requested_by: {
                role: role,
                nik: NIK
            },
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const getUserMe = async (req, res, next) => {
    try {
        const decode = await decodeToken(req.cookies["Authorization"]);
        const { NIK } = decode;

        const user = await getUserByNIK(NIK);

        res.status(200).json({
            success: true,
            message: `Data retrieve successfully`,
            user_data: user
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { nik } = req.params
    try {
        const updatedUser = await updateUserByNIK(nik)

        res.status(201).json({
            status: "success",
            message: "successfully update user data",
            data: updatedUser
        })
    } catch (error) {
        error.cause = error.message;
        error.message = "failed to update user data";
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    const { nik } = req.params
    try {
        const deletedUser = await deleteUserByNIK(nik);

        res.status(200).json({
            status: "success",
            message: "successfully deleted user data",
            data: deletedUser
        })
    } catch (error) {
        error.cause = error.message;
        error.message = "failed to delete user data";
        next(error)
    }
}


export const modifyAmount = async (req, res, next) => {
    try {
        const { nik } = req.params;
        const { adjustment_value, notes, leave_type } = req.body;
        const token =  req.cookies["Authorization"];

        const decodedToken = await decodeToken(token);
        const actor = {
            nik: decodedToken.NIK,
            role: decodedToken.role
        };

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

        const targetUser = await prisma.tb_users.findUnique({
            where: { NIK: nik,
                status_active: 'active'
             },
            select: { role: true }
        });

        if (!targetUser) {
            const error = new Error("Target user not found");
            error.statusCode = 404;
            throw error;
        }

        const targetRole = targetUser.role;

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