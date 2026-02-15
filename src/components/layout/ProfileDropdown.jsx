import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiLogOut, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../ui/Badge';

const ProfileDropdown = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();

    const roleLabels = {
        student: '🎓 Student',
        trainer: '👨‍🏫 Trainer',
        company: '🏢 Company',
        tuition: '📚 Tuition Master',
    };

    const menuItems = [
        { icon: FiGrid, label: 'Dashboard', to: '/dashboard' },
        { icon: FiUser, label: 'Profile', to: '/profile' },
        { icon: FiSettings, label: 'Settings', to: '/settings' },
    ];

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />

                    {/* Dropdown */}
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-enterprise border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                        {/* User Info */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=00A8E8&color=fff'}
                                    alt={user?.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            {user?.role && (
                                <div className="mt-3">
                                    <Badge variant="gradient" className="text-xs">
                                        {roleLabels[user.role] || user.role}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-xl transition-colors"
                            >
                                <FiLogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileDropdown;
