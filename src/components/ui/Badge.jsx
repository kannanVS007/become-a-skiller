import React from 'react';

const Badge = ({
    children,
    variant = 'gradient',
    className = ''
}) => {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';

    const variants = {
        gradient: 'gradient-primary text-white',
        solid: 'bg-primary-500 text-white',
        outline: 'border border-primary-500 text-primary-500 dark:text-primary-400',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        danger: 'bg-red-500 text-white',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
