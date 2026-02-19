import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    salaryRange: String,
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    trainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    applicantsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required: true
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);

export { Job, Application };
