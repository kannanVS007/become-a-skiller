import Razorpay from 'razorpay';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Payment, Enrollment } from '../models/Transaction.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { generateInvoice } from '../services/invoiceService.js';
import sendEmail from '../services/emailService.js';

// Lazy Razorpay instance — only created when payment routes are actually called
// so the server starts fine even when keys are placeholder values
const getRazorpay = () => {
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id') {
        throw new Error('Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to server/.env');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};

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

        const order = await getRazorpay().orders.create(options);

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
        console.error("Payment Verification Error:", err);
        next(err);
    }
};

// @desc    Download Payment Receipt PDF
// @route   GET /api/v1/payments/receipt/:orderId
// @access  Private
export const downloadReceipt = async (req, res, next) => {
    try {
        const payment = await Payment.findOne({ razorpayOrderId: req.params.orderId })
            .populate('user')
            .populate('course');

        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // Only allow the owner or admin to download
        if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const itemName = payment.course ? payment.course.title : payment.subscriptionPlan;
        const filename = `invoice_${payment.razorpayOrderId}.pdf`;
        const filePath = path.join(process.cwd(), 'temp', filename);

        // Regenerate PDF if it doesn't exist
        if (!fs.existsSync(filePath)) {
            await generateInvoice(payment, payment.user, itemName);
        }

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/pdf');
        fs.createReadStream(filePath).pipe(res);
    } catch (err) {
        next(err);
    }
};
