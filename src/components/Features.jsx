import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiBriefcase, FiBook, FiTarget } from 'react-icons/fi';
import Card from './ui/Card';

const Features = () => {
    const features = [
        {
            icon: FiUsers,
            title: 'For Students',
            description: 'Access world-class courses, build real projects, and get certified',
            gradient: 'from-blue-500 to-cyan-500',
            benefits: ['Live Classes', 'Hands-on Projects', 'Career Support', 'Certificates'],
        },
        {
            icon: FiAward,
            title: 'For Trainers',
            description: 'Share your expertise, build your brand, and earn passive income',
            gradient: 'from-purple-500 to-pink-500',
            benefits: ['Easy Course Creation', 'Global Reach', 'Analytics Dashboard', 'Revenue Sharing'],
        },
        {
            icon: FiBriefcase,
            title: 'For Companies',
            description: 'Hire skilled talent, upskill your team, and drive innovation',
            gradient: 'from-green-500 to-teal-500',
            benefits: ['Talent Pool Access', 'Custom Training', 'Team Analytics', 'Bulk Licensing'],
        },
        {
            icon: FiBook,
            title: 'For Tuition Masters',
            description: 'Manage your courses, track student progress, and grow your business',
            gradient: 'from-orange-500 to-red-500',
            benefits: ['Course Management', 'Student Tracking', 'Payment Integration', 'Reports'],
        },
        {
            icon: FiTarget,
            title: 'For Job Seekers',
            description: 'Learn in-demand skills, build portfolio, and land your dream job',
            gradient: 'from-indigo-500 to-purple-500',
            benefits: ['Job-Ready Skills', 'Portfolio Projects', 'Interview Prep', 'Job Placement'],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Built for <span className="text-gradient">Everyone</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Whether you're learning, teaching, hiring, or managing - we've got you covered
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group"
                        >
                            <Card className="h-full relative overflow-hidden">
                                {/* Background Gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 shadow-glow`}
                                >
                                    <feature.icon className="w-full h-full text-white" />
                                </motion.div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {feature.description}
                                </p>

                                {/* Benefits */}
                                <ul className="space-y-2">
                                    {feature.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                {/* Learn More Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1, x: 5 }}
                                    className="mt-6 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold"
                                >
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
