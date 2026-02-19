import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    progress: {
        completedModules: [String], // Array of module IDs
        percentage: { type: Number, default: 0 }
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    }
}, {
    timestamps: true
});

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },
    subscriptionPlan: {
        type: String,
        enum: ['Startup', 'Pro', 'Advanced']
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
        type: String,
        enum: ['created', 'pending', 'captured', 'failed'],
        default: 'created'
    },
    invoiceUrl: String
}, {
    timestamps: true
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
const Payment = mongoose.model('Payment', paymentSchema);

export { Enrollment, Payment };
