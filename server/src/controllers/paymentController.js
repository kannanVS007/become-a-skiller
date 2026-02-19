import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment, Enrollment } from '../models/Transaction.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { generateInvoice } from '../services/invoiceService.js';
import sendEmail from '../services/emailService.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay Order
// @route   POST /api/v1/payments/order
// @access  Private
export const createOrder = async (req, res, next) => {
    try {
        const { courseId, amount, planName } = req.body;

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        // Store payment record as 'created'
        await Payment.create({
            user: req.user.id,
            course: courseId,
            subscriptionPlan: planName,
            amount,
            currency: "INR",
            razorpayOrderId: order.id,
            status: 'created'
        });

        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Verify Razorpay Payment (Webhook or Client-side)
// @route   POST /api/v1/payments/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update payment record
            const payment = await Payment.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: 'captured'
                },
                { new: true }
            );

            // Handle Enrollment if it's a course purchase
            if (payment.course) {
                await Enrollment.create({
                    user: payment.user,
                    course: payment.course
                });

                // Update course enrollment count
                await Course.findByIdAndUpdate(payment.course, {
                    $inc: { enrollmentCount: 1 }
                });
            }

            // Get full user and course details for invoice/email
            const fullPayment = await Payment.findById(payment._id).populate('user').populate('course');
            const itemName = fullPayment.course ? fullPayment.course.title : fullPayment.subscriptionPlan;

            const { filePath, filename } = await generateInvoice(fullPayment, fullPayment.user, itemName);

            await sendEmail({
                email: fullPayment.user.email,
                subject: `Payment Successful - ${itemName}`,
                message: `Hi ${fullPayment.user.name}, your payment of INR ${fullPayment.amount} for ${itemName} was successful. Please find your invoice attached.`,
                attachments: [{
                    filename: filename,
                    path: filePath,
                    contentType: 'application/pdf'
                }]
            });

            res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (err) {
        next(err);
    }
};
