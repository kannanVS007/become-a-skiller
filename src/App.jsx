import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
import JobsPage from './pages/JobsPage';
import CourseDetails from './pages/CourseDetails';
import LearningPage from './pages/LearningPage';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CandidateDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import CreateCourse from './pages/trainer/CreateCourse';
import CreateJob from './pages/trainer/CreateJob';
import CompleteProfile from './pages/CompleteProfile';

import Home from './pages/Home';
import PageLoader from './components/ui/PageLoader';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user?.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

// Dashboard Wrapper
const DashboardPage = () => {
    const { user } = useAuth();

    if (user?.role === 'admin') {
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

const GOOGLE_CLIENT_ID = "362799383714-bq9pi8np8l288pv0c4rqmvl4ta59o6dt.apps.googleusercontent.com";

function App() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
                                    <Route path="/courses/:id" element={<RouteTransition><CourseDetails /></RouteTransition>} />
                                    <Route path="/blog" element={<RouteTransition><BlogPage /></RouteTransition>} />
                                    <Route path="/contact" element={<RouteTransition><ContactPage /></RouteTransition>} />
                                    <Route path="/jobs" element={<RouteTransition><JobsPage /></RouteTransition>} />
                                    <Route path="/login" element={<RouteTransition><Login /></RouteTransition>} />
                                    <Route path="/signup" element={<RouteTransition><SignUp /></RouteTransition>} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/cart" element={<RouteTransition><CartPage /></RouteTransition>} />
                                    <Route path="/checkout" element={<RouteTransition><CheckoutPage /></RouteTransition>} />
                                    <Route path="/success" element={<SuccessPage />} />
                                    <Route
                                        path="/complete-profile"
                                        element={
                                            <ProtectedRoute>
                                                <RouteTransition><CompleteProfile /></RouteTransition>
                                            </ProtectedRoute>
                                        }
                                    />

                                    {/* Protected Routes */}
                                    <Route
                                        path="/dashboard/users"
                                        element={
                                            <ProtectedRoute roles={['admin']}>
                                                <RouteTransition>
                                                    <UserManagement />
                                                </RouteTransition>
                                            </ProtectedRoute>
                                        }
                                    />
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
                                    <Route
                                        path="/trainer/create-course"
                                        element={
                                            <ProtectedRoute roles={['trainer', 'admin']}>
                                                <RouteTransition><CreateCourse /></RouteTransition>
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="/trainer/create-job"
                                        element={
                                            <ProtectedRoute roles={['trainer', 'admin']}>
                                                <RouteTransition><CreateJob /></RouteTransition>
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
        </GoogleOAuthProvider>
    );
}

export default App;
