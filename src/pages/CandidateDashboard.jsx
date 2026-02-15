import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Chart from '../components/ui/Chart';

const CandidateDashboard = () => {
    const stats = [
        { label: 'Applied Jobs', value: '42', icon: FiBriefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Interviews', value: '18', icon: FiClock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Offers Received', value: '5', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Profile Views', value: '1,284', icon: FiTrendingUp, color: 'text-primary-500', bg: 'bg-primary-500/10' },
    ];

    const recentApplications = [
        { company: 'Google', role: 'Senior React Developer', date: '2 days ago', status: 'In Review', color: 'bg-yellow-500/10 text-yellow-600' },
        { company: 'Meta', role: 'UI/UX Designer', date: '5 days ago', status: 'Selected', color: 'bg-green-500/10 text-green-600' },
        { company: 'Amazon', role: 'Cloud Architect', date: '1 week ago', status: 'Declined', color: 'bg-red-500/10 text-red-600' },
        { company: 'Spotify', role: 'Fullstack Engineer', date: '2 weeks ago', status: 'Completed', color: 'bg-blue-500/10 text-blue-600' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidate Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening with your applications.</p>
                </div>

                {/* Stats Grid - Optimized for all screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-soft group hover:shadow-glow transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] md:text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full whitespace-nowrap">+12.5%</span>
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
                            <div className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Sections - Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Activity Chart - Flexible Height */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-5 md:p-8 shadow-soft overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Profile Analytics</h3>
                                <p className="text-xs font-bold text-gray-400">Visibility over the last 6 months</p>
                            </div>
                            <select className="bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500/20 cursor-pointer">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div className="h-[240px] md:h-[300px] w-full">
                            <Chart data={[45, 78, 52, 90, 65, 85]} height="100%" />
                        </div>
                    </motion.div>

                    {/* Recent Applications - Mobile list optimization */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-5 md:p-8 shadow-soft"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity</h3>
                            <button className="text-primary-500 font-bold text-xs hover:underline uppercase tracking-widest">See All</button>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            {recentApplications.map((app, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-bold text-primary-500 border border-gray-100 dark:border-gray-700 group-hover:bg-primary-500 group-hover:text-white transition-all shadow-sm">
                                        {app.company[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-gray-900 dark:text-white truncate">{app.role}</h4>
                                        <p className="text-[10px] md:text-[11px] font-bold text-gray-400 truncate">{app.company} • {app.date}</p>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1.5 rounded-lg hidden sm:block ${app.color}`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary-500 hover:text-white transition-all border border-transparent hover:shadow-glow-sm">
                            Browse More Jobs
                        </button>
                    </motion.div>
                </div>

                {/* Subscription / Plan Promo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-gradient-mesh-dark dark:bg-gradient-mesh rounded-[40px] border border-white/5 relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div>
                            <h2 className="text-2xl font-black text-white mb-2">Upgrade to Pro for Unlimited Jobs</h2>
                            <p className="text-blue-100/70 max-w-lg">Get priority placement in recruiter searches, direct messaging, and advanced AI matching tools.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform whitespace-nowrap">
                            Upgrade Now - $19/mo
                        </button>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default CandidateDashboard;
