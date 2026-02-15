import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CourseCard from './ui/CourseCard';
import { useCart } from '../context/CartContext';

const Courses = () => {
    const { addToCart } = useCart();

    const featuredCourses = [
        {
            id: 1,
            title: 'Mastering Advanced React with Framer Motion',
            instructor: 'Aura Skiller',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Aura+Skiller&background=00A8E8&color=fff',
            rating: 4.9,
            price: 89,
            oldPrice: 129,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
            duration: '12h 45m',
            lessons: 48,
            category: 'Web Development'
        },
        {
            id: 2,
            title: 'Full-Stack Enterprise Node.js Architecture',
            instructor: 'Dr. Dev',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Dr+Dev&background=2563EB&color=fff',
            rating: 4.8,
            price: 119,
            oldPrice: 199,
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop',
            duration: '18h 30m',
            lessons: 64,
            category: 'Web Development'
        },
        {
            id: 3,
            title: 'Psychology of Modern UI/UX Product Design',
            instructor: 'Sarah Design',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Design&background=7B68EE&color=fff',
            rating: 4.9,
            price: 75,
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
            duration: '10h 15m',
            lessons: 32,
            category: 'UI/UX Design'
        }
    ];

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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCourses.map((course, idx) => (
                        <div key={course.id}>
                            <CourseCard
                                course={course}
                                onAddToCart={addToCart}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
