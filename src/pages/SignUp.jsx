import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

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
        { value: 'company', label: '🏢 Company - Hire talent' },
        { value: 'tuition', label: '📚 Tuition Master - Manage courses' },
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
        // Simulate API call
        setTimeout(() => {
            login({
                id: 1,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=00A8E8&color=fff`,
            });
            setIsLoading(false);
            navigate('/dashboard');
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

            {/* Sign Up Card Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[48px] p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/5">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                            className="inline-block p-4 bg-gradient-primary rounded-3xl shadow-glow mb-6"
                        >
                            <img src="/img/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Create <span className="text-gradient">Account</span></h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Join 10,000+ experts world-wide</p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        {[1, 2].map((i) => (
                            <div key={i} className={`h-2.5 rounded-full transition-all duration-500 ${step === i ? 'bg-primary-500 w-16 shadow-glow-sm' : 'bg-gray-200 dark:bg-gray-800 w-2.5'}`} />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
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
                                    className="!rounded-2xl"
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    icon={FiMail}
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    error={errors.email}
                                    required
                                    className="!rounded-2xl"
                                />

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        variant="primary"
                                        size="lg"
                                        className="w-full !rounded-2xl h-14 font-black text-lg shadow-glow transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            Continue
                                            <FiArrowRight className="w-5 h-5" />
                                        </span>
                                    </Button>
                                </motion.div>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                        <span className="px-4 bg-white dark:bg-gray-900 text-gray-400">Social Sign-in</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full h-14 flex items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 font-bold transition-all shadow-soft"
                                >
                                    <FcGoogle className="w-6 h-6" />
                                    <span>Sign in with Google</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        label="Password"
                                        type="password"
                                        icon={FiLock}
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        error={errors.password}
                                        required
                                        className="!rounded-2xl"
                                    />

                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        icon={FiLock}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                        error={errors.confirmPassword}
                                        required
                                        className="!rounded-2xl"
                                    />
                                </div>

                                <Select
                                    label="Select Your Role"
                                    options={roleOptions}
                                    value={formData.role}
                                    onChange={(value) => handleChange('role', value)}
                                    error={errors.role}
                                    required
                                    className="!rounded-2xl"
                                />

                                <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-900/30">
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="mt-1 relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.acceptTerms}
                                                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-6 h-6 rounded-lg border-2 border-primary-300 dark:border-primary-700 peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all"></div>
                                            <FiCheck className="absolute text-white w-4 h-4 left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            I agree to the <Link to="/terms" className="text-primary-500 underline font-bold">Terms of Service</Link> and <Link to="/privacy" className="text-primary-500 underline font-bold">Privacy Policy</Link>
                                        </span>
                                    </label>
                                    {errors.acceptTerms && <p className="mt-2 text-xs text-danger-500 font-bold px-10">{errors.acceptTerms}</p>}
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        variant="secondary"
                                        size="lg"
                                        className="flex-1 !rounded-2xl h-14 font-black"
                                    >
                                        Back
                                    </Button>
                                    <motion.div className="flex-[2]" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full !rounded-2xl h-14 font-black shadow-glow"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Starting..." : "Start Journey"}
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* Login Link */}
                    <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Already part of our network?{' '}
                            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-black transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
