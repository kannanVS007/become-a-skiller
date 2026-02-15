/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f7ff',
                    100: '#bae7ff',
                    200: '#91d5ff',
                    300: '#69c0ff',
                    400: '#40a9ff',
                    500: '#00A8E8', // Logo cyan
                    600: '#0087c7',
                    700: '#0066a6',
                    800: '#004585',
                    900: '#002964',
                },
                blue: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#2563EB', // Enterprise blue
                    600: '#1d4ed8',
                    700: '#1e40af',
                    800: '#1e3a8a',
                    900: '#1e293b',
                },
                secondary: {
                    50: '#f0ebff',
                    100: '#d6c8ff',
                    200: '#bda5ff',
                    300: '#a382ff',
                    400: '#8a5fff',
                    500: '#7B68EE', // Logo purple
                    600: '#6350d4',
                    700: '#4b38ba',
                    800: '#3320a0',
                    900: '#1b0886',
                },
                accent: {
                    cyan: '#00D9FF',
                    purple: '#A855F7',
                    pink: '#EC4899',
                    orange: '#F97316',
                },
                success: {
                    50: '#f0fdf4',
                    500: '#10B981',
                    600: '#059669',
                },
                warning: {
                    50: '#fffbeb',
                    500: '#F59E0B',
                    600: '#D97706',
                },
                danger: {
                    50: '#fef2f2',
                    500: '#EF4444',
                    600: '#DC2626',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 168, 232, 0.3)',
                'glow-lg': '0 0 40px rgba(0, 168, 232, 0.4)',
                'glow-purple': '0 0 20px rgba(123, 104, 238, 0.3)',
                'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'premium': '0 20px 60px rgba(0, 0, 0, 0.15)',
                'enterprise': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
                'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
            },
            backdropBlur: {
                xs: '2px',
                '3xl': '64px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(210, 100%, 56%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270, 70%, 60%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(195, 100%, 50%, 0.3) 0px, transparent 50%)',
                'gradient-mesh-dark': 'radial-gradient(at 40% 20%, hsla(210, 100%, 56%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270, 70%, 60%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(195, 100%, 50%, 0.15) 0px, transparent 50%)',
                'gradient-primary': 'linear-gradient(135deg, #00A8E8 0%, #2563EB 50%, #7B68EE 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #7B68EE 0%, #A855F7 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(0, 168, 232, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(123, 104, 238, 0.5)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '100': '25rem',
                '112': '28rem',
                '128': '32rem',
            },
        },
    },
    plugins: [],
}
