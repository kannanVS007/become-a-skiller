import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDollarSign, FiAward, FiActivity, FiZap, FiTarget } from 'react-icons/fi';
import Card from './ui/Card';

const DashboardPreview = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const stats = [
        { icon: FiUsers, label: 'Engagement', value: '98.4%', color: 'from-blue-500 to-cyan-400' },
        { icon: FiZap, label: 'Speed', value: '45ms', color: 'from-amber-400 to-orange-500' },
        { icon: FiTarget, label: 'Success', value: '12.8k', color: 'from-purple-500 to-pink-500' },
        { icon: FiActivity, label: 'Uptime', value: '100%', color: 'from-emerald-400 to-teal-500' }
    ];

    return (
        <section id="kinetic-dashboard" className="py-32 px-4 relative overflow-hidden bg-gray-950">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
                            <FiActivity className="text-primary-500 animate-pulse" />
                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Live Integration</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            High-Fidelity <br />
                            <span className="text-gradient">Control Center</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-12 font-medium leading-relaxed max-w-lg">
                            Experience zero-latency analytics. Our cinematic dashboard provides
                            unprecedented depth into your learning trajectory and institutional growth.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-3 mb-4 shadow-glow-premium group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="text-white w-full h-full" />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h4 className="text-2xl font-black text-white">{stat.value}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3D Mockup Section */}
                    <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        {/* Data Streams (Animated SVGs) */}
                        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                            <motion.path
                                d="M 0 100 Q 150 50 300 150 T 600 100"
                                fill="none"
                                stroke="url(#stream-grad)"
                                strokeWidth="2"
                                strokeDasharray="10 20"
                                animate={{ strokeDashoffset: [0, -100] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00A8E8" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#00A8E8" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#7B68EE" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            className="relative z-10"
                        >
                            <Card className="p-0 overflow-hidden bg-white/[0.05] border-white/20 dark:border-white/10 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] rounded-[48px] rotate-2 group hover:rotate-0 transition-transform duration-1000">
                                <div className="relative">
                                    <img
                                        src="/img/dashboard.jpg"
                                        alt="Dashboard Mockup"
                                        className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-transparent pointer-events-none" />

                                    {/* OS Chromes */}
                                    <div className="absolute top-8 left-8 flex gap-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-3.5 h-3.5 rounded-full ${i === 1 ? 'bg-red-500/60' : i === 2 ? 'bg-yellow-500/60' : 'bg-green-500/60'} backdrop-blur-sm shadow-glow-premium`} />
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Floating Snippets */}
                            <AnimatePresence>
                                <motion.div
                                    key="snippet-growth"
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-12 -right-12 p-6 rounded-[32px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-premium z-20 flex items-center gap-4 group hover:scale-110 transition-transform"
                                >
                                    <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow-premium">
                                        <FiTrendingUp className="text-white w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Growth</p>
                                        <p className="text-2xl font-black text-white">+124.5%</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    key="snippet-users"
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute -bottom-12 -left-12 p-5 rounded-[28px] bg-gray-950/80 backdrop-blur-2xl border border-white/10 shadow-premium z-20 hidden md:flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center">
                                        <FiUsers className="w-6 h-6" />
                                    </div>
                                    <div className="pr-6">
                                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Active Now</p>
                                        <p className="text-xl font-black text-white">4,289</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Kinetic Background elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none z-0">
                            <div className="absolute inset-0 border-[2px] border-dashed border-primary-500/30 rounded-full rotate-center" />
                            <div className="absolute inset-[10%] border-[2px] border-dashed border-purple-500/20 rounded-full rotate-center-reverse" style={{ animationDuration: '40s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;
