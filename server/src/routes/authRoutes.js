import express from 'express';
import { register, login, refresh, googleLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/google-login', googleLogin);

export default router;
