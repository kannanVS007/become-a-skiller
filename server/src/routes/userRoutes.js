import express from 'express';
import { Enrollment, Payment } from '../models/Transaction.js';
import { Application } from '../models/JobPortal.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// @desc    Get current user's enrolled courses
// @route   GET /api/v1/users/my-courses
router.get('/my-courses', async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
        res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
    } catch (err) {
        next(err);
    }
});

// @desc    Get current user's job applications
// @route   GET /api/v1/users/my-applications
router.get('/my-applications', async (req, res, next) => {
    try {
        const applications = await Application.find({ student: req.user.id }).populate('job');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        next(err);
    }
});

export default router;
