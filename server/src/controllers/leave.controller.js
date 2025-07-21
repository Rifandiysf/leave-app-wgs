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
import { responsePagination } from "../utils/responsePagination.utils.js";
import { decodeToken } from "../utils/jwt.js";

export const updateLeaveById = async (req, res) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const decodedToken = await decodeToken(req.get('authorization').split(' ')[1]);
  const { NIK } = decodedToken;

  try {
    const updatedLeave = await updateLeave(id, status, reason, NIK);

    if (!updatedLeave) {
      const error = new Error("leave not found");
      error.statusCode = 404;
      error.cause = "leave not found in database"
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully updated leave data',
      data: {
        updated_leave: updatedLeave
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getAllLeaves = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const leaves = await getAllLeavesService(page, limit)

    res.status(200).json({
      message: "Leave data retrieved successfully",
      pagination: {
        current_page: leaves.page,
        last_visible_page: leaves.totalPages,
        has_next_page: leaves.page < leaves.totalPages,
        item: {
          count: leaves.data.length,
          total: leaves.total,
          per_page: limit
        }
      },
      data: leaves.data,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const getLeavesByFilter = async (req, res) => {
  try {
    const { value, type, page = 1, limit = 10 } = req.query;

    const leaves = await getLeavesByFilterService(type, value, parseInt(page), parseInt(limit));

    res.status(200).json({
      message: "Filtered leave data retrieved successfully",
      pagination: {
        current_page: leaves.page,
        last_visible_page: leaves.totalPages,
        has_next_page: leaves.page < leaves.totalPages,
        item: {
          count: leaves.data.length,
          total: leaves.total,
          per_page: limit
        }
      },
      data: leaves.data,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

export const historyLeave = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const result = await getHistoryLeave(page, limit)
    res.status(200).json({
      success: true,
      pagination: {
        current_page: result.page,
        last_visible_page: result.totalPages,
        has_next_page: result.page < result.totalPages,
        item: {
          count: result.data.length,
          total: result.total,
          per_page: limit
        }
      },
      data: result.data,
    })

  } catch (error) {
    console.error('Error fetching leave history:', error)
    res.status(500).json({ succes: false, message: 'Server Error' })
  }
}

export const historyLeaveSearch = async (req, res) => {
  try {
    const { value = '', type = '', status = '', page = 1, limit = 10 } = req.query;

    const result = await getHistoryLeaveSearch({
      value,
      type,
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      pagination: {
        current_page: result.page,
        last_visible_page: result.totalPages,
        has_next_page: result.page < result.totalPages,
        item: {
          count: result.data.length,
          total: result.total,
          per_page: parseInt(limit)
        }
      },
      data: result.data,
    });
  } catch (error) {
    console.error('Error fetching leave history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSpecialLeave = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getSpecialLeaveService(page, limit);

    res.status(200).json({
      message: "All special leave was successfully taken",
      pagination: {
        current_page: result.page,
        last_visible_page: result.totalPages,
        has_next_page: result.page < result.totalPages,
        item: {
          count: result.data.length,
          total: result.total,
          per_page: limit
        }
      },
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getSearchSpecialLeave = async (req, res) => {
  try {
    const { value = '', page = 1, limit = 10 } = req.query;

    const result = await getSearchSpecialLeaveService(value, parseInt(page), parseInt(limit));

    res.status(200).json({
      message: 'Search special leave data retrieved successfully',
      pagination: {
        current_page: result.page,
        last_visible_page: result.totalPages,
        has_next_page: result.page < result.totalPages,
        item: {
          count: result.data.length,
          total: result.total,
          per_page: parseInt(limit)
        }
      },
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

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

    res.status(200).json({
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllMandatoryLeavesService(page, limit);

    res.status(200).json({
      message: "All mandatory leave was successfully taken",
      pagination: {
        current_page: result.page,
        last_visible_page: result.totalPages,
        has_next_page: result.page < result.totalPages,
        item: {
          count: result.data.length,
          total: result.total,
          per_page: limit
        }
      },
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSearchMandatoryLeave = async (req, res, next) => {
  try {
    const { value = '', page = 1, limit = 10 } = req.query;

    const result = await getSearchMandatoryLeaveService(value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Search mandatory leave data retrived succesfully", result, limit);

    res.status(200).json({
      paginationResponse
    });
  } catch (error) {
    next(error);
  }
};

export const updateMandatoryLeave = async (req, res) => {
  try {

    const { id } = req.params
    const data = req.body

    const mandatoryLeave = await updateMandatoryLeaveService(id, data)

    res.status(200).json({
      message: "Mandatory leave updated successfully",
      data: mandatoryLeave
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
};

