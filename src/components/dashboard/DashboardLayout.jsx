import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopBar from './DashboardTopBar';

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
            {/* Sidebar with mobile drawer logic */}
            <DashboardSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                isMobile={isMobile}
            />

            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {isMobile && mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
                    />
                )}
            </AnimatePresence>

            {/* Main Content Area - Responsive Padding */}
            <motion.main
                initial={false}
                animate={{
                    paddingLeft: isMobile ? '0px' : (collapsed ? '80px' : '260px')
                }}
                className="flex-1 flex flex-col min-h-screen transition-all duration-300 w-full overflow-x-hidden"
            >
                <DashboardTopBar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setMobileOpen={setMobileOpen}
                    isMobile={isMobile}
                />

                <div className="p-4 md:p-8 flex-1 w-full">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>

                {/* Dashboard Footer (Internal) */}
                <footer className="px-4 md:px-8 py-6 border-t border-gray-100 dark:border-gray-800 text-center text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-widest">
                    &copy; 2026 Become a Skiller. Professional Enterprise Dashboard.
                </footer>
            </motion.main>
        </div>
    );
};

export default DashboardLayout;
