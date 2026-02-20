import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiMapPin, FiPhone, FiInstagram } from 'react-icons/fi';
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
    };

    const footerLinks = {
        company: {
            title: 'Company',
            links: [
                { name: 'About Us', to: '/about' },
                { name: 'Blog', to: '/blog' },
                { name: 'Careers', to: '/contact' },
                { name: 'Contact Us', to: '/contact' },
            ],
        },
        learning: {
            title: 'Learning',
            links: [
                { name: 'All Courses', to: '/courses' },
                { name: 'Job Board', to: '/jobs' },
                { name: 'Become a Trainer', to: '/signup' },
                { name: 'Certifications', to: '/courses' },
            ],
        },
        support: {
            title: 'Support',
            links: [
                { name: 'Help Center', to: '/contact' },
                { name: 'FAQ', to: '/contact' },
                { name: 'Community Forum', to: '/contact' },
                { name: 'Live Chat', to: '/contact' },
            ],
        },
        legal: {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', to: '/contact' },
                { name: 'Terms & Conditions', to: '/contact' },
                { name: 'Refund Policy', to: '/contact' },
                { name: 'Sitemap', to: '/' },
            ],
        },
    };

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/kannanVS007', label: 'GitHub', color: 'hover:bg-gray-700' },
        { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
        { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
        { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-700' },
        { icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
            {/* Glow blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-6 sm:p-10 mb-14 backdrop-blur-xl"
                >
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                                Stay <span className="text-gradient">Updated</span>
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Get the latest courses, job openings, and career tips straight to your inbox.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex gap-3 flex-col sm:flex-row">
                            <div className="flex-grow relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                    required
                                />
                            </div>
                            <Button variant="primary" size="md" type="submit" className="whitespace-nowrap">
                                {subscribed ? '✓ Subscribed!' : <><FiSend className="w-4 h-4" /> Subscribe</>}
                            </Button>
                        </form>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <Link to="/" className="flex items-center gap-3 mb-5">
                                <img
                                    src="/img/logo.png"
                                    alt="Become a Skiller"
                                    className="h-10 w-auto brightness-0 invert opacity-90"
                                />
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                Empowering tomorrow's workforce with cutting-edge tech skills.
                                Learn, grow, and achieve your career goals with us.
                            </p>
                            <div className="text-gray-500 text-sm space-y-1.5 mb-5">
                                <div className="flex items-start gap-2">
                                    <FiMapPin className="mt-0.5 text-primary-500 flex-shrink-0" size={14} />
                                    <span>Palayamkottai, Tirunelveli,<br />Tamil Nadu, India</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiPhone className="text-primary-500 flex-shrink-0" size={14} />
                                    <span>+91 63795 24135</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiMail className="text-primary-500 flex-shrink-0" size={14} />
                                    <span>vskannan4135@gmail.com</span>
                                </div>
                            </div>
                            {/* Social icons */}
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.12, y: -2 }}
                                        whileTap={{ scale: 0.92 }}
                                        className={`w-9 h-9 rounded-xl bg-white/8 ${social.color} flex items-center justify-center transition-all duration-200 border border-white/5`}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Link Columns */}
                    {Object.values(footerLinks).map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="col-span-1"
                        >
                            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">{section.title}</h4>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
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
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                    <p>© {new Date().getFullYear()} Become a Skiller. All rights reserved. Made with ❤️ in Tamil Nadu, India.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-primary-400 transition-colors">Terms & Conditions</Link>
                        <Link to="/contact" className="hover:text-primary-400 transition-colors">Refund Policy</Link>
                        <Link to="/contact" className="hover:text-primary-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
