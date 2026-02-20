
import Course from '../models/Course.js';
import { Enrollment } from '../models/Transaction.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
export const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate('trainer', 'name email');
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
export const getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate('trainer', 'name email');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private (Trainer, Admin)
export const createCourse = async (req, res, next) => {
    try {
        req.body.trainer = req.user.id;
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private (Trainer, Admin)
export const updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Make sure user is course owner or admin
        if (course.trainer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this course' });
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: course });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private (Trainer, Admin)
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Make sure user is course owner or admin
        if (course.trainer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this course' });
        }

        await course.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// @desc    Get current user's enrollment status for a course
// @route   GET /api/v1/courses/:id/enrollment
// @access  Private
export const getCourseEnrollmentStatus = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findOne({
            user: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(200).json({
                success: true,
                data: null,
                message: 'Not enrolled'
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (err) {
        next(err);
    }
};

