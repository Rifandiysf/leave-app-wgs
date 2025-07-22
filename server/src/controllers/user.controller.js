import { success } from "zod/v4";
import { createLeave, getLeavesByFilterService, getLeavesById, getAllUsers, updateUserByNIK, deleteUserByNIK, getUserByNIK, getLeavesByNIK, adjustModifyAmount } from "../services/user.service.js"
import { decodeToken } from "../utils/jwt.js";
import { responsePagination } from "../utils/responsePagination.utils.js";


export const createLeaveRequest = async (req, res) => {
    try {
        const user = await decodeToken(req.get('authorization').split(' ')[1])

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
        res.status(400).json({
            message: error.message,
        })
    }
}

export const getLeaveRequests = async (req, res) => {
    try {
        const user = await decodeToken(req.get('authorization').split(' ')[1])
        const leaves = await getLeavesByNIK(user.NIK)

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        res.status(201).json({
            message: "Leave requests retrieved successfully",
            data: leaves,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }

}

export const getLeavesByFilter = async (req, res) => {
    try {
        const { value, type, status } = req.query;
        const user = await decodeToken(req.get('authorization').split(' ')[1]);

        const leaves = await getLeavesByFilterService(user.NIK, type, status, value);

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        const result =  responsePagination('Filtered leave data retrieved successfully', leaves)
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getLeaveRequestsById = async (req, res) => {
    try {

        const { id } = req.params
        const user = await decodeToken(req.get('authorization').split(' ')[1])

        const leaves = await getLeavesById(user.NIK, id)

        res.status(201).json({
            message: 'Successfully retrieved leave data by ID',
            data: leaves
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || ''

        const dataUsers = await getAllUsers(page, limit, search);

        res.status(200).json({
            message: "Successfully retrieved leave data",
            pagination: {
                current_page: dataUsers.page,
                last_visible_page: dataUsers.totalPages,
                has_next_page: dataUsers.page < dataUsers.totalPages,
                item: {
                    count: dataUsers.data.length,
                    total: dataUsers.total,
                    per_page: limit
                }
            },
            data: dataUsers.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve user data and leave quota.' });
    }
};

export const getUser = async (req, res, next) => {
    try {
        const decode = await decodeToken(req.get("authorization").split(' ')[1]);
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

export const updateUser = async (req, res) => {
    const { nik } = req.params
    try {
        const updatedUser = await updateUserByNIK(nik)

        res.status(201).json({
            status: "success",
            message: "successfully update user data",
            data: updatedUser
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "failed to update user data",
            reason: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    const { nik } = req.params
    try {
        const deletedUser = await deleteUserByNIK(nik);

        res.status(200).json({
            status: "success",
            message: "successfully deleted user data",
            data: deletedUser
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "failed to delete user data",
            reason: error.message
        });
    }
}

export const modifyAmount = async (req, res) => {
    const { nik } = req.params
    const {adjustment_value, notes} = req.body

    const actor = req.session.user.role
    if (!actor) {
        return res.status(401).json({ message: 'Unauthorized: actor (role) not found in session' });
    }

    try {
        const result = await adjustModifyAmount(nik, adjustment_value, notes, actor)
        res.status(200).json({message: 'Balance adjusted successfully', data: result})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}