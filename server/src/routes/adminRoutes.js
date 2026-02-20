import express from 'express';
import { getAdminStats, getAllUsers, getUserDetails, updateUserStatus, deleteUser } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here are admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails); // New route for details
router.put('/users/:id/status', updateUserStatus); // Updates block status, verification, role
router.delete('/users/:id', deleteUser); // New Soft Delete Route

export default router;
