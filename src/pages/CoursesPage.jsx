import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/ui/CourseCard';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const CoursesPage = () => {
    const { addToCart } = useCart();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortOption, setSortOption] = useState('Newest');

    const categories = ['All', 'Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'AI & Machine Learning'];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get('/courses');
                if (data.success) {
                    setCourses(data.data);
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const sortOptions = [
        { value: 'Newest', label: 'Newest First' },
        { value: 'Popular', label: 'Most Popular' },
        { value: 'PriceHigh', label: 'Price: High to Low' },
        { value: 'PriceLow', label: 'Price: Low to High' },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Explore Our <span className="text-blue-600">Premium Courses</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                        Elevate your career with industry-leading courses designed by experts.
                    </p>

                    <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-3 text-gray-900 dark:text-white"
                            />
                        </div>
                        <Select
                            options={sortOptions}
                            value={sortOption}
                            onChange={setSortOption}
                            className="!w-48 !rounded-2xl"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${activeCategory === cat
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} onAddToCart={addToCart} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <FiX className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="text-2xl font-bold dark:text-white">No courses found</h3>
                        <Button variant="primary" className="mt-6" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                            Reset All
                        </Button>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default CoursesPage;
