import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiPlayCircle, FiCheckCircle, FiMenu, FiX } from 'react-icons/fi';
import api from '../services/api';
import TextToSpeech from '../components/TextToSpeech';
import QuizComponent from '../components/QuizComponent';
import { FiCheckSquare } from 'react-icons/fi';

const LearningPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedModules, setExpandedModules] = useState({});
    const [viewingQuiz, setViewingQuiz] = useState(false);
    const [enrollment, setEnrollment] = useState(null);
    const [showCertificateConfetti, setShowCertificateConfetti] = useState(false);

    // Update handleLessonSelect to disable quiz view
    const handleLessonSelect = (modIndex, lessonIndex) => {
        setViewingQuiz(false);
        setCurrentModuleIndex(modIndex);
        setCurrentLessonIndex(lessonIndex);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleQuizSelect = (modIndex) => {
        setCurrentModuleIndex(modIndex);
        setViewingQuiz(true);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        const fetchCourseAndEnrollment = async () => {
            try {
                const [courseRes, enrollmentRes] = await Promise.all([
                    api.get(`/courses/${id}`),
                    api.get(`/courses/${id}/enrollment`) // Fetch enrollment status
                ]);

                if (courseRes.data.success) {
                    setCourse(courseRes.data.data);
                    setExpandedModules({ 0: true });
                }
                if (enrollmentRes.data.success) {
                    setEnrollment(enrollmentRes.data.data);
                }
            } catch (err) {
                console.error('Error fetching course data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseAndEnrollment();
    }, [id]);

    const isModuleLocked = (index) => {
        if (index === 0) return false; // First module always unlocked
        // Check if previous module is in completedModules
        const prevModuleKey = `module-${index - 1}`;
        return !enrollment?.progress?.completedModules?.includes(prevModuleKey);
    };

    const handleQuizPass = (result) => {
        // Refresh enrollment to update progress
        api.get(`/courses/${id}/enrollment`).then(res => {
            if (res.data.success) {
                setEnrollment(res.data.data);
                // If course completed, show confetti or toast
                if (res.data.data.status === 'completed') {
                    setShowCertificateConfetti(true);
                }
                // Auto-advance to next module if available
                if (currentModuleIndex < course.modules.length - 1) {
                    // Logic to open next module?
                    setExpandedModules(prev => ({ ...prev, [currentModuleIndex + 1]: true }));
                }
            }
        });
    };

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };



    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading class...</div>;
    if (!course) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Course not found</div>;

    const currentModule = course.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    // Helper to get YouTube ID
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(currentLesson?.videoUrl);

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-30 w-80 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative lg:translate-x-0
            `}>
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <h2 className="font-bold truncate" title={course.title}>{course.title}</h2>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-400">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {course.modules.map((mod, mIndex) => (
                        <div key={mIndex} className="border-b border-gray-800">
                            <button
                                onClick={() => toggleModule(mIndex)}
                                className="w-full flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 transition-colors text-left"
                            >
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Module {mIndex + 1}</p>
                                    <p className="text-sm font-medium">{mod.title}</p>
                                </div>
                                {expandedModules[mIndex] ? <FiChevronDown /> : <FiChevronRight />}
                            </button>


                            {expandedModules[mIndex] && (
                                <div className="bg-gray-950">
                                    {mod.lessons.map((lesson, lIndex) => {
                                        const isActive = !viewingQuiz && mIndex === currentModuleIndex && lIndex === currentLessonIndex;
                                        const isLocked = isModuleLocked(mIndex);
                                        return (
                                            <button
                                                key={lIndex}
                                                onClick={() => !isLocked && handleLessonSelect(mIndex, lIndex)}
                                                disabled={isLocked}
                                                className={`w-full flex items-start gap-3 p-3 px-4 transition-colors text-left text-sm ${isActive
                                                    ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500'
                                                    : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                                                    } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {isActive ? <FiPlayCircle className="mt-0.5 shrink-0" /> : <div className="w-4 h-4 rounded-full border border-gray-600 mt-0.5 shrink-0" />}
                                                <div className="flex-1">
                                                    <p>{lesson.title}</p>
                                                    <span className="text-xs opacity-60 flex items-center gap-1 mt-1">
                                                        <FiPlayCircle size={10} /> {lesson.duration} min {isLocked && '(Locked)'}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {/* Quiz Button for Module */}
                                    <button
                                        onClick={() => handleQuizSelect(mIndex)}
                                        className={`w-full flex items-start gap-3 p-3 px-4 transition-colors text-left text-sm border-t border-gray-800 ${viewingQuiz && currentModuleIndex === mIndex
                                            ? 'bg-purple-600/10 text-purple-400 border-r-2 border-purple-500'
                                            : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                                            }`}
                                    >
                                        <FiCheckSquare className="mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-bold">Module Quiz</p>
                                            <span className="text-xs opacity-60">Test your knowledge</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-gray-800 flex items-center px-4 justify-between bg-gray-900">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-800 rounded-lg lg:hidden"
                        >
                            <FiMenu size={24} />
                        </button>
                        <h1 className="font-bold text-lg truncate">
                            {currentLesson ? currentLesson.title : 'Select a lesson'}
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Exit Class
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-black">
                    <div className="max-w-4xl mx-auto">

                        {/* Certificate Banner */}
                        {enrollment?.status === 'completed' && (
                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 mb-8 flex items-center justify-between shadow-lg">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">🎉 Course Completed!</h2>
                                    <p className="text-yellow-100">Congratulations! You have passed all modules.</p>
                                </div>
                                <a
                                    href={`http://localhost:5000/api/v1/courses/${id}/certificate`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white text-yellow-800 font-bold py-2 px-6 rounded-lg hover:bg-yellow-50 transition-colors shadow-md"
                                >
                                    Download Certificate
                                </a>
                            </div>
                        )}

                        {viewingQuiz ? (
                            <QuizComponent
                                courseId={id}
                                moduleIndex={currentModuleIndex}
                                onComplete={handleQuizPass}
                            />
                        ) : (
                            <>
                                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-8 relative group">
                                    {videoId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                                            title={currentLesson?.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                                            <FiPlayCircle size={48} className="mb-4 opacity-50" />
                                            <p>Select a lesson to start learning</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 border border-gray-800">
                                    <h2 className="text-2xl font-bold mb-4">About this lesson</h2>

                                    <TextToSpeech text={currentLesson?.content || 'No content provided.'} />

                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {currentLesson?.content || 'No description available for this lesson.'}
                                    </p>

                                    {/* Resources Placeholder */}
                                    <div className="pt-6 border-t border-gray-800">
                                        <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-gray-500">Resources</h3>
                                        <div className="flex gap-4">
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                                                Download Source Code
                                            </button>
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                                                Lesson Slides (PDF)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LearningPage;
