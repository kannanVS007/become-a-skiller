import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiChevronDown, FiX, FiCheck } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/ui/CourseCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CoursesPage = () => {
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState('Newest');

    const categories = ['All', 'Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'AI & Machine Learning'];

    const mockCourses = [
        {
            id: 1,
            title: 'Mastering Advanced React with Framer Motion',
            instructor: 'Aura Skiller',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Aura+Skiller&background=00A8E8&color=fff',
            rating: 4.9,
            reviews: 1205,
            price: 89,
            oldPrice: 129,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
            duration: '12h 45m',
            lessons: 48,
            category: 'Web Development',
            level: 'Advanced'
        },
        {
            id: 2,
            title: 'Full-Stack Enterprise Node.js Architecture',
            instructor: 'Dr. Dev',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Dr+Dev&background=2563EB&color=fff',
            rating: 4.8,
            reviews: 840,
            price: 119,
            oldPrice: 199,
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop',
            duration: '18h 30m',
            lessons: 64,
            category: 'Web Development',
            level: 'Intermediate'
        },
        {
            id: 3,
            title: 'Psychology of Modern UI/UX Product Design',
            instructor: 'Sarah Design',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Design&background=7B68EE&color=fff',
            rating: 4.9,
            reviews: 2100,
            price: 75,
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
            duration: '10h 15m',
            lessons: 32,
            category: 'UI/UX Design',
            level: 'Beginner'
        },
        {
            id: 4,
            title: 'Predictive Analytics with Python & Scikit-Learn',
            instructor: 'Data Mike',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Data+Mike&background=10B981&color=fff',
            rating: 4.7,
            reviews: 560,
            price: 149,
            oldPrice: 249,
            image: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?w=800&auto=format&fit=crop',
            duration: '22h 10m',
            lessons: 92,
            category: 'Data Science',
            level: 'Intermediate'
        },
        {
            id: 5,
            title: 'AWS Certified Solutions Architect Training',
            instructor: 'Cloud Master',
            instructorAvatar: 'https://ui-avatars.com/api/?name=Cloud+Master&background=F59E0B&color=fff',
            rating: 4.9,
            reviews: 3200,
            price: 129,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
            duration: '25h 00m',
            lessons: 110,
            category: 'Cloud Computing',
            level: 'Advanced'
        },
        {
            id: 6,
            title: 'Deep Learning with Neural Networks',
            instructor: 'AI Expert',
            instructorAvatar: 'https://ui-avatars.com/api/?name=AI+Expert&background=EF4444&color=fff',
            rating: 4.8,
            reviews: 430,
            price: 199,
            oldPrice: 299,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
            duration: '30h 20m',
            lessons: 124,
            category: 'AI & Machine Learning',
            level: 'Advanced'
        },
    ];

    const sortOptions = [
        { value: 'Newest', label: 'Newest First' },
        { value: 'Popular', label: 'Most Popular' },
        { value: 'PriceHigh', label: 'Price: High to Low' },
        { value: 'PriceLow', label: 'Price: Low to High' },
    ];

    const filteredCourses = mockCourses.filter(course => {
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Header Section with Mesh Background */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh-dark dark:bg-gradient-mesh opacity-30"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase mb-4 border border-primary-500/20"
                        >
                            Knowledge Hub
                        </motion.span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Explore Our <span className="text-gradient">Premium Courses</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Elevate your career with industry-leading courses designed by experts.
                            Interactive learning, real projects, global certification.
                        </p>
                    </motion.div>

                    {/* Search and Filters Bar */}
                    <div className="max-w-4xl mx-auto mb-10">
                        <div className="flex flex-col md:flex-row gap-4 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-enterprise rounded-3xl">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for courses, skills, or instructors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 rounded-2xl"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full md:w-48">
                                    <Select
                                        options={sortOptions}
                                        value={sortOption}
                                        onChange={setSortOption}
                                        className="!py-3 !rounded-2xl"
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    className="!rounded-2xl hidden md:flex"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <FiFilter className="mr-2" /> Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-soft border relative overflow-hidden group ${activeCategory === cat
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
                                    : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-800 hover:border-primary-500/50'
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity"
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Desktop Sidebar Filter (Visible on LG) */}
                        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Level</h3>
                                <div className="space-y-3">
                                    {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                        <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-primary-500 transition-colors">
                                                <FiCheck className="text-primary-500 opacity-0 group-hover:opacity-30" />
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">{lvl}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Price</h3>
                                <div className="space-y-3">
                                    {['Free', 'Paid ($1-50)', 'Premium ($50+)'].map(prc => (
                                        <label key={prc} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-primary-500 opacity-0 group-hover:opacity-30"></div>
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">{prc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-primary-600 to-blue-600 rounded-3xl text-white">
                                <h4 className="text-xl font-bold mb-2">Want a custom plan?</h4>
                                <p className="text-white/80 text-sm mb-4">Contact our team for bulk pricing or custom training for your company.</p>
                                <Button variant="ghost" className="bg-white/20 hover:bg-white/30 !w-full !text-white border-white/30">
                                    Get Quote
                                </Button>
                            </div>
                        </aside>

                        {/* Grid Content */}
                        <div className="flex-1">
                            {filteredCourses.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid md:grid-cols-2 xl:grid-cols-2 gap-8"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredCourses.map((course, idx) => (
                                            <motion.div
                                                key={course.id}
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                                layout
                                            >
                                                <CourseCard
                                                    course={course}
                                                    onAddToCart={addToCart}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                        <FiX className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query.</p>
                                    <Button variant="primary" className="mt-6" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
                                        Reset All
                                    </Button>
                                </div>
                            )}

                            {/* Load More Area */}
                            {filteredCourses.length > 0 && (
                                <div className="mt-20 flex justify-center">
                                    <Button variant="secondary" size="lg" className="!px-12 !rounded-2xl">
                                        Load More Courses
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CoursesPage;
