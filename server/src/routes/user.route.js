import express from 'express';

import { 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    createLeaveRequest,
    getLeaveRequests,
    getLeavesByFilter,
    getLeaveRequestsById,
    filterUsers 
} from '../controllers/user.controller.js';

import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';

const router = express.Router();

router.post('/leave', isAuthenticated, createLeaveRequest);
router.get('/leave/requests', isAuthenticated, getLeaveRequests);
router.get('/leave/filter', isAuthenticated, getLeavesByFilter);
router.get('/leave/:id', isAuthenticated, getLeaveRequestsById);

router.get('/', isAuthenticated, allUsers);
router.get('/filter', isAuthenticated, filterUsers); 
router.get('/:nik', isAuthenticated, getUser);       
router.put('/:nik', isAuthenticated, updateUser);
router.delete('/:nik', isAuthenticated, deleteUser);

export default router;