import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiArrowRight, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../services/api';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!/^[0-9]{10}$/.test(mobile.trim())) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.patch('/users/profile', { mobile: mobile.trim() });

            if (data.success) {
                updateUser({ mobile: mobile.trim() });
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/5">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600">
                            <FiShield size={40} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            Secure Your <span className="text-blue-600">Account</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            A mobile number is required to continue. This helps us protect your account and provide better support.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Mobile Number"
                            type="tel"
                            icon={FiPhone}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            placeholder="10-digit mobile number"
                            required
                        />

                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/30">
                            <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                                <strong>Why is this required?</strong> We use your number for critical account alerts, verification, and to connect you with job opportunities.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full !rounded-2xl h-14 font-black text-lg shadow-glow"
                            disabled={isLoading || mobile.length !== 10}
                        >
                            {isLoading ? 'Updating...' : (
                                <span className="flex items-center justify-center gap-2">
                                    Complete Profile <FiArrowRight />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CompleteProfile;
