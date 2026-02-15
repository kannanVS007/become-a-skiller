import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import Blog from './components/Blog';
import DashboardPreview from './components/DashboardPreview';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CandidateDashboard from './pages/CandidateDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';

import Home from './pages/Home';
import PageLoader from './components/ui/PageLoader';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <PageLoader />;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Dashboard Wrapper
const DashboardPage = () => {
    const { user } = useAuth();

    if (user?.role === 'Admin') {
        return <AdminDashboard />;
    }

    // Default to Candidate for Student
    return <CandidateDashboard />;
};

// Route Transition Wrapper
const RouteTransition = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = React.useState(true);
    const location = window.location.pathname;

    React.useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 800);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <PageLoader />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors overflow-x-hidden">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<RouteTransition><AboutPage /></RouteTransition>} />
                                <Route path="/courses" element={<RouteTransition><CoursesPage /></RouteTransition>} />
                                <Route path="/blog" element={<RouteTransition><BlogPage /></RouteTransition>} />
                                <Route path="/contact" element={<RouteTransition><ContactPage /></RouteTransition>} />
                                <Route path="/login" element={<RouteTransition><Login /></RouteTransition>} />
                                <Route path="/signup" element={<RouteTransition><SignUp /></RouteTransition>} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/cart" element={<RouteTransition><CartPage /></RouteTransition>} />
                                <Route path="/checkout" element={<RouteTransition><CheckoutPage /></RouteTransition>} />
                                <Route path="/success" element={<SuccessPage />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/dashboard/*"
                                    element={
                                        <ProtectedRoute>
                                            <RouteTransition>
                                                <DashboardPage />
                                            </RouteTransition>
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Catch all - redirect to home */}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
