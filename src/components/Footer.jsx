import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiGithub, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Subscribing:', email);
        setEmail('');
    };

    const footerLinks = {
        company: {
            title: 'Company',
            links: [
                { name: 'About Us', to: '/about' },
                { name: 'Careers', to: '/careers' },
                { name: 'Press', to: '/press' },
                { name: 'Blog', to: '/blog' },
            ],
        },
        resources: {
            title: 'Resources',
            links: [
                { name: 'Courses', to: '/courses' },
                { name: 'Become a Trainer', to: '/signup' },
                { name: 'Help Center', to: '/contact' },
                { name: 'Community', to: '/community' },
            ],
        },
        legal: {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: '#privacy' },
                { name: 'Terms of Service', href: '#terms' },
                { name: 'Cookie Policy', href: '#cookies' },
                { name: 'Refund Policy', href: '#refund' },
            ],
        },
    };

    const socialLinks = [
        { icon: FiGithub, href: '#', label: 'GitHub' },
        { icon: FiTwitter, href: '#', label: 'Twitter' },
        { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
        { icon: FiYoutube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-dark rounded-3xl p-8 md:p-12 mb-16"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-3">
                                Stay <span className="text-gradient">Updated</span>
                            </h3>
                            <p className="text-gray-400">
                                Subscribe to our newsletter for the latest courses, tips, and exclusive offers.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex gap-3">
                            <div className="flex-grow relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>
                            <Button variant="primary" size="md" type="submit">
                                <FiSend className="w-5 h-5" />
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src="/img/logo.png"
                                    alt="Become a Skiller"
                                    className="h-12 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <p className="text-gray-400 mb-6">
                                Empowering tomorrow's workforce with cutting-edge tech skills.
                                Learn, grow, and achieve your career goals with us.
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-primary flex items-center justify-center transition-all"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Link Columns */}
                    {Object.values(footerLinks).map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to || '#'}
                                            className="text-gray-400 hover:text-primary-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm"
                >
                    <p>© 2026 Become a Skiller. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#privacy" className="hover:text-primary-400 transition-colors">
                            Privacy
                        </a>
                        <a href="#terms" className="hover:text-primary-400 transition-colors">
                            Terms
                        </a>
                        <a href="#cookies" className="hover:text-primary-400 transition-colors">
                            Cookies
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
