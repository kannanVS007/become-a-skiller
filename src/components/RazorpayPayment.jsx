import React from 'react';
import api from '../services/api';

const RazorpayPayment = ({ amount, courseId, planName, onSuccess }) => {
    const handlePayment = async () => {
        try {
            // 1. Create order on the backend
            const { data: { order } } = await api.post('/payments/order', {
                amount,
                courseId,
                planName
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Become Skiller",
                description: `Payment for ${planName || 'Course'}`,
                order_id: order.id,
                handler: async (response) => {
                    // 2. Verify payment on the backend
                    try {
                        const verifyRes = await api.post('/payments/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            alert('Payment Successful!');
                            if (onSuccess) onSuccess();
                        }
                    } catch (err) {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#2563eb"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Payment initialization failed', err);
            alert('Failed to initialize payment');
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
            Enroll Now (₹{amount})
        </button>
    );
};

export default RazorpayPayment;
