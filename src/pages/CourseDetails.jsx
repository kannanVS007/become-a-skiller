import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiBookOpen, FiStar, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RazorpayPayment from '../components/RazorpayPayment';
import api from '../services/api';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                if (data.success) {
                    setCourse(data.data);
                }
            } catch (err) {
                console.error('Error fetching course:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

    const handleSuccess = () => {
        navigate('/success');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            <section className="pt-32 pb-16 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    {/* Left Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-6 text-sm font-bold text-blue-600">
                            <span>Courses</span> <FiChevronRight /> <span>{course.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap gap-8 py-6 border-y border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                                    <FiStar className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Rating</p>
                                    <p className="font-black dark:text-white">{course.rating || '4.9'}/5.0</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl text-green-600">
                                    <FiClock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Duration</p>
                                    <p className="font-black dark:text-white">{course.duration || '12h 45m'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600">
                                    <FiBookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Modules</p>
                                    <p className="font-black dark:text-white">{course.modules?.length || 0} Lessons</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-2xl font-black mb-6 dark:text-white">What you'll learn</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.modules.slice(0, 4).map((mod, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <FiCheckCircle className="text-blue-600 w-5 h-5 mt-1 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{mod.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Purchase Card */}
                    <div className="lg:w-[400px] shrink-0">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-2xl border border-white dark:border-gray-800 sticky top-32">
                            <div className="relative rounded-3xl overflow-hidden mb-8 aspect-video">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-4xl font-black dark:text-white">₹{course.price}</span>
                                {course.oldPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">₹{course.oldPrice}</span>
                                )}
                                <span className="ml-auto text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs">
                                    Special Offer
                                </span>
                            </div>

                            <div className="space-y-4">
                                <RazorpayPayment
                                    amount={course.price}
                                    courseId={course._id}
                                    planName={course.title}
                                    onSuccess={handleSuccess}
                                />
                                <p className="text-center text-xs text-gray-400 font-medium">
                                    Secure 256-bit SSL encrypted payment.
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <p className="font-bold dark:text-white mb-4">This course includes:</p>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">✔ Full lifetime access</li>
                                    <li className="flex items-center gap-2">✔ Access on mobile and TV</li>
                                    <li className="flex items-center gap-2">✔ Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CourseDetails;
