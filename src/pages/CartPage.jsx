import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiShield, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        getSubtotal,
        getTotal,
        getDiscountAmount,
        couponCode,
        applyCoupon,
        removeCoupon
    } = useCart();

    const [couponInput, setCouponInput] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const result = applyCoupon(couponInput);
        if (!result.success) {
            setCouponError(result.message);
        } else {
            setCouponError('');
            setCouponInput('');
        }
    };

    const tax = getSubtotal() * 0.05; // 5% mock tax
    const platformFee = 2.00;
    const finalTotal = getTotal() + tax + platformFee;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950">
                <Navbar />
                <div className="pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6"
                    >
                        <FiShoppingBag className="w-10 h-10 text-primary-500" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                        Looks like you haven't added any courses to your cart yet. Explore our courses to start your learning journey!
                    </p>
                    <Link to="/courses">
                        <Button variant="primary" size="lg">
                            Browse Courses
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft flex gap-6 items-center"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                            <img src={item.thumbnail || item.image || `https://source.unsplash.com/random/200x200?tech,${item.id}`} alt={item.title} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span>By {item.instructor || 'Expert Trainer'}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                <span className={`font-bold ${item.pricingMode === 'subscription' ? 'text-purple-500' : 'text-blue-500'}`}>
                                                    {item.pricingMode === 'subscription' ? 'Subscription' : 'Lifetime Access'}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-4">
                                                <span className="text-lg font-black text-primary-500">₹{item.price}</span>
                                                {item.pricingMode === 'lifetime' && item.oldPrice && (
                                                    <span className="text-sm text-gray-400 line-through">₹{item.oldPrice}</span>
                                                )}
                                                {item.pricingMode === 'subscription' && (
                                                    <span className="text-xs text-gray-400">/ month</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-4">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                            <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700">
                                                <button className="p-1 hover:text-primary-500"><FiMinus className="w-4 h-4" /></button>
                                                <span className="px-3 text-sm font-bold text-gray-900 dark:text-white">1</span>
                                                <button className="p-1 hover:text-primary-500"><FiPlus className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex items-center gap-3">
                                    <FiShield className="text-green-500 w-6 h-6" />
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                                        <p className="font-bold text-gray-900 dark:text-white text-xs">Secure Checkout</p>
                                        <p>100% SSL encryption</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex items-center gap-3">
                                    <FiTruck className="text-blue-500 w-6 h-6" />
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                                        <p className="font-bold text-gray-900 dark:text-white text-xs">Instant Access</p>
                                        <p>Learn right after purchase</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-xl sticky top-28">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900 dark:text-white">₹{getSubtotal().toFixed(2)}</span>
                                    </div>

                                    {getDiscountAmount() > 0 && (
                                        <div className="flex justify-between text-green-500">
                                            <span>Discount ({couponCode})</span>
                                            <span className="font-bold">-₹{getDiscountAmount().toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                        <span>Tax (5%)</span>
                                        <span className="font-bold text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                        <span>Platform Fee</span>
                                        <span className="font-bold text-gray-900 dark:text-white">₹{platformFee.toFixed(2)}</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center mt-4">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-3xl font-black text-gradient">₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Coupon Input */}
                                <form onSubmit={handleApplyCoupon} className="mb-8">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                            className="w-full pl-4 pr-20 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-bold uppercase"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1.5 px-4 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-bold hover:bg-primary-600 transition-all"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponError && <p className="mt-2 text-xs text-red-500 font-medium">{couponError}</p>}
                                    {couponCode && (
                                        <div className="mt-2 flex items-center justify-between bg-green-500/10 text-green-600 px-3 py-2 rounded-lg text-xs font-bold">
                                            <span>CODE: {couponCode} APPLIED!</span>
                                            <button onClick={removeCoupon} className="hover:text-red-500">REMOVE</button>
                                        </div>
                                    )}
                                </form>

                                <Link to="/checkout">
                                    <button className="w-full py-4 bg-gradient-primary text-white rounded-2xl font-black shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                        Proceed to Checkout
                                        <FiArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>

                                <p className="text-[10px] text-center text-gray-400 mt-6 px-4">
                                    By proceeding to checkout, you agree to our Terms of Service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;
