import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiSend, FiClock, FiCheck } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email Us',
            value: 'hello@becomeskiller.com',
            description: 'Our team typically responds within 2 hours.',
            color: 'text-primary-500'
        },
        {
            icon: FiPhone,
            label: 'Call Us',
            value: '+1 (555) 000-0000',
            description: 'Mon-Fri from 8am to 5pm.',
            color: 'text-blue-500'
        },
        {
            icon: FiMapPin,
            label: 'Visit Us',
            value: '123 Tech Avenue, Silicon Valley',
            description: 'Come say hello at our headquarters.',
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

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
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Input
                                            label="First Name"
                                            placeholder="Jane"
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="jane@example.com"
                                        required
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Subject
                                        </label>
                                        <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-4 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Course Support</option>
                                            <option>Corporate Training</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                                            Message
                                        </label>
                                        <textarea
                                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-4 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[150px] resize-none"
                                            placeholder="Tell us how we can help..."
                                            required
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full !rounded-2xl shadow-glow py-4"
                                        disabled={isSubmitted}
                                    >
                                        {isSubmitted ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <FiCheck /> Sent Successfully
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

            {/* Map Section or Bottom CTA */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="h-[400px] rounded-[40px] bg-gray-200 dark:bg-gray-800 relative overflow-hidden shadow-enterprise group">
                        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                                    <FiMapPin className="w-10 h-10 text-primary-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Global Headquarters</h3>
                                <p className="text-gray-600 dark:text-gray-400">Silicon Valley, CA • Opening Q3 2024</p>
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
