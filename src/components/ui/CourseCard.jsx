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
        instructor,
        instructorAvatar,
        rating,
        reviews,
        price,
        oldPrice,
        image,
        duration,
        lessons,
        category
    } = course;

    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="group h-full"
        >
            <Card className="h-full flex flex-col p-4 overflow-hidden relative border-white/10 dark:border-white/5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md">
                {/* Image Container */}
                <Link to={`/courses/${_id || course.id}`} className="relative h-48 mb-4 rounded-2xl overflow-hidden block">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge variant="gradient" className="text-[10px] uppercase tracking-wider">
                            {category}
                        </Badge>
                        {discount > 0 && (
                            <Badge variant="danger" className="text-[10px] uppercase tracking-wider animate-pulse">
                                {discount}% OFF
                            </Badge>
                        )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-sm hover:bg-white/40 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                            View Details
                        </span>
                    </div>
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <img src={instructorAvatar} alt={instructor} className="w-6 h-6 rounded-full border border-primary-500/30" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiStar className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{rating || '4.9'}</span>
                        </div>
                    </div>

                    <Link to={`/courses/${_id || course.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-primary-500 transition-colors">
                            {title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                        <div className="flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {duration || '12h 45m'}
                        </div>
                        <div className="flex items-center gap-1">
                            <FiBookOpen className="w-3 h-3" />
                            {lessons || (course.modules?.length) || 0} Lessons
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            {oldPrice && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                    ₹{oldPrice}
                                </span>
                            )}
                            <span className="text-xl font-extrabold text-blue-600">
                                ₹{price}
                            </span>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onAddToCart && onAddToCart(course)}
                            className="p-3 bg-blue-600 text-white rounded-xl shadow-glow hover:shadow-glow-lg transition-all"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default CourseCard;
