import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['login', 'logout', 'lesson_view', 'quiz_attempt', 'course_enroll', 'certificate_download'],
        required: true
    },
    metadata: {
        type: Object, // Flexible field for details like ip, device, lessonId, score etc.
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
export default UserActivity;
