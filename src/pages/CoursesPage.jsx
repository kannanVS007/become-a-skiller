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

    const categories = ['All', 'Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'AI & Machine Learning', 'Cyber Security'];

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
        { value: 'Newest', label: 'Latest Arrivals' },
        { value: 'Popular', label: 'Trending Now' },
        { value: 'PriceHigh', label: 'Premium (High to Low)' },
        { value: 'PriceLow', label: 'Entry Level (Low to High)' },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 transition-colors duration-500">
            <Navbar />

            {/* Premium Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                {/* Background accents */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent pointer-events-none" />
                <div className="absolute top-40 left-10 w-72 h-72 bg-blue-400/10 blur-[120px] rounded-full" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <Badge variant="gradient" className="mb-6 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10">
                            Knowledge Hub
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-tight">
                            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Potential</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                            Join thousands of learners mastering high-demand skills through our elite, industry-aligned curriculum.
                        </p>
                    </motion.div>

                    {/* Glassmorphism Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-5xl mx-auto mb-12 p-3 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border border-white dark:border-gray-800 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-4"
                    >
                        <div className="flex-1 relative group">
                            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 group-focus-within:scale-110 transition-transform" />
                            <input
                                type="text"
                                placeholder="What would you like to learn today?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 pl-14 pr-6 py-4 text-lg font-semibold text-gray-900 dark:text-white placeholder:text-gray-400"
                            />
                        </div>
                        <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block self-center" />
                        <Select
                            options={sortOptions}
                            value={sortOption}
                            onChange={setSortOption}
                            className="!w-full md:!w-64 !bg-transparent !border-none !text-lg !font-bold !py-4 focus:outline-none"
                        />
                    </motion.div>

                    {/* Category Pills with Smooth Scroll */}
                    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            {categories.map((cat, index) => (
                                <motion.button
                                    key={cat}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 transform hover:scale-105 ${activeCategory === cat
                                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 border-b-4 border-blue-800'
                                        : 'bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Courses Grid Section */}
            <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest">
                        Available Programs <span className="ml-3 text-blue-600">({filteredCourses.length})</span>
                    </h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-600/20 to-transparent ml-8 rounded-full" />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                        </div>
                        <p className="text-gray-500 font-black uppercase tracking-widest animate-pulse">Curating Excellence...</p>
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {filteredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} onAddToCart={addToCart} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-white/50 dark:bg-gray-900/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-800"
                    >
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FiX className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 italic">No matches for your search</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 text-lg">Try adjusting your filters to find your perfect course.</p>
                        <Button variant="primary" className="!px-12 !py-5 !text-lg !font-black !rounded-2xl" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                            Reset All Filters
                        </Button>
                    </motion.div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default CoursesPage;
