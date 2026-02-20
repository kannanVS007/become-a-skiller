import express from 'express';
import { getModuleQuiz, submitQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/:id/submit').post(submitQuiz);
router.route('/courses/:courseId/modules/:moduleIndex').get(getModuleQuiz);

export default router;
