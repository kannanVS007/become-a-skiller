import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiBookOpen, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from './Card';
import Badge from './Badge';

const CourseCard = ({ course, onAddToCart }) => {
    const {
        _id,
        title,
        trainer,
        rating,
        price,
        oldPrice,
        thumbnail,
        image,
        duration,
        category,
        modules
    } = course;

    // Fix: The API returns 'trainer' object with 'name' and 'email'
    const instructorName = trainer?.name || 'Expert Trainer';
    const instructorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&background=0D8ABC&color=fff`;
    const displayImage = thumbnail || image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
    const courseRating = course.ratings?.average || rating || 4.8;
    const lessonsCount = modules?.length || 0;

    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            className="group h-full"
        >
            <Card className="h-full flex flex-col p-5 overflow-hidden relative border-white/20 dark:border-white/5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-[2.5rem]">
                {/* Image Container with Glassmorphism Overlay */}
                <Link to={`/courses/${_id}`} className="relative h-56 mb-5 rounded-[2rem] overflow-hidden block">
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge variant="gradient" className="text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-600/90 border border-white/20">
                            {category}
                        </Badge>
                        {discount > 0 && (
                            <Badge variant="danger" className="text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full animate-pulse shadow-lg shadow-red-500/50">
                                {discount}% OFF
                            </Badge>
                        )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                        <span className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-sm shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                            Explore Course
                        </span>
                    </div>
                </Link>

                {/* Content Section */}
                <div className="flex-1 flex flex-col px-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={instructorAvatar} alt={instructorName} className="w-8 h-8 rounded-full border-2 border-blue-500/20 shadow-sm" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold tracking-tight">{instructorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                            <FiStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-black text-gray-800 dark:text-gray-100">{courseRating}</span>
                        </div>
                    </div>

                    <Link to={`/courses/${_id}`}>
                        <h3 className="text-xl font-extrabold text-gray-950 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                            {title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-5 text-[13px] text-gray-500 dark:text-gray-400 mb-6 font-bold uppercase tracking-tight">
                        <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4 text-blue-500" />
                            {duration || '12h 30m'}
                        </div>
                        <div className="flex items-center gap-2">
                            <FiBookOpen className="w-4 h-4 text-blue-500" />
                            {lessonsCount} Modules
                        </div>
                    </div>

                    {/* Price & Action with Premium Styling */}
                    <div className="mt-auto pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            {oldPrice && (
                                <span className="text-sm text-gray-400 dark:text-gray-500 line-through font-bold mb-0.5">
                                    ₹{oldPrice}
                                </span>
                            )}
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-blue-600 tracking-tighter">
                                    ₹{price}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">/ Lifetime</span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAddToCart && onAddToCart(course)}
                            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center hover:shadow-blue-500/50 transition-all duration-300 group/btn"
                        >
                            <FiShoppingCart className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default CourseCard;
