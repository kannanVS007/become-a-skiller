import React from 'react';
import { FiSearch, FiBell, FiMessageSquare, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardTopBar = ({ collapsed, setCollapsed, setMobileOpen, isMobile }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
            {/* Left Section: Search & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
                {isMobile && (
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                )}

                <div className="flex flex-col sm:hidden">
                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest leading-tight">
                        {user?.role === 'Admin' ? 'Admin' : 'Student'}
                    </span>
                    <h2 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                        Dashboard
                    </h2>
                </div>

                <div className="relative w-full hidden sm:block">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for courses, jobs, or users..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live System</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="hidden xs:flex w-11 h-11 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all border border-gray-100 dark:border-white/5 group relative">
                        <FiBell className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-500" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 shadow-glow"></span>
                    </button>

                    <button className="hidden xs:flex w-11 h-11 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all border border-gray-100 dark:border-white/5 group relative">
                        <FiMessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-500" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-gray-900 shadow-glow"></span>
                    </button>
                </div>

                <div className="w-px h-10 bg-gray-100 dark:bg-white/10 mx-1"></div>

                {/* User Profile Info */}
                <div className="flex items-center gap-2 sm:gap-3 pl-2 group cursor-pointer">
                    <div className="text-right">
                        <p className="text-[10px] sm:text-xs font-black text-gray-900 dark:text-white leading-none mb-1 group-hover:text-primary-500 transition-colors">
                            {user?.name?.split(' ')[0]}
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hidden xs:block">
                            {user?.role}
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            src={user?.avatar || '/img/default-avatar.svg'}
                            alt="User"
                            className="w-11 h-11 rounded-2xl border-2 border-primary-500/20 group-hover:border-primary-500 transition-all object-cover shadow-soft"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardTopBar;
