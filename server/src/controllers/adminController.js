import User from '../models/User.js';
import { Payment, Enrollment } from '../models/Transaction.js';
import Course from '../models/Course.js';
import { Job } from '../models/JobPortal.js';
import UserActivity from '../models/UserActivity.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get Admin Stats/Analytics
// @route   GET /api/v1/admin/stats
export const getAdminStats = asyncHandler(async (req, res, next) => {
    // 1. User Stats
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const activeUsers = await User.countDocuments({ isBlocked: false, isDeleted: false });
    const students = await User.countDocuments({ role: 'student', isDeleted: false });
    const trainers = await User.countDocuments({ role: 'trainer', isDeleted: false });

    // 2. Content Stats
    const totalCourses = await Course.countDocuments();
    const totalJobs = await Job.countDocuments();

    // 3. Financial Stats
    const revenueData = await Payment.aggregate([
        { $match: { status: 'captured' } },
        { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueData[0] ? revenueData[0].totalRevenue : 0;

    // 4. Learning Stats (Mock for now, or aggregate from UserActivity)
    const learningActivity = await UserActivity.aggregate([
        { $match: { type: 'lesson_view' } },
        { $count: "totalViews" }
    ]);
    const totalLearningHours = learningActivity[0] ? Math.round(learningActivity[0].totalViews * 0.25) : 0; // Approx 15 mins per view

    // 5. Recent Data
    const recentPayments = await Payment.find({ status: 'captured' })
        .sort('-createdAt')
        .limit(5)
        .populate('user', 'name email');

    res.status(200).json({
        success: true,
        data: {
            users: { total: totalUsers, active: activeUsers, students, trainers },
            content: { courses: totalCourses, jobs: totalJobs },
            financial: { revenue: totalRevenue, currency: 'INR' },
            learning: { totalHours: totalLearningHours },
            recentPayments
        }
    });
});

// @desc    Get all users with filtering/pagination
// @route   GET /api/v1/admin/users
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const { role, status, search, page = 1, limit = 10 } = req.query;

    const query = { isDeleted: false }; // Exclude deleted users

    // Filter by Role
    if (role && role !== 'all') {
        query.role = role;
    }

    // Filter by Status (Active/Blocked)
    if (status) {
        if (status === 'blocked') query.isBlocked = true;
        if (status === 'active') query.isBlocked = false;
    }

    // Search by Name or Email
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query)
        .select('-password')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
        success: true,
        count: users.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        data: users
    });
});

// @desc    Get Single User Details
// @route   GET /api/v1/admin/users/:id
export const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).select('-password');
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    // Fetch related data
    const enrollments = await Enrollment.find({ user: user._id }).populate('course', 'title thumbnail');
    const activities = await UserActivity.find({ user: user._id }).sort('-timestamp').limit(10);

    res.status(200).json({
        success: true,
        data: {
            user,
            enrollments,
            recentActivity: activities
        }
    });
});

// @desc    Update user status (block/unblock/verify)
// @route   PUT /api/v1/admin/users/:id/status
export const updateUserStatus = asyncHandler(async (req, res, next) => {
    const { isBlocked, isEmailVerified, role } = req.body;

    const user = await User.findOne({ _id: req.params.id, isDeleted: false });
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    if (typeof isBlocked !== 'undefined') user.isBlocked = isBlocked;
    if (typeof isEmailVerified !== 'undefined') user.isEmailVerified = isEmailVerified;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
        success: true,
        data: user,
        message: `User ${user.email} updated successfully`
    });
});

// @desc    Soft Delete User
// @route   DELETE /api/v1/admin/users/:id
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    // Prevent deleting other admins (or self)
    if (user.role === 'admin' && user._id.toString() !== req.user.id) {
        // Optional: Decide if super admin can delete other admins. 
        // For now, let's allow it but warn or restrict if needed.
        // req.user is the logged-in admin.
    }

    // Soft Delete
    user.isDeleted = true;
    user.isBlocked = true; // Also block them instantly
    user.deletedAt = Date.now();
    await user.save();

    // Optional: Log this action in an Audit Log (if we had one)

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: {}
    });
});
