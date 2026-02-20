import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiSend, FiClock, FiCheck, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../services/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            await api.post('/enquiries', formData);
            setStatus('success');
            setShowModal(true);
            setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
            setTimeout(() => { setShowModal(false); setStatus('idle'); }, 4500);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email Us',
            value: 'vskannan4135@gmail.com',
            description: 'Our team typically responds within 2 hours.',
            color: 'text-primary-500'
        },
        {
            icon: FiPhone,
            label: 'Call Us',
            value: '+91 63795 24135',
            description: 'Mon-Sat from 9am to 6pm.',
            color: 'text-blue-500'
        },
        {
            icon: FiMapPin,
            label: 'Visit Us',
            value: 'Tirunelveli, Palayamkottai, Tamil Nadu, India',
            description: 'Come say hello at our office.',
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Success Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
                        >
                            <button onClick={() => { setShowModal(false); setStatus('idle'); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                                <FiX size={20} />
                            </button>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                                className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5"
                            >
                                <FiCheck className="w-10 h-10 text-green-500" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">We've received your enquiry and will get back to you within 2 hours.</p>
                            <div className="mt-6 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 4.5, ease: 'linear' }}
                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh dark:bg-gradient-mesh-dark opacity-30"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Have questions about our courses or corporate training? We're here to help you scale your skills.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg">
                                    Our dedicated support team is ready to assist you. Reach out through any of these
                                    channels or fill out the form for a personalized consultation.
                                </p>

                                <div className="space-y-8">
                                    {contactInfo.map((info, idx) => (
                                        <motion.div
                                            key={info.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex gap-6 p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-white/10 shadow-soft group hover:shadow-premium transition-all duration-300"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-premium ${info.color} group-hover:scale-110 transition-transform`}>
                                                <info.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{info.label}</h4>
                                                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">{info.value}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Office Hours */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[40px] bg-gradient-to-br from-primary-600 to-blue-700 text-white relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <FiClock className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Customer Support</h3>
                                        <p className="text-white/80">Available 24/7 for premium members</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8 md:p-12 relative overflow-hidden bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border-white/10 dark:border-white/5 shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                                    <FiMessageSquare className="text-primary-500" />
                                    Send us a message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <Input
                                            label="First Name"
                                            name="firstName"
                                            placeholder="Kannan"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            name="lastName"
                                            placeholder="VS"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-4 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Course Support</option>
                                            <option>Corporate Training</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-4 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[150px] resize-none"
                                            placeholder="Tell us how we can help..."
                                            required
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">{errorMsg}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full !rounded-2xl shadow-glow py-4"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Send Message <FiSend />
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
                                    By clicking "Send Message", you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map / Location */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="h-[320px] rounded-[40px] bg-gray-200 dark:bg-gray-800 relative overflow-hidden shadow-enterprise group">
                        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                                    <FiMapPin className="w-10 h-10 text-primary-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Office</h3>
                                <p className="text-gray-600 dark:text-gray-400">Palayamkottai, Tirunelveli, Tamil Nadu, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
