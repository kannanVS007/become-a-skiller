import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheck, FiArrowLeft, FiArrowRight, FiInfo } from 'react-icons/fi';
import { FaCcStripe, FaPaypal, FaBitcoin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    const subtotal = getTotal();
    const total = subtotal + (subtotal * 0.05) + 2.00; // matching CartPage logic

    const handleProcessPayment = () => {
        setIsLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            navigate('/success');
        }, 2000);
    };

    if (cartItems.length === 0) {
        return <Link to="/cart" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <Link to="/cart" className="p-2 hover:bg-white dark:hover:bg-gray-900 rounded-full transition-all">
                            <FiArrowLeft className="w-6 h-6 text-gray-500" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Secure Checkout</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <FiLock className="text-green-500" /> All transactions are encrypted and secure.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Checkout Form */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Steps Indicator */}
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-500' : 'text-gray-400'}`}>
                                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}>1</span>
                                    <span className="font-bold text-sm">Billing</span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-500' : 'text-gray-400'}`}>
                                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}>2</span>
                                    <span className="font-bold text-sm">Payment</span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="billing"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-soft space-y-6"
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Billing Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="First Name" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                            <Input label="Last Name" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                        </div>
                                        <Input label="Email Address" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                        <Input label="Street Address" placeholder="123 Tech Lane" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="City" placeholder="Silicon Valley" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                            <Input label="ZIP Code" placeholder="94025" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                                        </div>
                                        <Button variant="primary" size="lg" className="w-full" onClick={() => setStep(2)}>
                                            Continue to Payment <FiArrowRight className="ml-2" />
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        {/* Payment Method Selector */}
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'card', name: 'Card', icon: FiCreditCard },
                                                { id: 'paypal', name: 'PayPal', icon: FaPaypal },
                                                { id: 'crypto', name: 'Crypto', icon: FaBitcoin }
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setPaymentMethod(method.id)}
                                                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === method.id
                                                            ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-500 text-primary-600'
                                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400'
                                                        }`}
                                                >
                                                    <method.icon className="w-6 h-6" />
                                                    <span className="text-xs font-bold uppercase">{method.name}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Dynamic Payment Form */}
                                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-soft">
                                            {paymentMethod === 'card' && (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Credit Card Detail</h3>
                                                        <FaCcStripe className="text-4xl text-gray-400" />
                                                    </div>
                                                    <Input label="Cardholder Name" placeholder="JOHN DOE" value={formData.cardName} onChange={(e) => setFormData({ ...formData, cardName: e.target.value })} />
                                                    <Input label="Card Number" placeholder="**** **** **** ****" icon={FiCreditCard} value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input label="Expiry Date" placeholder="MM/YY" value={formData.expiry} onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} />
                                                        <Input label="CVC" placeholder="***" value={formData.cvc} onChange={(e) => setFormData({ ...formData, cvc: e.target.value })} />
                                                    </div>
                                                </div>
                                            )}

                                            {paymentMethod === 'paypal' && (
                                                <div className="text-center py-12 space-y-6">
                                                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                                                        <FaPaypal className="w-10 h-10 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pay with PayPal</h3>
                                                        <p className="text-sm text-gray-500 mt-2">You will be redirected to PayPal's secure site to complete your payment.</p>
                                                    </div>
                                                </div>
                                            )}

                                            {paymentMethod === 'crypto' && (
                                                <div className="text-center py-12 space-y-6">
                                                    <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                                                        <FaBitcoin className="w-10 h-10 text-orange-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pay with Crypto</h3>
                                                        <p className="text-sm text-gray-500 mt-2">Secure crypto payment via BitPay. Supports BTC, ETH, and USDC.</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex gap-4">
                                                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(1)}>
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    className="flex-[2]"
                                                    disabled={isLoading}
                                                    onClick={handleProcessPayment}
                                                >
                                                    {isLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                                                </Button>
                                            </div>
                                        </div>

                                        <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-2">
                                            <FiInfo /> Your data is encrypted and never stored on our servers.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-xl sticky top-28">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                                                <img src={item.image || `https://source.unsplash.com/random/100x100?tech,${item.id}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                                                <p className="text-[10px] text-gray-500">${item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-900 dark:text-white font-bold">
                                        <span>Total Amount</span>
                                        <span className="text-xl text-primary-500">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl flex flex-col items-center gap-2 text-center text-[11px] text-primary-600 dark:text-primary-400">
                                    <FiCheck className="w-5 h-5" />
                                    <p>Your enrollment will be instant after payment confirmation!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
