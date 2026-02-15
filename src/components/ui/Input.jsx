import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

    const hasValue = value && value.length > 0;
    const isFloating = isFocused || hasValue;

    return (
        <div className={`relative ${className}`}>
            {/* Floating Label */}
            {label && (
                <motion.label
                    animate={{
                        top: isFloating ? '0.5rem' : '1rem',
                        fontSize: isFloating ? '0.75rem' : '1rem',
                        color: error
                            ? '#EF4444'
                            : isFocused
                                ? '#00A8E8'
                                : 'currentColor',
                    }}
                    className={`absolute left-3 pointer-events-none transition-colors ${Icon ? 'pl-8' : ''
                        } ${isFloating ? 'text-xs' : 'text-base'}`}
                >
                    {label}
                    {required && <span className="text-danger-500 ml-1">*</span>}
                </motion.label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Icon */}
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                    placeholder={isFloating ? placeholder : ''}
                    className={`
                        w-full px-4 py-3 rounded-2xl
                        ${Icon ? 'pl-11' : ''}
                        ${label ? 'pt-6 pb-2' : ''}
                        bg-white dark:bg-gray-800
                        border-2 transition-all duration-300
                        ${error
                            ? 'border-danger-500 focus:border-danger-500'
                            : isFocused
                                ? 'border-primary-500 focus:border-primary-500'
                                : 'border-gray-200 dark:border-gray-700'
                        }
                        ${isFocused ? 'shadow-glow' : 'shadow-soft'}
                        text-gray-900 dark:text-white
                        placeholder-gray-400
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none
                    `}
                    {...props}
                />

                {/* Password Toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-danger-500 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
