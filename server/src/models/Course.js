import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videoUrl: String,
    pdfUrl: String,
    duration: Number, // in minutes
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
    trainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    modules: [moduleSchema],
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
