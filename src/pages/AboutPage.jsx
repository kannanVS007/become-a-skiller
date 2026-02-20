import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiTarget, FiLayers, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';

const AboutPage = () => {
    const stats = [
        { label: 'Learners Worldwide', value: '10K+', icon: FiUsers, color: 'text-blue-500' },
        { label: 'Courses Published', value: '500+', icon: FiLayers, color: 'text-purple-500' },
        { label: 'Success Rate', value: '95%', icon: FiTrendingUp, color: 'text-green-500' },
        { label: 'Industry Partners', value: '150+', icon: FiTarget, color: 'text-orange-500' },
    ];

    const timeline = [
        { year: '2021', title: 'The Vision', description: 'Become a Skiller was founded with a mission to bridge the gap between classroom and careers.' },
        { year: '2022', title: 'Rapid Growth', description: 'Reached 5,000 active students and launched our first enterprise enterprise collaboration program.' },
        { year: '2023', title: 'Global Expansion', description: 'Expanded across South Asia and Europe with localized content for diverse tech ecosystems.' },
        { year: '2024', title: 'AI Integration', description: 'Pioneered AI-assisted learning paths to personalize the student journey at scale.' },
    ];

    const values = [
        { title: 'Excellence', description: 'We push the boundaries of educational technology to deliver the best learning experience.', icon: FiCheckCircle },
        { title: 'Inclusivity', description: 'Education should be accessible to everyone, regardless of their background or location.', icon: FiUsers },
        { title: 'Innovation', description: 'We constantly evolve our curriculum to stay ahead of the rapidly changing tech world.', icon: FiTarget },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh-dark dark:bg-gradient-mesh opacity-40"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                            We're Building the <br />
                            <span className="text-gradient">Future of Tech Skills</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            A global platform dedicated to transforming passionate learners into industry
                            professionals through high-impact, expert-led training and real-world projects.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 relative px-4 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-premium flex items-center justify-center mx-auto mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold mb-6">
                            OUR MISSION
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Empowering millions to <span className="text-gradient">bridge the skill gap.</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                            At Become a Skiller, we believe that education should be immersive, constant,
                            and career-oriented. Our mission is to democratize high-end tech education
                            and provide a clear pathway to employment for anyone with the ambition to learn.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-white/10 shadow-soft">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Global Reach</h4>
                                <p className="text-xs text-gray-500">Learning across 20+ countries.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-white/10 shadow-soft">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Expert Led</h4>
                                <p className="text-xs text-gray-500">Curriculum by FAANG experts.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[40px] bg-gradient-mesh rotate-3 relative overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                                alt="Team Collaboration"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary-600/20 backdrop-blur-[2px]"></div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white dark:bg-gray-800 rounded-3xl shadow-enterprise p-6 z-20 hidden lg:block">
                            <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center mb-4">
                                <FiCheckCircle className="text-white w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Trusted by 100+ Companies Worldwide</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our <span className="text-gradient">Journey</span></h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-blue-500 to-purple-500 -translate-x-1/2 rounded-full hidden md:block"></div>

                    <div className="space-y-20 relative">
                        {timeline.map((item, idx) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 text-center md:text-right">
                                    {idx % 2 === 0 ? (
                                        <>
                                            <span className="text-4xl font-extrabold text-gradient mb-2 block">{item.year}</span>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                        </>
                                    ) : null}
                                </div>

                                <div className="z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-primary-500 flex-shrink-0 flex items-center justify-center shadow-glow">
                                    <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    {idx % 2 !== 0 ? (
                                        <>
                                            <span className="text-4xl font-extrabold text-gradient mb-2 block">{item.year}</span>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                                        </>
                                    ) : null}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {values.map((val, idx) => (
                        <motion.div
                            key={val.title}
                            whileHover={{ y: -15 }}
                            className="group"
                        >
                            <Card className="text-center p-10 h-full border-white/5 bg-white/20 dark:bg-white/5 backdrop-blur-xl hover:shadow-glow-blue transition-all duration-500">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-glow rotate-3 group-hover:rotate-6 transition-transform">
                                    <val.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{val.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{val.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
