import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDollarSign, FiAward, FiActivity, FiZap, FiTarget } from 'react-icons/fi';
import Card from './ui/Card';

const DashboardPreview = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);
    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-12%", "12%"]);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-12%", "12%"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

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

    // Particle field constants
    const particles = Array.from({ length: 25 });

    return (
        <section id="kinetic-dashboard" className="py-24 sm:py-56 px-4 sm:px-8 relative overflow-hidden bg-[#02040a]">
            {/* Neural Particle Field */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 2000 - 1000,
                            y: Math.random() * 2000 - 1000,
                            opacity: Math.random() * 0.3
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50],
                            opacity: [null, 0.1, 0.4, 0.1]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                            background: i % 2 === 0 ? '#3b82f6' : '#a855f7',
                            filter: 'blur(2px)',
                            borderRadius: '50%',
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Living Borders (Light Beams) */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden h-px bg-white/5">
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-1/4 h-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-px bg-white/5">
                <motion.div
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-1/4 h-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
                />
            </div>

            {/* Cinematic Mesh Background */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-primary-600/10 blur-[200px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[1200px] h-[1200px] bg-purple-700/10 blur-[250px] rounded-full animation-delay-3000 animate-pulse" />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
                    {/* Content Section with Staggered Parallax */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                </span>
                                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Neural Integration v4.0</span>
                            </motion.div>

                            <h2 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-10 tracking-[-0.06em] leading-[0.8]">
                                <motion.span
                                    className="block"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                >Strictly</motion.span>
                                <motion.span
                                    className="text-gradient block italic"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >Elite Control</motion.span>
                            </h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-lg sm:text-2xl text-gray-400/80 mb-12 font-medium leading-tight max-w-xl"
                            >
                                Experience the pinnacle of educational intelligence.
                                A cinema-grade command center for the next generation of Skillers.
                            </motion.p>

                            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
                                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                        className="p-6 sm:p-9 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-primary-500/40 transition-all duration-700 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className={`w-14 h-14 rounded-[22px] bg-gradient-to-br ${stat.color} p-4 mb-7 shadow-glow-premium group-hover:scale-110 transition-transform duration-500`}>
                                            <stat.icon className="text-white w-full h-full" />
                                        </div>
                                        <p className="text-[10px] sm:text-[12px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                                        <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-none">{stat.value}</h4>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 3D Intra-Parallax Mockup Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotateY: 25 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative perspective-3000 hidden md:block"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* External Ambient Glow */}
                        <div className="absolute -inset-40 bg-primary-500/20 blur-[150px] rounded-full z-0 animate-pulse duration-[5000ms]" />

                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                            className="relative z-10"
                        >
                            {/* The Main 3D Card */}
                            <div className="relative group perspective-2000">
                                <Card className="p-0 overflow-hidden bg-[#0a0f1d] border-white/20 shadow-[0_120px_200px_-40px_rgba(0,0,0,0.95)] rounded-[56px] transition-all duration-1000 transform-gpu overflow-hidden">
                                    <div className="relative">
                                        <motion.img
                                            src="/img/dashboard.jpg"
                                            alt="Dashboard Mockup"
                                            className="w-full h-auto opacity-100 scale-[1.02] group-hover:scale-[1.05] transition-transform duration-[2000ms] ease-out"
                                        />

                                        {/* Cinematic Scanlines */}
                                        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-[0.04]" />

                                        {/* Intra-Mockup Glare Parallax */}
                                        <motion.div
                                            style={{ x: glareX, y: glareY }}
                                            className="absolute -inset-1/2 bg-gradient-radial from-white/10 to-transparent pointer-events-none z-20"
                                        />

                                        {/* Colored Gradients */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-purple-500/20 pointer-events-none z-10" />

                                        {/* Minimal OS Chrome */}
                                        <div className="absolute top-10 left-12 flex gap-3 z-30">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-3.5 h-3.5 rounded-full ${i === 1 ? 'bg-red-500/50' : i === 2 ? 'bg-yellow-500/50' : 'bg-green-500/50'} shadow-glow-sm`} />
                                            ))}
                                        </div>
                                    </div>
                                </Card>

                                {/* Floating Holographic Data Projection 1 */}
                                <motion.div
                                    style={{
                                        translateZ: 100,
                                        y: [0, -40, 0]
                                    }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-16 -right-12 p-8 rounded-[40px] bg-white/[0.03] backdrop-blur-3xl border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-40 flex items-center gap-6 group hover:border-primary-500/50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-gradient-primary rounded-[22px] flex items-center justify-center shadow-glow-premium group-hover:rotate-12 transition-transform">
                                        <FiTrendingUp className="text-white w-8 h-8" />
                                    </div>
                                    <div className="pr-4">
                                        <p className="text-[11px] font-black text-primary-400 uppercase tracking-[0.4em] mb-2 leading-none">Neural Load</p>
                                        <p className="text-4xl font-black text-white tracking-tighter leading-none">+124.5%</p>
                                    </div>
                                </motion.div>

                                {/* Floating Holographic Data Projection 2 */}
                                <motion.div
                                    style={{
                                        translateZ: 80,
                                        y: [0, 40, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-20 -left-16 p-7 rounded-[40px] bg-gray-950/90 backdrop-blur-3xl border border-white/10 shadow-premium z-40 flex items-center gap-6 group hover:border-emerald-500/50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-[22px] flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                        <FiUsers className="w-8 h-8" />
                                    </div>
                                    <div className="pr-10">
                                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 leading-none">Global Sync</p>
                                        <p className="text-3xl font-black text-white tracking-tighter leading-none">4,382 Live</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Large Orbital Background Rims */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%] opacity-[0.08] pointer-events-none z-0">
                            <div className="absolute inset-0 border-[2px] border-dashed border-primary-500/30 rounded-full rotate-center" style={{ animationDuration: '80s' }} />
                            <div className="absolute inset-[15%] border-[1.5px] border-white/10 rounded-full animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;
