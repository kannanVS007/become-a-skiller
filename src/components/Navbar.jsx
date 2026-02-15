import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import ProfileDropdown from './layout/ProfileDropdown';

const Navbar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user } = useAuth();
    const { itemCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Courses', path: '/courses' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const visibleMenuItems = menuItems.filter(item =>
        !item.authRequired || (item.authRequired && isAuthenticated)
    );

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.img
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            src="/img/logo.png"
                            alt="Become a Skiller Logo"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {visibleMenuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative font-medium transition-colors ${location.pathname === item.path
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                                    }`}
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
                            aria-label="Search"
                        >
                            <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>

                        {/* Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
                            aria-label="Shopping Cart"
                        >
                            <FiShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Dashboard Link - High Visibility Pill */}
                        {isAuthenticated && (
                            <Link to="/dashboard" className="hidden lg:block">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-5 py-2 bg-primary-500/10 hover:bg-primary-500 text-primary-500 hover:text-white rounded-full text-sm font-bold border border-primary-500/20 transition-all shadow-glow-sm"
                                >
                                    Dashboard
                                </motion.div>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <FiSun className="w-5 h-5" />
                            ) : (
                                <FiMoon className="w-5 h-5" />
                            )}
                        </button>

                        {/* Auth Buttons / Profile */}
                        {isAuthenticated ? (
                            <div className="relative hidden lg:block" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-gray-100 dark:border-white/5"
                                >
                                    <div className="relative">
                                        <img
                                            src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=00A8E8&color=fff'}
                                            alt={user?.name}
                                            className="w-9 h-9 rounded-full border-2 border-primary-500"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
                                    </div>
                                    <div className="text-left leading-none">
                                        <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                                            {user?.name?.split(' ')[0]}
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">Verified</p>
                                    </div>
                                </button>
                                <ProfileDropdown
                                    isOpen={isProfileOpen}
                                    onClose={() => setIsProfileOpen(false)}
                                />
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-4">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="font-bold tracking-tight">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" size="sm" className="px-6 shadow-glow">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-gray-900 dark:text-white" />
                            ) : (
                                <FiMenu className="w-6 h-6 text-gray-900 dark:text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {visibleMenuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`block py-2 font-medium ${location.pathname === item.path
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                            <img
                                                src={user?.avatar}
                                                alt={user?.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {user?.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Link to="/profile">
                                            <Button variant="secondary" size="sm" className="w-full">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login" className="block">
                                            <Button variant="ghost" size="sm" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup" className="block">
                                            <Button variant="primary" size="sm" className="w-full">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
