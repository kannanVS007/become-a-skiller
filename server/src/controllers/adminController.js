import User from '../models/User.js';
import { Payment, Enrollment } from '../models/Transaction.js';
import Course from '../models/Course.js';
import { Job } from '../models/JobPortal.js';

// @desc    Get Admin Stats/Analytics
// @route   GET /api/v1/admin/stats
// @access  Private (Admin)
export const getAdminStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalJobs = await Job.countDocuments();

        const revenueData = await Payment.aggregate([
            { $match: { status: 'captured' } },
            { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ]);

        const recentPayments = await Payment.find({ status: 'captured' })
            .sort('-createdAt')
            .limit(10)
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalCourses,
                totalJobs,
                totalRevenue: revenueData[0] ? revenueData[0].totalRevenue : 0,
                recentPayments
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user status (block/unblock)
// @route   PUT /api/v1/admin/users/:id/status
// @access  Private (Admin)
export const updateUserStatus = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            // assuming an 'isActive' field could be added to User model
            isActive: req.body.isActive
        }, { new: true });

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
