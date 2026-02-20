import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../services/emailService.js';
import { getWelcomeEmailHtml } from '../services/welcomeEmailTemplate.js';

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
};

// Send welcome email (fire-and-forget — does not block signup)
const sendWelcomeEmail = (user) => {
    sendEmail({
        email: user.email,
        subject: 'Welcome to the Become A Skiller Community!',
        html: getWelcomeEmailHtml(user.name),
        message: `Welcome to Become A Skiller, ${user.name}! Your account is now active.`
    })
        .then(() => console.log(`[Email] Welcome email sent to ${user.email}`))
        .catch((err) => console.error(`[Email] Failed to send welcome email to ${user.email}:`, err.message));
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role, mobile } = req.body;

        // Validate mobile — mandatory for new registrations
        if (!mobile) {
            return res.status(400).json({ success: false, message: 'Mobile number is required.' });
        }
        if (!/^[0-9]{10}$/.test(mobile.toString().trim())) {
            return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student',
            mobile: mobile.toString().trim()
        });

        // Fire welcome email asynchronously — does NOT block response
        sendWelcomeEmail(user);

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update lastLogin
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh
// @access  Public
export const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token' });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const newToken = generateToken(user._id);
        res.status(200).json({
            success: true,
            token: newToken
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    res.status(statusCode).json({
        success: true,
        token,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            mobile: user.mobile || null   // always include so frontend can detect missing phone
        }
    });
};
