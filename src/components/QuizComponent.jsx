import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiAward, FiRotateCcw } from 'react-icons/fi';
import api from '../services/api';

const QuizComponent = ({ courseId, moduleIndex, onComplete }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // api/v1/quiz/courses/:courseId/modules/:moduleIndex
                const { data } = await api.get(`/quiz/courses/${courseId}/modules/${moduleIndex}`);
                if (data.success) {
                    setQuiz(data.data);
                }
            } catch (err) {
                // 404 means no quiz for this module, which is fine
                console.log('No quiz found for this module');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [courseId, moduleIndex]);

    const handleOptionSelect = (optionIndex) => {
        if (submitted) return;
        setAnswers(prev => ({
            ...prev,
            [quiz.questions[currentQuestion]._id]: optionIndex
        }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                answers: Object.entries(answers).map(([qId, optIdx]) => ({
                    questionId: qId,
                    selectedOptionIndex: optIdx
                }))
            };

            const { data } = await api.post(`/quiz/${quiz._id}/submit`, payload);
            if (data.success) {
                setResult(data.data);
                setSubmitted(true);
                if (data.data.passed && onComplete) {
                    onComplete(data.data);
                }
            }
        } catch (err) {
            setError('Failed to submit quiz. Please try again.');
        }
    };

    const handleRetry = () => {
        setResult(null);
        setSubmitted(false);
        setAnswers({});
        setCurrentQuestion(0);
    };

    if (loading) return <div className="p-4 text-gray-400">Loading quiz...</div>;
    if (!quiz) return null; // No quiz for this module, don't render anything

    // Result View
    if (submitted && result) {
        return (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8 text-center">
                <div className="mb-4 flex justify-center">
                    {result.passed ? (
                        <FiAward className="text-yellow-400 w-16 h-16" />
                    ) : (
                        <FiXCircle className="text-red-400 w-16 h-16" />
                    )}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                    {result.passed ? 'Quiz Passed!' : 'Quiz Failed'}
                </h3>
                <p className="text-gray-400 mb-6">
                    You scored <span className={`font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>{result.percentage.toFixed(0)}%</span>
                </p>

                {result.passed ? (
                    <button
                        onClick={onComplete} // Or just close
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Continue to Next Module
                    </button>
                ) : (
                    <button
                        onClick={handleRetry}
                        className="flex items-center gap-2 mx-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        <FiRotateCcw /> Retry Quiz
                    </button>
                )}
            </div>
        );
    }

    // Question View
    const question = quiz.questions[currentQuestion];
    const isLastQuestion = currentQuestion === quiz.questions.length - 1;
    const isAnswered = answers[question._id] !== undefined;

    return (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                <span className="text-sm text-gray-500 font-medium">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
            </div>

            <div className="mb-8">
                <p className="text-lg text-gray-200 mb-4">{question.questionText}</p>
                <div className="space-y-3">
                    {question.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${answers[question._id] === idx
                                    ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750'
                                }`}
                        >
                            <span className="inline-block w-6 h-6 rounded-full border border-gray-500 mr-3 text-center leading-5 text-sm">
                                {answers[question._id] === idx ? '●' : ''}
                            </span>
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white disabled:opacity-50"
                >
                    Previous
                </button>

                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!isAnswered} // Must answer last question to submit? Or check all?
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Next Question
                    </button>
                )}
            </div>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>
    );
};

export default QuizComponent;
