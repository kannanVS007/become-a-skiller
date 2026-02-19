import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    required = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                </div>
            )}

            <div className="relative group">
                {/* Icon */}
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : isFocused ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                        <Icon className="w-5 h-5" />
                    </div>
                )}

                {/* Input Field */}
                <input
                    type={type === 'password' && showPassword ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        w-full px-4 py-4 rounded-2xl
                        ${Icon ? 'pl-12' : 'pl-6'}
                        bg-white dark:bg-gray-800
                        border-2 transition-all duration-300
                        ${error
                            ? 'border-red-500/50 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : isFocused
                                ? 'border-blue-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                : 'border-gray-100 dark:border-gray-800'
                        }
                        text-gray-900 dark:text-white
                        placeholder-gray-400 dark:placeholder-gray-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none font-medium
                    `}
                    {...props}
                />

                {/* Password Toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-500 font-bold flex items-center gap-1.5 px-1 mt-1"
                    >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;
