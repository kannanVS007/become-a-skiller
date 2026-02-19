import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import api from '../services/api';

const SignUp = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        acceptTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const roleOptions = [
        { value: 'student', label: '🎓 Student - Learn new skills' },
        { value: 'trainer', label: '👨‍🏫 Trainer - Teach and earn' },
        { value: 'admin', label: '🏢 Admin - Platform Management' },
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.role) newErrors.role = 'Please select a role';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
        return newErrors;
    };

    const handleNext = () => {
        const newErrors = validateStep1();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateStep2();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (data.success) {
                login(data.user, data.token, data.refreshToken);
                navigate('/dashboard');
            }
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Background elements */}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[48px] p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/5">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            Create <span className="text-blue-600">Account</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Join our global expert network</p>
                    </div>

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-3 mb-12">
                        {[1, 2].map((i) => (
                            <div key={i} className={`h-2.5 rounded-full transition-all duration-500 ${step === i ? 'bg-blue-600 w-16' : 'bg-gray-200 dark:bg-gray-800 w-2.5'}`} />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <Input
                                    label="Full Name"
                                    type="text"
                                    icon={FiUser}
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    error={errors.name}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    icon={FiMail}
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    error={errors.email}
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    variant="primary"
                                    size="lg"
                                    className="w-full !rounded-2xl h-14 font-black text-lg shadow-glow"
                                >
                                    Continue <FiArrowRight className="ml-2 w-5 h-5 inline" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Password"
                                        type="password"
                                        icon={FiLock}
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        error={errors.password}
                                        required
                                    />
                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        icon={FiLock}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        error={errors.confirmPassword}
                                        required
                                    />
                                </div>
                                <Select
                                    label="Select Your Role"
                                    options={roleOptions}
                                    value={formData.role}
                                    onChange={(value) => handleChange('role', value)}
                                    error={errors.role}
                                    required
                                />
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100">
                                    <label className="flex items-start gap-4 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="w-6 h-6 rounded-lg border-2 border-blue-300 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                                            <FiCheck className="text-white opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            I agree to the <span className="text-blue-600 underline">Terms</span> and <span className="text-blue-600 underline">Privacy</span>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && <p className="mt-2 text-xs text-red-500 font-bold">{errors.acceptTerms}</p>}
                                </div>
                                <div className="flex gap-4">
                                    <Button type="button" onClick={() => setStep(1)} variant="secondary" className="flex-1 !rounded-2xl h-14 font-black">Back</Button>
                                    <Button type="submit" variant="primary" className="flex-2 !rounded-2xl h-14 font-black shadow-glow" disabled={isLoading}>
                                        {isLoading ? "Starting..." : "Start Journey"}
                                    </Button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Already joined? <Link to="/login" className="text-blue-600 font-black">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
