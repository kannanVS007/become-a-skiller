import express from 'express';
import { Enrollment, Payment } from '../models/Transaction.js';
import { Application } from '../models/JobPortal.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

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

// @desc    Update current user's profile info
// @route   PATCH /api/v1/users/profile
router.patch('/profile', async (req, res, next) => {
    try {
        const { mobile } = req.body;

        if (mobile && !/^[0-9]{10}$/.test(mobile.toString().trim())) {
            return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
        }

        const updates = {};
        if (mobile) updates.mobile = mobile.toString().trim();

        // Update user
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile
            }
        });
    } catch (err) {
        next(err);
    }
});

export default router;
