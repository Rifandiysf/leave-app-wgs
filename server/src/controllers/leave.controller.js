import { decode } from "jsonwebtoken";
import {
  getAllLeavesService,
  updateLeave,
  getLeavesByFilterService,
  getHistoryLeave,
  getHistoryLeaveSearch,
  getSpecialLeaveService,
  createSpecialLeaveService,
  updateSpecialLeaveService,
  createMandatoryLeaveService,
  getAllMandatoryLeavesService,
  updateMandatoryLeaveService,
  getSearchSpecialLeaveService,
  getSearchMandatoryLeaveService,
} from "../services/leave.service.js"
import { verifyToken } from "../utils/jwt.js";


export const updateLeaveById = async (req, res) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const decodeToken = await verifyToken(req);
  const { NIK } = decodeToken;

  try {
    const updatedLeave = await updateLeave(id, status, reason, NIK);

    if (!updatedLeave) {
      throw new Error("leave not found");
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Successfully updated leave data',
      data: {
        updated_leave: updatedLeave
      }
    })
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: 'failed updated leave data'
    })
  }
}

export const getAllLeaves = async (req, res) => {
  try {

    const leaves = await getAllLeavesService()

    res.status(201).json({
      message: "All leave requests retrieved successfully",
      data: leaves
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const getLeavesByFilter = async (req, res) => {
  try {
    const { value, type } = req.query;

    const leaves = await getLeavesByFilterService(type, value);

    res.status(200).json({
      message: 'Filtered leave data retrieved successfully',
      data: leaves
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

export const historyLeave = async (req, res) => {
  try {
    const result = await getHistoryLeave()
    res.status(200).json({ succes: true, data: result })
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({ succes: false, message: 'Server Error' })
  }
}

export const historyLeaveSearch = async (req, res) => {
  try {
    const { value, type, status } = req.query

    const result = await getHistoryLeaveSearch({
      value: value || '',
      type: type || '',
      status: status || ''
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getSpecialLeave = async (req, res) => {
  try {

    const specialLeaves = await getSpecialLeaveService()

    res.status(201).json({
      message: "All special leave was successfully taken",
      data: specialLeaves
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const getSearchSpecialLeave = async (req, res) => {
  try {

    const { value } = req.query

    const specialleave = await getSearchSpecialLeaveService(value)

    res.status(201).json({
      message: 'Search special leave data retrieved successfully',
      data: specialleave
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const createSpecialLeave = async (req, res) => {
  const data = req.body
  try {

    const specialLeaves = await createSpecialLeaveService(data)

    res.status(201).json({
      message: "Special leave created successfully",
      data: specialLeaves,
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const updateSpecialLeave = async (req, res) => {
  try {

    const { id } = req.params
    const data = req.body

    const specialLeaves = await updateSpecialLeaveService(id, data)

    res.status(201).json({
      message: "Special leave updated successfully",
      data: specialLeaves
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const createMandatoryLeave = async (req, res) => {
  const data = req.body
  try {
    const mandatoryLeaves = await createMandatoryLeaveService(data);
    res.status(201).json({
      message: "Mandatory leave created successfully",
      data: mandatoryLeaves
    });
  } catch (error) {
    res.status.json({
      message: error.message
    })
  }
};

export const getMandatoryLeaves = async (req, res) => {
  try {
    const mandatoryLeave = await getAllMandatoryLeavesService();
    res.status(200).json({
      message: "All mandatory leave was successfully taken",
      data: mandatoryLeave
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

export const getSearchMandatoryLeave = async (req, res) => {
  try {

    const { value } = req.query

    const specialleave = await getSearchMandatoryLeaveService(value)

    res.status(201).json({
      message: 'Search special leave data retrieved successfully',
      data: specialleave
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const updateMandatoryLeave = async (req, res) => {
  try {

    const { id } = req.params
    const data = req.body

    const mandatoryLeave = await updateMandatoryLeaveService(id, data)

    res.status(201).json({
      message: "Mandatory leave updated successfully",
      data: mandatoryLeave
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

