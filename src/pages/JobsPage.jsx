import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign, FiClock } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import api from '../services/api';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await api.get('/jobs');
                if (data.success) {
                    setJobs(data.jobs);
                }
            } catch (err) {
                console.error('Error fetching jobs:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApply = async (jobId) => {
        try {
            const { data } = await api.post(`/jobs/${jobId}/apply`, {
                resumeUrl: 'https://example.com/demo-resume.pdf' // Demo resume
            });
            if (data.success) {
                alert('Application submitted successfully!');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to apply');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            <section className="pt-32 pb-12 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white">
                        Find Your <span className="text-blue-600">Dream Career</span>
                    </h1>
                    <div className="relative">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search by role, company, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-none focus:ring-2 focus:ring-blue-500 text-lg dark:text-white"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 max-w-5xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                ) : filteredJobs.length > 0 ? (
                    <div className="space-y-6">
                        {filteredJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold dark:text-white mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-sm">
                                        <span className="flex items-center gap-1"><FiBriefcase /> {job.company}</span>
                                        <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                                        <span className="flex items-center gap-1"><FiDollarSign /> {job.salary}</span>
                                        <span className="flex items-center gap-1"><FiClock /> {job.type}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    className="!rounded-2xl !px-8"
                                    onClick={() => handleApply(job._id)}
                                >
                                    Apply Now
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No jobs match your search criteria.
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default JobsPage;
