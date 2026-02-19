import express from 'express';
import { getAdminStats, getAllUsers, updateUserStatus } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here are admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);

export default router;
