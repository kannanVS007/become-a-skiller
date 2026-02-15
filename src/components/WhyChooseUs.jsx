import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiCheckCircle, FiShield, FiCpu, FiAward, FiGlobe } from 'react-icons/fi';
import Card from './ui/Card';

const WhyChooseUs = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-500, 500], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-5, 5]), springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX - innerWidth / 2);
        mouseY.set(clientY - innerHeight / 2);
    };

    const reasons = [
        {
            icon: FiAward,
            title: 'Elite Certifications',
            description: 'Industry-standard validation recognized by top-tier tech giants.',
            color: 'from-blue-500 to-indigo-600',
        },
        {
            icon: FiCpu,
            title: 'AI-Powered Learning',
            description: 'Personalized paths driven by next-gen cognitive algorithms.',
            color: 'from-purple-500 to-pink-600',
        },
        {
            icon: FiShield,
            title: 'Ironclad Guarantee',
            description: '98% placement success rate with verified career outcomes.',
            color: 'from-cyan-500 to-blue-600',
        },
        {
            icon: FiGlobe,
            title: 'Neural Network',
            description: 'Connect with a global ecosystem of elite tech innovators.',
            color: 'from-emerald-500 to-teal-600',
        }
    ];

    return (
        <section
            id="premium-why-us"
            onMouseMove={handleMouseMove}
            className="py-32 px-4 relative overflow-hidden mesh-gradient cursor-default"
        >
            {/* 3D Parallax Orbs */}
            <motion.div
                style={{ x: useTransform(mouseX, [-500, 500], [-30, 30]), y: useTransform(mouseY, [-500, 500], [-30, 30]) }}
                className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                style={{ x: useTransform(mouseX, [-500, 500], [40, -40]), y: useTransform(mouseY, [-500, 500], [40, -40]) }}
                className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-primary-400 mb-8 shadow-glow-premium"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        The Professional Standard
                    </motion.div>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        Engineered for <br />
                        <span className="text-gradient">Absolute Mastery</span>
                    </h2>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Beyond the classroom. Beyond the platform. A cinematic learning ecosystem
                        designed to transform you into a top-tier digital architect.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    <motion.div
                        style={{ rotateX, rotateY, perspective: 1000 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        {reasons.slice(0, 2).map((reason, idx) => (
                            <WhyCard key={reason.title} reason={reason} idx={idx} />
                        ))}
                    </motion.div>

                    <motion.div
                        style={{ rotateX, rotateY, perspective: 1000 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        {reasons.slice(2, 4).map((reason, idx) => (
                            <WhyCard key={reason.title} reason={reason} idx={idx + 2} />
                        ))}
                    </motion.div>
                </div>

                {/* Kinetic Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 pt-20 border-t border-white/5 flex flex-col items-center"
                >
                    <p className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase mb-12">Elite Industry Synergy</p>
                    <div className="flex flex-wrap justify-center gap-16 md:gap-32 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {['NVIDIA', 'APPLE', 'GITHUB', 'STRIPE', 'TESLA'].map(brand => (
                            <span key={brand} className="text-2xl font-black tracking-widest text-white">{brand}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const WhyCard = ({ reason, idx }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, z: 50 }}
            className="group relative"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 rounded-[40px]`}></div>

            <Card className="h-full p-10 bg-white/[0.03] dark:bg-black/40 backdrop-blur-3xl border border-white/10 group-hover:border-primary-500/50 transition-all duration-700 rounded-[40px] overflow-hidden flex flex-col items-start shadow-premium kinetic-border">
                <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${reason.color} p-4 mb-8 shadow-glow-premium group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <reason.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-primary-400 transition-colors">
                    {reason.title}
                </h3>

                <p className="text-gray-400 font-medium leading-relaxed mb-8 flex-grow">
                    {reason.description}
                </p>

                <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Learn More</span>
                    <FiTrendingUp className="text-primary-500 w-4 h-4" />
                </div>

                <span className="absolute -top-4 -right-4 text-[120px] font-black text-white/[0.02] select-none italic tracking-tighter">
                    0{idx + 1}
                </span>
            </Card>
        </motion.div>
    );
};

export default WhyChooseUs;
