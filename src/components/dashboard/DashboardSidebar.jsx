import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    FiHome, FiBriefcase, FiUser, FiSettings,
    FiLogOut, FiChevronLeft, FiPieChart, FiUsers,
    FiBookOpen, FiCreditCard, FiAward
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile }) => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const candidateLinks = [
        { name: 'Overview', path: '/dashboard', icon: FiHome },
        { name: 'My Jobs', path: '/dashboard/jobs', icon: FiBriefcase },
        { name: 'Courses', path: '/courses', icon: FiBookOpen },
        { name: 'Certificates', path: '/dashboard/certificates', icon: FiAward },
        { name: 'Payments', path: '/dashboard/payments', icon: FiCreditCard },
    ];

    const adminLinks = [
        { name: 'Admin Hub', path: '/dashboard', icon: FiPieChart },
        { name: 'User Management', path: '/dashboard/users', icon: FiUsers },
        { name: 'Course Control', path: '/dashboard/courses', icon: FiBookOpen },
        { name: 'Revenue', path: '/dashboard/revenue', icon: FiCreditCard },
        { name: 'Settings', path: '/dashboard/settings', icon: FiSettings },
    ];

    const links = user?.role === 'Admin' ? adminLinks : candidateLinks;

    return (
        <motion.aside
            initial={false}
            animate={{
                width: collapsed ? 80 : 260,
                x: isMobile ? (mobileOpen ? 0 : -260) : 0,
            }}
            className="fixed left-0 top-0 bottom-0 bg-[#0f172a] text-gray-400 z-50 overflow-hidden flex flex-col transition-all duration-300 shadow-2xl"
        >
            {/* Sidebar Header */}
            <div className="h-24 flex items-center px-6 border-b border-white/5 bg-white/[0.02]">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className={`rounded-2xl bg-white shadow-glow-premium group-hover:scale-105 transition-transform duration-500 flex items-center justify-center overflow-hidden transition-all duration-300 ${collapsed ? 'w-12 h-12 p-2' : 'w-full h-14 p-3 px-4'}`}>
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className={`h-auto transition-all ${collapsed ? 'w-10 min-w-[40px]' : 'w-full max-w-[180px]'}`}
                        />
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => isMobile && setMobileOpen(false)}
                        >
                            <motion.div
                                whileHover={{ x: 5 }}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-primary-500/10 text-primary-400'
                                    : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <link.icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : 'group-hover:text-primary-400'}`} />
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-medium whitespace-nowrap"
                                    >
                                        {link.name}
                                    </motion.span>
                                )}
                                {isActive && !collapsed && (
                                    <motion.div
                                        layoutId="activeSideNav"
                                        className="ml-auto w-1 h-5 bg-primary-400 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-white"
                >
                    <FiChevronLeft className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
                    {!collapsed && <span className="font-medium">Collapse</span>}
                </button>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-gray-400 hover:text-red-400"
                >
                    <FiLogOut className="w-5 h-5" />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default DashboardSidebar;
