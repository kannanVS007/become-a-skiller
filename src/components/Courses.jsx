import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CourseCard from './ui/CourseCard';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Courses = () => {
    const { addToCart } = useCart();
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                if (data.success) {
                    // Get top 3 courses (or whatever criteria for "featured")
                    setFeaturedCourses(data.data.slice(0, 3));
                }
            } catch (err) {
                console.error('Failed to fetch featured courses', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <section className="py-32 px-4 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Featured <span className="text-gradient">Learning Paths</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                            Start your journey with our most popular and highly-rated courses.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/courses">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold flex items-center gap-2 shadow-premium hover:shadow-glow transition-all"
                            >
                                Explore All Courses
                                <FiArrowRight />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.length > 0 ? (
                            featuredCourses.map((course) => (
                                <div key={course._id}>
                                    <CourseCard
                                        course={course}
                                        onAddToCart={addToCart}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full text-gray-500">No featured courses available.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;
