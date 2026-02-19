import { Job, Application } from '../models/JobPortal.js';

// @desc    Get all approved jobs
// @route   GET /api/v1/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({ isApproved: true }).populate('trainer', 'name email');
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a job posting
// @route   POST /api/v1/jobs
// @access  Private (Trainer, Admin)
export const createJob = async (req, res, next) => {
    try {
        req.body.trainer = req.user.id;
        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
    } catch (err) {
        next(err);
    }
};

// @desc    Apply for a job
// @route   POST /api/v1/jobs/:id/apply
// @access  Private (Student)
export const applyForJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const application = await Application.create({
            job: req.params.id,
            student: req.user.id,
            resumeUrl: req.body.resumeUrl
        });

        // Increment applicants count
        job.applicantsCount += 1;
        await job.save();

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        next(err);
    }
};

// @desc    Get applications for a job (For the trainer who posted it)
// @route   GET /api/v1/jobs/:id/applications
// @access  Private (Trainer, Admin)
export const getJobApplications = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.trainer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to view applications for this job' });
        }

        const applications = await Application.find({ job: req.params.id }).populate('student', 'name email');
        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (err) {
        next(err);
    }
};
