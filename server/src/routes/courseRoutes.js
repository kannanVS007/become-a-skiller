import express from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);

// Authenticated routes
router.post('/', protect, authorize('trainer', 'admin'), createCourse);
router.put('/:id', protect, authorize('trainer', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('trainer', 'admin'), deleteCourse);

export default router;
