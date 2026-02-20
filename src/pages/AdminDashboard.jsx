import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers, FiDollarSign, FiBook, FiActivity,
    FiArrowUpRight, FiMoreVertical, FiTrendingUp,
    FiZap, FiTarget, FiGlobe, FiPieChart
} from 'react-icons/fi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

import api from '../services/api';

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStatsData(data.data);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            label: 'Total Revenue',
            value: statsData?.financial?.revenue != null
                ? `₹${Number(statsData.financial.revenue).toLocaleString()}`
                : '₹0',
            trend: '+12.5%',
            icon: FiDollarSign,
            color: 'from-blue-500 to-cyan-400'
        },
        {
            label: 'Total Users',
            value: statsData?.users?.total != null ? statsData.users.total.toLocaleString() : '0',
            trend: `+${statsData?.users?.active ?? 0} Active`,
            icon: FiUsers,
            color: 'from-purple-500 to-pink-500'
        },
        {
            label: 'Total Courses',
            value: statsData?.content?.courses ?? '0',
            trend: '+2 New',
            icon: FiBook,
            color: 'from-emerald-400 to-teal-500'
        },
        {
            label: 'Learning Hours',
            value: statsData?.learning?.totalHours != null
                ? statsData.learning.totalHours.toLocaleString()
                : '0',
            trend: '+15.3%',
            icon: FiActivity,
            color: 'from-amber-400 to-orange-500'
        },
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
                        {/* Real Recharts Revenue AreaChart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 backdrop-blur-3xl shadow-premium relative overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Revenue Trajectory</h3>
                                    <p className="text-gray-500 text-sm font-medium">Monthly revenue growth</p>
                                </div>
                                <div className="flex gap-2">
                                    {['7D', '30D', '90D'].map(period => (
                                        <button key={period} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${period === '30D' ? 'bg-primary-500 text-white shadow-glow' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart
                                    data={[
                                        { month: 'Sep', revenue: 12000 },
                                        { month: 'Oct', revenue: 18500 },
                                        { month: 'Nov', revenue: 15200 },
                                        { month: 'Dec', revenue: 28900 },
                                        { month: 'Jan', revenue: 22400 },
                                        { month: 'Feb', revenue: statsData?.financial?.revenue ?? 31000 },
                                    ]}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00A8E8" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#00A8E8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="month" stroke="#555" tick={{ fill: '#888', fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                                        cursor={{ stroke: 'rgba(0,168,232,0.3)', strokeWidth: 2 }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#00A8E8" strokeWidth={3} fill="url(#revenueGrad)" dot={{ r: 5, fill: '#00A8E8', strokeWidth: 0 }} activeDot={{ r: 7, fill: '#00A8E8' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Recharts PieChart – User Demographics */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 backdrop-blur-3xl shadow-premium flex flex-col relative overflow-hidden"
                        >
                            <h3 className="text-2xl font-black text-white mb-6 tracking-tight">User Distribution</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Students', value: statsData?.users?.students ?? 60 },
                                            { name: 'Trainers', value: statsData?.users?.trainers ?? 25 },
                                            { name: 'Blocked', value: Math.max(0, (statsData?.users?.total ?? 85) - (statsData?.users?.active ?? 80)) },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        <Cell fill="#00A8E8" />
                                        <Cell fill="#7B68EE" />
                                        <Cell fill="#ef4444" />
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                                    />
                                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: '#aaa', fontSize: 11, fontWeight: 700 }}>{v}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
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
                                        {statsData && statsData.recentPayments.map((payment, i) => (
                                            <tr key={payment._id || i} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-primary p-[1px]">
                                                            <div className="w-full h-full bg-gray-950 rounded-[15px] flex items-center justify-center font-black text-white uppercase">
                                                                {payment.user?.name?.charAt(0) || 'U'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors">{payment.user?.name || 'Unknown User'}</p>
                                                            <p className="text-[10px] text-gray-500 font-medium">{payment.user?.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg text-gray-400">
                                                        {payment.courseId ? 'Course Purchase' : 'Subscription'}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-current text-emerald-400`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-400`}>{payment.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <span className="text-sm font-black text-white">₹{payment.amount}</span>
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
