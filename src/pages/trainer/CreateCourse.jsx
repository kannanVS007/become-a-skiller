import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiVideo, FiFileText, FiSave } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        thumbnail: '',
        modules: [{ title: '', description: '', videoUrl: '', pdfUrl: '' }]
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModuleChange = (index, e) => {
        const newModules = [...formData.modules];
        newModules[index][e.target.name] = e.target.value;
        setFormData({ ...formData, modules: newModules });
    };

    const addModule = () => {
        setFormData({
            ...formData,
            modules: [...formData.modules, { title: '', description: '', videoUrl: '', pdfUrl: '' }]
        });
    };

    const removeModule = (index) => {
        const newModules = formData.modules.filter((_, i) => i !== index);
        setFormData({ ...formData, modules: newModules });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post('/courses', formData);
            if (data.success) {
                alert('Course created successfully!');
                // Reset or navigate
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create course');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />
            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-3xl font-black dark:text-white">Create New <span className="text-blue-600">Course</span></h1>
                        <FiSave className="text-gray-400 w-6 h-6" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Course Title" name="title" value={formData.title} onChange={handleChange} required />
                            <Input label="Category" name="category" value={formData.category} onChange={handleChange} required />
                            <Input label="Price (INR)" name="price" type="number" value={formData.price} onChange={handleChange} required />
                            <Input label="Thumbnail URL" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 min-h-[150px] dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold dark:text-white">Course Modules</h3>
                                <Button type="button" variant="secondary" size="sm" onClick={addModule} className="!rounded-xl">
                                    <FiPlus className="mr-2" /> Add Module
                                </Button>
                            </div>

                            {formData.modules.map((module, index) => (
                                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl relative">
                                    <button
                                        type="button"
                                        onClick={() => removeModule(index)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                                    >
                                        <FiTrash2 />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <Input label="Module Title" name="title" value={module.title} onChange={(e) => handleModuleChange(index, e)} required />
                                        <Input label="Video URL" name="videoUrl" icon={FiVideo} value={module.videoUrl} onChange={(e) => handleModuleChange(index, e)} />
                                        <Input label="PDF URL" name="pdfUrl" icon={FiFileText} value={module.pdfUrl} onChange={(e) => handleModuleChange(index, e)} />
                                    </div>
                                    <textarea
                                        placeholder="Module Description"
                                        name="description"
                                        value={module.description}
                                        onChange={(e) => handleModuleChange(index, e)}
                                        className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border-none text-sm dark:text-white"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full !rounded-2xl h-14 font-black shadow-glow"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Publishing...' : 'Publish Course'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateCourse;
