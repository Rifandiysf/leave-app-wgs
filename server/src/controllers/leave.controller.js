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
  getSpecialLeaveServiceAdmin,
} from "../services/leave.service.js"
import { responsePagination } from "../utils/responsePagination.utils.js";
import { decodeToken } from "../utils/jwt.js";

export const updateLeaveById = async (req, res, next) => {
  const { id } = req.params;
  const { reason, status } = req.body;
  const decodedToken = await decodeToken(req.cookies["Authorization"]);
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

export const getAllLeaves = async (req, res, next) => {
  try {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const leaves = await getAllLeavesService(page, limit)

    const paginationResponse = responsePagination("Leave data retrieved successfully", leaves, limit);

    res.status(200).json(paginationResponse);

  } catch (error) {
    next(error)
  }
}

export const getLeavesByFilter = async (req, res, next) => {
  try {
    const { value, type, page = 1, limit = 10 } = req.query;

    const leaves = await getLeavesByFilterService(type, value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Filtered leave data retrieved successfully", leaves, limit);

    res.status(200).json(paginationResponse);

  } catch (error) {
    next(error)
  }
}

export const historyLeave = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const result = await getHistoryLeave(page, limit)
    const paginationResponse = responsePagination("Leave history data retrieved successfully", result, limit);
    res.status(200).json(paginationResponse)

  } catch (error) {
    next(error)
  }
}

export const historyLeaveSearch = async (req, res, next) => {
  try {
    const { value = '', type = '', status = '' } = req.query;
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const result = await getHistoryLeaveSearch({
      value,
      type,
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    const paginationResponse = responsePagination("Filtered leave history data retrieved successfully", result, limit);
    res.status(200).json(paginationResponse)
  } catch (error) {
    next(error)
  }
};

export const getSpecialLeave = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const gender = req.user.gender === 'male' ? 'm' : 'f'

    const result = await getSpecialLeaveService(gender, page, limit);

    const paginationResponse = responsePagination("All special leave was successfully taken", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
  }
};

export const getSpecialLeaveAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getSpecialLeaveServiceAdmin(page, limit);

    const paginationResponse = responsePagination("All special leave was successfully taken", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
  }
};

export const getSearchSpecialLeave = async (req, res, next) => {
  try {
    const { value = '', page = 1, limit = 10 } = req.query;

    const result = await getSearchSpecialLeaveService(value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Search special leave data retrieved successfully", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
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

export const createMandatoryLeave = async (req, res, next) => {
  const data = req.body
  try {
    const mandatoryLeaves = await createMandatoryLeaveService(data);
    res.status(201).json({
      success: true,
      message: "Mandatory leave created successfully",
      data: mandatoryLeaves
    });
  } catch (error) {
    next(error)
  }
};

export const getMandatoryLeaves = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllMandatoryLeavesService(page, limit);

    const paginationResponse = responsePagination("All mandatory leave was successfully taken", result, limit);

    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error)
  }
};

export const getSearchMandatoryLeave = async (req, res, next) => {
  try {
    const { value = '', page = 1, limit = 10 } = req.query;

    const result = await getSearchMandatoryLeaveService(value, parseInt(page), parseInt(limit));

    const paginationResponse = responsePagination("Search mandatory leave data retrived succesfully", result, limit);

    res.status(200).json(paginationResponse);
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

