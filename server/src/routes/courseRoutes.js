import express from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, getCourseEnrollmentStatus } from '../controllers/courseController.js';
import { getCertificate } from '../controllers/certificateController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/:id/certificate', protect, getCertificate);
router.get('/:id/enrollment', protect, getCourseEnrollmentStatus);

// Authenticated routes
router.post('/', protect, authorize('trainer', 'admin'), createCourse);
router.put('/:id', protect, authorize('trainer', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('trainer', 'admin'), deleteCourse);

export default router;
