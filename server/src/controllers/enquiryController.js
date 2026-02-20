import asyncHandler from '../middleware/async.js';
import sendEmail from '../services/emailService.js';

// @desc    Create an enquiry (contact form submission)
// @route   POST /api/v1/enquiries
// @access  Public
export const createEnquiry = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    // Send notification email to admin
    try {
        await sendEmail({
            email: process.env.ADMIN_EMAIL || 'vskannan4135@gmail.com',
            subject: `New Enquiry: ${subject || 'General Inquiry'} from ${firstName} ${lastName}`,
            message: `
You have received a new enquiry from the contact form.

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}
            `.trim()
        });
    } catch (emailErr) {
        console.error('Enquiry email failed:', emailErr.message);
        // Don't block response if email fails
    }

    // Send auto-reply to user
    try {
        await sendEmail({
            email,
            subject: 'We received your message – Become a Skiller',
            message: `Hi ${firstName},

Thank you for reaching out to us! We have received your enquiry and our team will get back to you within 2 business hours.

Your message:
"${message}"

Best regards,
The Become a Skiller Team
Tirunelveli, Palayamkottai, Tamil Nadu, India
`
        });
    } catch (replyErr) {
        console.error('Auto-reply email failed:', replyErr.message);
    }

    res.status(201).json({
        success: true,
        message: 'Your enquiry has been received. We will contact you shortly.'
    });
});
