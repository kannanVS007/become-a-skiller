import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlay, FiAward, FiActivity, FiUsers, FiGlobe, FiShield } from 'react-icons/fi';
import { FaAws } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    SiReact, SiPython, SiJavascript, SiTensorflow,
    SiDocker, SiKubernetes, SiMongodb
} from 'react-icons/si';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);

    const slides = [
        {
            id: 1,
            badge: "Future of Skills",
            title: "Empowering",
            titleGradient: "Tomorrow's Workforce",
            subtitle: "with New Tech Skills",
            description: "Bridge the gap between education and career opportunities. Learn from industry experts and build real-world projects.",
            ctaPrimary: "Explore Courses",
            ctaSecondary: "Become a Trainer",
            stats: [
                { value: '10K+', label: 'Students' },
                { value: '500+', label: 'Courses' },
                { value: '95%', label: 'Success Rate' },
            ],
            gradient: "from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
            image: "/img/rgt-1.png", // Premium Girl image
            type: "character"
        },
        {
            id: 2,
            badge: "Enterprise Analytics",
            title: "Precision",
            titleGradient: "Data-Driven Learning",
            subtitle: "for Growing Teams",
            description: "Monitor progress with real-time analytics. Our enterprise dashboard gives you the insights to scale faster.",
            ctaPrimary: "View Analytics",
            ctaSecondary: "Free Demo",
            stats: [
                { value: '24/7', label: 'Monitoring' },
                { value: 'Real-time', label: 'Analytics' },
                { value: '99.9%', label: 'Uptime' },
            ],
            gradient: "from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900",
            image: "/img/rgt-2.png", // Premium Guy image
            type: "character"
        },
        {
            id: 3,
            badge: "Global Community",
            title: "Connecting",
            titleGradient: "Global Innovators",
            subtitle: "in One Ecosystem",
            description: "Join a network of 10,000+ ambitious learners. Share knowledge, collaborate on projects, and grow together.",
            ctaPrimary: "Join Community",
            ctaSecondary: "Find Mentors",
            stats: [
                { value: '25+', label: 'Countries' },
                { value: '1M+', label: 'Commits' },
                { value: '200+', label: 'Mentors' },
            ],
            gradient: "from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900",
            image: "/img/rgt-1.png", // Re-using for demo consistency
            type: "character"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
                    return 0;
                }
                return prev + 0.5;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
        setProgress(0);
    };

    return (
        <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 bg-gradient-to-br ${slides[currentSlide].gradient}`}>
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 bg-gradient-mesh dark:bg-gradient-mesh-dark opacity-60"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Floating Orbs */}
                    <motion.div
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                            scale: currentSlide === 0 ? [1, 1.1, 1] : [1.1, 1.2, 1.1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, 50, 0],
                            x: [0, -30, 0],
                            scale: currentSlide === 2 ? [1.2, 1, 1.2] : [1, 1.1, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-soft mb-6"
                                >
                                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                                        {slides[currentSlide].badge}
                                    </span>
                                </motion.div>

                                {/* Headline */}
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                                    <span className="text-gray-900 dark:text-white">{slides[currentSlide].title}</span>
                                    <br />
                                    <span className="text-gradient drop-shadow-sm">{slides[currentSlide].titleGradient}</span>
                                    <br />
                                    <span className="text-gray-900 dark:text-white text-3xl md:text-5xl lg:text-6xl">{slides[currentSlide].subtitle}</span>
                                </h1>

                                {/* Subheading */}
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                    {slides[currentSlide].description}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                                    <Link to="/courses">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-gradient-primary text-white rounded-2xl font-bold shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 justify-center min-w-[200px]"
                                        >
                                            {slides[currentSlide].ctaPrimary}
                                            <FiArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 border-2 border-primary-500/30 dark:border-primary-500/20 text-primary-600 dark:text-primary-400 rounded-2xl font-bold hover:bg-white dark:hover:bg-gray-800 transition-all flex items-center gap-2 justify-center min-w-[200px]"
                                        >
                                            {slides[currentSlide].ctaSecondary}
                                            <FiPlay className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-8 md:gap-12 justify-center lg:justify-start">
                                    {slides[currentSlide].stats.map((stat, index) => (
                                        <div key={index} className="text-center lg:text-left">
                                            <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Content - Character Images & Rotating Backgrounds */}
                    <div className="relative flex items-center justify-center lg:h-[700px]">
                        {/* Background Rotating Circles - Jobzilla Style */}
                        <div className="twm-img-bg-circle-area">
                            <div className="twm-img-bg-circle1 rotate-center"></div>
                            <div className="twm-img-bg-circle2 rotate-center-reverse"></div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-[340px] relative z-10"
                            >
                                {/* Main Image Carousel Container */}
                                <div className="twm-bnr-right-carousel relative overflow-visible">
                                    <motion.img
                                        src={slides[currentSlide].image}
                                        alt="Success Story"
                                        className="w-full max-h-[500px] object-cover rounded-[40px] lg:rounded-[60px] shadow-2xl border-4 border-white/50 backdrop-blur-sm"
                                        animate={{
                                            y: [0, -15, 0],
                                        }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Floating Skill Badges */}
                                    <motion.div
                                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="absolute -top-10 -right-5 bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-glow border border-white/20 z-20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                <SiReact className="text-blue-500 w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Certified</div>
                                                <div className="text-sm font-black dark:text-white">Expert</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                                        transition={{ duration: 7, repeat: Infinity }}
                                        className="absolute -bottom-5 -left-10 bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-glow border border-white/20 z-20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                                <FiAward className="text-green-500 w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Earnings</div>
                                                <div className="text-sm font-black dark:text-white">$14K+</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Controls & Progress Bar */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-30">
                    <div className="flex gap-6">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className="group relative"
                            >
                                <div className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-primary-500 w-12' : 'bg-gray-300 dark:bg-gray-700 w-6 hover:bg-gray-400'}`} />
                                {currentSlide === idx && (
                                    <motion.div
                                        layoutId="progress-bar"
                                        className="absolute top-0 left-0 h-1.5 bg-primary-600 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 right-8 hidden md:block"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-gray-400 font-bold"
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-primary-500 to-transparent"></div>
                        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-lr]">Scroll Down</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Section Blend */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10"></div>
        </section>
    );
};

export default Hero;
