import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiDollarSign, FiType } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post('/jobs', formData);
            if (data.success) {
                alert('Job posted successfully!');
                // Reset or navigate
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to post job');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />
            <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white">
                            <FiBriefcase className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-black dark:text-white">Post a <span className="text-blue-600">New Job</span></h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} required />
                            <Input label="Company Name" name="company" icon={FiBriefcase} value={formData.company} onChange={handleChange} required />
                            <Input label="Location" name="location" icon={FiMapPin} value={formData.location} onChange={handleChange} required />
                            <Input label="Salary Range" name="salary" icon={FiDollarSign} value={formData.salary} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 min-h-[200px] dark:text-white"
                                placeholder="Outline job requirements, responsibilities, and benefits..."
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full !rounded-2xl h-14 font-black shadow-glow"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Posting...' : 'Post Job Opening'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateJob;
