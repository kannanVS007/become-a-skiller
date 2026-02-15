import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
    tabs = [],
    defaultTab = 0,
    onChange,
    variant = 'underline', // 'underline' or 'pills'
    className = '',
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (index) => {
        setActiveTab(index);
        if (onChange) {
            onChange(index);
        }
    };

    return (
        <div className={className}>
            {/* Tab Headers */}
            <div className={`
                flex gap-2
                ${variant === 'underline'
                    ? 'border-b border-gray-200 dark:border-gray-700'
                    : 'bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl'
                }
            `}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`
                            relative px-6 py-3 font-medium transition-all duration-300
                            ${variant === 'underline'
                                ? 'rounded-t-lg'
                                : 'rounded-xl'
                            }
                            ${activeTab === index
                                ? variant === 'underline'
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-soft'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }
                        `}
                    >
                        {/* Icon */}
                        {tab.icon && (
                            <span className="inline-flex items-center gap-2">
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </span>
                        )}
                        {!tab.icon && tab.label}

                        {/* Badge */}
                        {tab.badge && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                                {tab.badge}
                            </span>
                        )}

                        {/* Underline Indicator */}
                        {variant === 'underline' && activeTab === index && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {tabs[activeTab]?.content}
                </motion.div>
            </div>
        </div>
    );
};

export default Tabs;
