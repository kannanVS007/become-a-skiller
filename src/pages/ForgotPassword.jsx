import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Advanced Animated Mesh Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary-500/20 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        x: [0, -100, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary-500/20 blur-[120px] rounded-full"
                />
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/5">
                    {!isSuccess ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                                    className="inline-block p-4 bg-gradient-primary rounded-3xl shadow-glow mb-6"
                                >
                                    <FiMail className="w-10 h-10 text-white" />
                                </motion.div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Forgot <span className="text-gradient">Password?</span></h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    Don't worry! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        icon={FiMail}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError('');
                                        }}
                                        error={error}
                                        required
                                        className="!rounded-2xl"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full !rounded-2xl h-14 font-black text-lg shadow-glow"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-3 text-sm">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending Instructions...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Send Link
                                                <FiArrowRight />
                                            </span>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>

                            {/* Back to Login */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 text-center"
                            >
                                <Link
                                    to="/login"
                                    className="text-gray-500 dark:text-gray-400 hover:text-primary-500 font-bold transition-all inline-flex items-center gap-2 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </div>
                                    Back to login
                                </Link>
                            </motion.div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                                className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-[32px] mb-8"
                            >
                                <FiCheck className="w-12 h-12 text-green-500" />
                            </motion.div>

                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Check Your <span className="text-gradient">Email</span></h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed">
                                We've sent password reset instructions to <br />
                                <span className="text-primary-500 font-black">{email}</span>
                            </p>

                            <Link to="/login">
                                <Button variant="primary" size="lg" className="w-full !rounded-2xl h-14 font-black shadow-glow">
                                    Return to Login
                                </Button>
                            </Link>

                            <p className="mt-8 text-sm text-gray-400 font-medium">
                                Didn't receive the email?{' '}
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-primary-500 hover:text-primary-600 font-black"
                                >
                                    Try again
                                </button>
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
