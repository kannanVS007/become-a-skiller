import React from 'react';
import { FiSearch, FiBell, FiMessageSquare, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardTopBar = ({ collapsed, setCollapsed, setMobileOpen, isMobile }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
            {/* Left Section: Search & Mobile Toggle */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                {isMobile && (
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                )}
                <div className="relative w-full hidden sm:block">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for courses, jobs, or users..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    />
                </div>
                {isMobile && (
                    <button className="sm:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
                        <FiSearch className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Notifications - Hidden on very small screens or compact */}
                <button className="hidden xs:flex p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
                    <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-500" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                </button>

                {/* Messages - Hidden on very small screens */}
                <button className="hidden xs:flex p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group">
                    <FiMessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-500" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                </button>

                {/* Divider */}
                <div className="hidden xs:block w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1 md:mx-2"></div>

                {/* User Profile Info */}
                <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {user?.name}
                        </p>
                        <p className="text-[11px] font-medium text-primary-500 uppercase tracking-wider">
                            {user?.role}
                        </p>
                    </div>
                    <img
                        src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=00A8E8&color=fff'}
                        alt="User"
                        className="w-10 h-10 rounded-xl border-2 border-primary-500/20 object-cover"
                    />
                </div>
            </div>
        </header>
    );
};

export default DashboardTopBar;
