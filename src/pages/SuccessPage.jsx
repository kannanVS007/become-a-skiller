import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPlay, FiBook, FiAward, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';

const SuccessPage = () => {
    useEffect(() => {
        // Fire confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const onboardingSteps = [
        { title: 'Access Dashboard', desc: 'Find your new courses in your candidate dashboard immediately.', icon: FiPlay },
        { title: 'Start Learning', desc: 'Dive into the curriculum and start building real-world projects.', icon: FiBook },
        { title: 'Get Certified', desc: 'Complete assignments and earn your industry-recognized certificates.', icon: FiAward },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Success Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-900 rounded-[48px] p-12 text-center border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary"></div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-lg shadow-green-500/30"
                        >
                            <FiCheckCircle className="w-12 h-12 text-white" />
                        </motion.div>

                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                            Thank you for your purchase. Your enrollment is now active.
                            <br />
                            Transaction ID: <span className="font-mono text-sm text-primary-500">TXN_8374920485</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link to="/dashboard">
                                <Button variant="primary" size="lg" className="w-full sm:w-auto px-12">
                                    Go to Dashboard
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                                <FiDownload /> Download Receipt
                            </Button>
                        </div>

                        {/* Onboarding Steps */}
                        <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">What's Next?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {onboardingSteps.map((step, i) => (
                                    <div key={i} className="text-center group">
                                        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all transform group-hover:-translate-y-1">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Support Link */}
                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Having trouble? <Link to="/contact" className="text-primary-500 font-bold hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SuccessPage;
