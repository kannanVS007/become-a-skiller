import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Badge from './ui/Badge';

const Blog = () => {
    const featuredPosts = [
        {
            title: 'The Future of Web Development with AI Agents',
            category: 'Technology',
            author: 'Aura Skiller',
            date: 'May 12, 2024',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop',
            readTime: '8 min read'
        },
        {
            title: 'Mastering the Cloud: A Beginners Guide to Azure',
            category: 'Cloud',
            author: 'Cloud Master',
            date: 'May 10, 2024',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop',
            readTime: '12 min read'
        },
        {
            title: 'Psychology of Modern UI/UX Product Design',
            category: 'Design',
            author: 'Sarah Design',
            date: 'May 08, 2024',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop',
            readTime: '10 min read'
        }
    ];

    return (
        <section className="py-32 px-4 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Latest from <span className="text-gradient">Our Journal</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                            Expert insights, industry trends, and student success stories delivered weekly.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/blog">
                            <motion.button
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-lg group"
                            >
                                View All Articles
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full group-hover:bg-primary-500 group-hover:text-white transition-all">
                                    <FiArrowRight />
                                </div>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredPosts.map((post, idx) => (
                        <motion.div
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <Card className="h-full flex flex-col p-0 border-white/5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md overflow-hidden hover:shadow-premium transition-all duration-500">
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="gradient" className="text-[10px] uppercase font-bold tracking-widest">{post.category}</Badge>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="flex items-center gap-2 text-white text-xs font-semibold">
                                            <FiClock /> {post.readTime}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">{post.date}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-snug group-hover:text-primary-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center font-bold text-xs text-primary-500">
                                                {post.author[0]}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{post.author}</span>
                                        </div>
                                        <FiChevronRight className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
