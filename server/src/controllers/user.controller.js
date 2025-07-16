import { createLeave, getLeavesByFilterService, getLeavesById, getAllUsers, updateUserByNIK, deleteUserByNIK, getUserByNIK, getLeavesByNIK } from "../services/user.service.js"
import { verifyToken } from "../utils/jwt.js";


export const createLeaveRequest = async (req, res) => {
    try {
        const user = req.session.user

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
        const user = req.session.user

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
        const user = req.session.user;

        const leaves = await getLeavesByFilterService(user.NIK, type, status, value);

        if (!leaves || leaves.length === 0) {
            res.status(201).json({
                message: "The data doesn't exist",
                data: leaves,
            })
        }

        res.status(200).json({
            message: 'Filtered leave data retrieved successfully',
            data: leaves
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


export const getLeaveRequestsById = async (req, res) => {
    try {

        const { id } = req.params
        const user = req.session.user

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
        const dataUsers = await getAllUsers()
        res.status(200).json(dataUsers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to retrieve user data and leave quota.' })
    }
}

export const getUser = async (req, res) => {
    const { nik } = req.params;
    const decode = await verifyToken(req.get("authorization").split(' ')[1]);
    const { role, NIK } = decode;
    const isAdmin = ["admin", "super_admin"].includes(role);
    try {
        console.log(role, NIK); 
        if (!isAdmin) {
            if (NIK !== nik) {
                const err = new Error("User requested has no permission");
                err.statusCode = 400;
                throw err;
            }
        }

        const user = await getUserByNIK(nik);

        res.status(200).json({
            status: "successful",
            message: `Data retrieve successfully`,
            requested_by: {
                role: role,
                nik: NIK
            },
            data: user
        });
    } catch (error) {
        res.status(error.statusCode).json({
            status: "failed",
            message: error.message,
        })
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