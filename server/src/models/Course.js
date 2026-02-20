import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videoUrl: String,
    pdfUrl: String,
    duration: Number, // in minutes
    instructor: String // Specific instructor for this module (overrides course trainer)
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    learningOutcomes: [String], // Array of strings describing what you'll learn
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    thumbnail: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: Number,
        default: 0
    },
    subscriptionPrice: {
        type: Number,
        default: 0
    },
    trainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    modules: [{
        title: { type: String, required: true },
        duration: Number, // Module duration
        lessons: [{
            title: { type: String, required: true },
            videoUrl: String,
            content: String,
            duration: Number,
            isFree: { type: Boolean, default: false }
        }]
    }],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    enrollmentCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
