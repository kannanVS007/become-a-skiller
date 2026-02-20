import Quiz from '../models/Quiz.js';
import Course from '../models/Course.js';
import { Enrollment } from '../models/Transaction.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get quiz for a specific module
// @route   GET /api/v1/courses/:courseId/modules/:moduleIndex/quiz
// @access  Private
export const getModuleQuiz = asyncHandler(async (req, res, next) => {
    const { courseId, moduleIndex } = req.params;

    const quiz = await Quiz.findOne({
        course: courseId,
        moduleIndex: parseInt(moduleIndex)
    });

    if (!quiz) {
        return next(new ErrorResponse(`No quiz found for module ${moduleIndex}`, 404));
    }

    // Hide correct answers when sending to frontend?
    // For security, yes, but for simplicity in this MVP, we might send them 
    // OR we strip them and validate on backend.
    // Let's strip them.

    const quizForStudent = {
        _id: quiz._id,
        title: quiz.title,
        passingScore: quiz.passingScore,
        questions: quiz.questions.map(q => ({
            _id: q._id,
            questionText: q.questionText,
            options: q.options,
            points: q.points
        }))
    };

    res.status(200).json({
        success: true,
        data: quizForStudent
    });
});

// @desc    Submit quiz attempt
// @route   POST /api/v1/quiz/:id/submit
// @access  Private
export const submitQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        return next(new ErrorResponse('Quiz not found', 404));
    }

    const { answers } = req.body; // Array of { questionId, selectedOptionIndex }

    let score = 0;
    let totalPoints = 0;
    const results = [];

    quiz.questions.forEach(question => {
        totalPoints += question.points || 1;

        const userAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
        const isCorrect = userAnswer && userAnswer.selectedOptionIndex === question.correctOptionIndex;

        if (isCorrect) {
            score += question.points || 1;
        }

        results.push({
            questionId: question._id,
            correct: isCorrect,
            userSelected: userAnswer ? userAnswer.selectedOptionIndex : null,
            correctOption: question.correctOptionIndex // Send back for review
        });
    });

    const percentage = (score / totalPoints) * 100;
    const passed = percentage >= quiz.passingScore;

    // Update Enrollment
    const enrollment = await Enrollment.findOne({
        user: req.user.id,
        course: quiz.course
    });

    if (enrollment) {
        // Add or update quiz score
        const existingScoreIndex = enrollment.quizScores.findIndex(qs => qs.quizId.toString() === quiz._id.toString());
        if (existingScoreIndex > -1) {
            enrollment.quizScores[existingScoreIndex] = {
                quizId: quiz._id,
                score: percentage,
                passed,
                completedAt: Date.now()
            };
        } else {
            enrollment.quizScores.push({
                quizId: quiz._id,
                score: percentage,
                passed,
                completedAt: Date.now()
            });
        }

        // If passed, add to completedModules if not already there
        if (passed) {
            const moduleKey = `module-${quiz.moduleIndex}`;
            if (!enrollment.progress.completedModules.includes(moduleKey)) {
                enrollment.progress.completedModules.push(moduleKey);
            }

            // Check for Course Completion
            const course = await Course.findById(quiz.course);
            if (course && enrollment.progress.completedModules.length === course.modules.length) {
                enrollment.status = 'completed';
                if (!enrollment.certificationId) {
                    enrollment.certificationId = `CERT-${Date.now()}-${req.user.id.toString().slice(-4).toUpperCase()}`;
                }
            }
        }
        await enrollment.save();
    }

    res.status(200).json({
        success: true,
        data: {
            score,
            totalPoints,
            percentage,
            passed,
            results,
            certificationId: enrollment?.certificationId
        }
    });
});
