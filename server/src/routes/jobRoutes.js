import express from 'express';
import { getJobs, createJob, applyForJob, getJobApplications } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);

// Authenticated routes
router.post('/', protect, authorize('trainer', 'admin'), createJob);
router.post('/:id/apply', protect, authorize('student'), applyForJob);
router.get('/:id/applications', protect, authorize('trainer', 'admin'), getJobApplications);

export default router;
