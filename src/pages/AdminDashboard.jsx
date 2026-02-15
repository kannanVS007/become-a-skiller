import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers, FiDollarSign, FiBook, FiActivity,
    FiArrowUpRight, FiMoreVertical, FiTrendingUp,
    FiZap, FiTarget, FiGlobe, FiPieChart
} from 'react-icons/fi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$84,250', trend: '+24.5%', icon: FiDollarSign, color: 'from-blue-500 to-cyan-400' },
        { label: 'Platform Users', value: '12,854', trend: '+18.2%', icon: FiUsers, color: 'from-purple-500 to-pink-500' },
        { label: 'Active Courses', value: '482', trend: '+5.1%', icon: FiBook, color: 'from-emerald-400 to-teal-500' },
        { label: 'Live Sessions', value: '1,205', trend: '+12.3%', icon: FiActivity, color: 'from-amber-400 to-orange-500' },
    ];

    return (
        <DashboardLayout>
            <div className="relative min-h-screen pb-20">
                {/* mesh background for dashboard */}
                <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none -z-10 rounded-[40px]" />

                {/* Orbiting Circles Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none -z-10">
                    <div className="absolute inset-0 border-2 border-dashed border-primary-500/30 rounded-full rotate-center" />
                    <div className="absolute inset-[15%] border-2 border-dashed border-purple-500/20 rounded-full rotate-center-reverse" />
                </div>

                <div className="space-y-10 relative z-10">
                    {/* Header with Kinetic Text */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Command Center</span>
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                Performance <br />
                                <span className="text-gradient">Intelligence Hub</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-3 sm:gap-4"
                        >
                            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-xl">
                                System Logs
                            </button>
                            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-primary-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-glow-premium hover:bg-primary-600 transition-all">
                                Action Hub
                            </button>
                        </motion.div>
                    </div>

                    {/* Stats Grid - Hyper Premium 3D Feel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-[32px]`} />
                                <Card className="h-full p-8 bg-white/[0.03] border-white/10 hover:border-primary-500/50 transition-all duration-500 rounded-[32px] overflow-hidden flex flex-col items-start backdrop-blur-3xl shadow-premium">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-3.5 mb-6 shadow-glow-premium group-hover:rotate-12 transition-all duration-500`}>
                                        <stat.icon className="w-full h-full text-white" />
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
                                        <FiTrendingUp /> {stat.trend}
                                    </div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                                        {stat.label}
                                    </div>

                                    {/* Subtle Index BG */}
                                    <span className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02] select-none italic">
                                        0{i + 1}
                                    </span>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Charts Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Interactive Growth Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 backdrop-blur-3xl shadow-premium relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Revenue Trajectory</h3>
                                    <p className="text-gray-500 text-sm font-medium">Real-time fiscal intelligence</p>
                                </div>
                                <div className="flex gap-2">
                                    {['7D', '30D', '90D'].map(period => (
                                        <button key={period} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${period === '30D' ? 'bg-primary-500 text-white shadow-glow' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[300px] md:h-[400px] flex items-end gap-2 sm:gap-4 relative">
                                {/* Visual Mock Chart Bars */}
                                {[40, 60, 45, 90, 65, 80, 55, 100, 75, 85].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: 'easeOut' }}
                                        className="flex-1 bg-gradient-to-t from-primary-500/20 to-primary-500 rounded-2xl relative group cursor-pointer"
                                    >
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-3 py-1.5 rounded-lg text-xs font-black shadow-premium whitespace-nowrap z-20">
                                            ${h * 120}
                                        </div>
                                    </motion.div>
                                ))}
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                                    {[1, 2, 3, 4, 5].map(l => <div key={l} className="w-full h-[1px] bg-white" />)}
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive 3D Pie/Donut Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 backdrop-blur-3xl shadow-premium flex flex-col items-center justify-center relative overflow-hidden"
                        >
                            <h3 className="text-2xl font-black text-white mb-10 tracking-tight self-start">User Logistics</h3>

                            {/* 3D Moving Doughnut Mockup using SVGs and Framer */}
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-10">
                                <motion.svg
                                    viewBox="0 0 100 100"
                                    className="w-full h-full drop-shadow-[0_0_30px_rgba(0,168,232,0.3)]"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                >
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="15" />
                                    <motion.circle
                                        cx="50" cy="50" r="40"
                                        fill="transparent"
                                        stroke="url(#donut-grad)"
                                        strokeWidth="15"
                                        strokeDasharray="251.2"
                                        initial={{ strokeDashoffset: 251.2 }}
                                        animate={{ strokeDashoffset: 60 }}
                                        transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#00A8E8" />
                                            <stop offset="100%" stopColor="#7B68EE" />
                                        </linearGradient>
                                    </defs>
                                </motion.svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-white tracking-tighter">78%</span>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Efficiency</span>
                                </div>

                                {/* Orbiting Dot */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-20px] pointer-events-none"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full shadow-glow-premium border-4 border-gray-950" />
                                </motion.div>
                            </div>

                            <div className="space-y-4 w-full">
                                {[
                                    { label: 'Candidates', value: '62%', color: 'bg-primary-500' },
                                    { label: 'Trainers', value: '28%', color: 'bg-purple-500' },
                                    { label: 'Enterprise', value: '10%', color: 'bg-emerald-500' }
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                            <span className="text-xs font-bold text-gray-400">{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Secondary Row: Activity & Data */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-full bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-premium"
                        >
                            <div className="px-6 sm:px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-xl font-black text-white tracking-tight">Global Network Pulse</h3>
                                <button className="text-primary-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors self-start">
                                    Live Stream &rarr;
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                            <th className="px-10 py-6">Intelligence Profile</th>
                                            <th className="px-10 py-6">Engagement Role</th>
                                            <th className="px-10 py-6">Operational Status</th>
                                            <th className="px-10 py-6 text-right">Control</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { name: 'Sarah Connor', email: 'sarah@resistance.ai', role: 'Elite Candidate', status: 'Active', color: 'text-emerald-400' },
                                            { name: 'Nexus 6', email: 'nexus@tyrell.corp', role: 'Premium Trainer', status: 'Verification', color: 'text-amber-400' },
                                            { name: 'Bruce Wayne', email: 'bruce@wayne-ent.com', role: 'Enterprise Admin', status: 'High Threat', color: 'text-red-400' },
                                        ].map((user, i) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-primary p-[1px]">
                                                            <div className="w-full h-full bg-gray-950 rounded-[15px] flex items-center justify-center font-black text-white">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors">{user.name}</p>
                                                            <p className="text-[10px] text-gray-500 font-medium">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg text-gray-400">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-current ${user.color}`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.color}`}>{user.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <button className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all">
                                                        <FiMoreVertical className="text-gray-500" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
