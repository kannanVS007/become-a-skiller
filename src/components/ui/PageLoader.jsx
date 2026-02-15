import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Background mesh decoration */}
            <div className="absolute inset-0 mesh-gradient opacity-20 pointer-events-none" />

            {/* Orbiting Circles */}
            <div className="absolute w-[600px] h-[600px] opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-primary-500/30 rounded-full border-dashed"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[20%] border border-purple-500/20 rounded-full border-dashed"
                />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Logo with pulse */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="w-[240px] sm:w-[280px] h-16 sm:h-20 bg-white rounded-2xl p-4 shadow-glow-premium mb-8 flex items-center justify-center overflow-hidden"
                >
                    <img src="/img/logo.png" alt="Logo" className="w-[180px] sm:w-[220px] h-auto" />
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex gap-1.5 Items-center">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 bg-primary-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Kinetic line at bottom */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-glow-premium"
            />
        </div>
    );
};

export default PageLoader;
