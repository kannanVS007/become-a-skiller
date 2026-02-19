import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            if (data.success) {
                login(data.user, data.token, data.refreshToken);
                navigate('/dashboard');
            }
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Login failed. Please check your credentials.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Background elements omitted for brevity in thought, but should be included in real file */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full"
                />
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/5">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            Welcome <span className="text-blue-600">Back</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your credentials to access your portal</p>
                    </div>

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            icon={FiMail}
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            icon={FiLock}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            error={errors.password}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => handleChange('rememberMe', e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium font-medium">Remember me</span>
                            </label>
                            <Link to="/forgot-password" title="Forgot Password Link" className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full !rounded-2xl h-14 font-black text-lg shadow-glow transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Sign In'}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                <span className="px-4 bg-white dark:bg-gray-900 text-gray-400">Secure Connect</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-2xl transition-all font-bold border border-gray-200 dark:border-gray-700 shadow-soft"
                        >
                            <FcGoogle className="w-6 h-6" />
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium">
                        New to the platform?{' '}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-black transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
