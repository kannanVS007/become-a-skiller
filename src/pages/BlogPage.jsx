import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiClock, FiUser, FiArrowRight, FiTag } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Technology', 'Career', 'Learning Tips', 'Success Stories', 'Industry Trends'];

    const posts = [
        {
            id: 1,
            title: 'How to Build a World-Class Portfolio that Lands Senior Roles',
            excerpt: 'Learn the specific project structures and documentation techniques that elite recruiters look for in 2024.',
            author: 'Aura Skiller',
            date: 'May 12, 2024',
            readTime: '8 min read',
            category: 'Career',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
            isFeatured: true
        },
        {
            id: 2,
            title: 'The Future of Web Development with AI Agents',
            excerpt: 'Exploring how autonomous coding agents are transforming the way we build software and what it means for devs.',
            author: 'Dr. Dev',
            date: 'May 10, 2024',
            readTime: '12 min read',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'
        },
        {
            id: 3,
            title: 'Transitioning from Junior to Senior Software Engineer',
            excerpt: 'A comprehensive roadmap on the soft skills and technical depth required to level up your career.',
            author: 'Sarah Design',
            date: 'May 08, 2024',
            readTime: '15 min read',
            category: 'Career',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop'
        },
        {
            id: 4,
            title: 'Designing with Empathy: User-Centric Principles',
            excerpt: 'Why emotional connection is the secret ingredient to high-converting product designs.',
            author: 'Sarah Design',
            date: 'May 05, 2024',
            readTime: '6 min read',
            category: 'Industry Trends',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop'
        },
        {
            id: 5,
            title: 'Mastering the Cloud: A Beginners Guide to Azure',
            excerpt: 'Everything you need to know to start your journey into Microsoft Cloud ecosystem.',
            author: 'Cloud Master',
            date: 'May 01, 2024',
            readTime: '10 min read',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop'
        }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = posts.find(p => p.isFeatured);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Header Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh-dark dark:bg-gradient-mesh opacity-20"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Insights & <span className="text-gradient">Innovations</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Stay updated with the latest trends in tech, career growth, and educational excellence.
                        </p>
                    </motion.div>

                    {/* Featured Post Card */}
                    {featuredPost && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-6xl mx-auto mb-20"
                        >
                            <Card className="flex flex-col lg:flex-row overflow-hidden p-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border-white/10 dark:border-white/5 shadow-2xl group">
                                <div className="lg:w-1/2 overflow-hidden h-[300px] lg:h-auto">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Badge variant="gradient">{featuredPost.category}</Badge>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{featuredPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-primary-500 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 text-lg">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center font-bold text-primary-500">
                                                {featuredPost.author[0]}
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">{featuredPost.author}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold"
                                        >
                                            Read More <FiArrowRight />
                                        </motion.button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Filters and Search */}
                    <div className="max-w-5xl mx-auto mb-16 px-4">
                        <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b dark:border-white/5 pb-8">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                                                ? 'bg-primary-600 text-white'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                        {filteredPosts.filter(p => !p.isFeatured).map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <Card className="h-full flex flex-col p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-white/10 dark:border-white/5">
                                    <div className="h-48 overflow-hidden rounded-2xl mb-6">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{post.category}</Badge>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-primary-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <FiClock className="w-3 h-3 text-gray-400" />
                                            <span className="text-[10px] font-medium text-gray-500">{post.readTime}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ x: 3 }}
                                            className="text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center gap-1"
                                        >
                                            Read <FiArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-20 text-center">
                        <button className="px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-full font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-premium">
                            Explore More Articles
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogPage;
