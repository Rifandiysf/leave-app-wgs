import {
  getAllLeavesService,
  updateLeave,
  getLeavesByFilterService,
  getHistoryLeave,
  getHistoryLeaveSearch,
  getSpecialLeaveService
} from "../services/leave.service.js"


export const updateLeaveById = async (req, res) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const { NIK } = req.session.user

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
      status : 'failed',
      message: 'failed updated leave data'
    })
}}

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
    res.status(200).json({succes: true, data: result})
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({succes: false, message: 'Server Error'})
  }
}

export const historyLeaveSearch = async (req, res) => {
  try {
    const {value, type, status} = req.query

    const result = await getHistoryLeaveSearch({
      value: value || '',
      type: type || '',
      status: status || ''
    })
    
    res.status(200).json({success: true, data: result})
  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({success: false, message: error.message})
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
