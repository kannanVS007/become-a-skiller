import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiBook, FiActivity, FiArrowUpRight, FiMoreVertical } from 'react-icons/fi';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Chart from '../components/ui/Chart';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Users', value: '12,854', trend: '+18.2%', icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Revenue', value: '$84,250', trend: '+24.5%', icon: FiDollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Courses Active', value: '482', trend: '+5.1%', icon: FiBook, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Active Sessions', value: '1,205', trend: '+12.3%', icon: FiActivity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    const users = [
        { name: 'Alice Johnson', email: 'alice@example.com', role: 'Candidate', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=AJ&background=00A8E8&color=fff' },
        { name: 'Bob Smith', email: 'bob@example.com', role: 'Trainer', status: 'Pending', avatar: 'https://ui-avatars.com/api/?name=BS&background=7B68EE&color=fff' },
        { name: 'Charlie Davis', email: 'charlie@example.com', role: 'Candidate', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=CD&background=2563EB&color=fff' },
        { name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=DP&background=10B981&color=fff' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your platform metrics and users from one place.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                            Export Report
                        </button>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold shadow-glow hover:bg-primary-600 transition-all">
                            View Live Logs
                        </button>
                    </div>
                </div>

                {/* Stats Grid - Optimized for all screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-soft group hover:shadow-glow transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} bg-opacity-10 text-xl`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-lg text-[10px] font-black">
                                    <FiArrowUpRight /> {stat.trend}
                                </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
                            <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Area - Responsive Stack */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[40px] p-5 md:p-8 shadow-soft overflow-hidden"
                    >
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Revenue Growth</h3>
                        <div className="h-[240px] md:h-[300px] w-full">
                            <Chart data={[30, 45, 60, 55, 80, 75, 95]} height="100%" color="#10B981" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[40px] p-5 md:p-8 shadow-soft overflow-hidden"
                    >
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">User Acquisition</h3>
                        <div className="h-[240px] md:h-[300px] w-full">
                            <Chart data={[20, 35, 30, 50, 40, 60, 55]} height="100%" color="#00A8E8" />
                        </div>
                    </motion.div>
                </div>

                {/* User Management Table Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-soft overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent User Activity</h3>
                        <button className="text-primary-500 text-sm font-bold hover:underline">View All Users</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {users.map((user, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                                                    <p className="text-[11px] text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-400">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                                <FiMoreVertical className="text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
