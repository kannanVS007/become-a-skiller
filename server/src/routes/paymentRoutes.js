import express from 'express';
import { createOrder, verifyPayment, downloadReceipt } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/receipt/:orderId', protect, downloadReceipt);

export default router;
