import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sendEmail from '../services/emailService.js';
import { getWelcomeEmailHtml } from '../services/welcomeEmailTemplate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const testEmail = async () => {
    console.log('--- Email Service Test ---');
    console.log('Sender:', process.env.EMAIL_USER);
    console.log('Host:', process.env.EMAIL_HOST);

    try {
        await sendEmail({
            email: process.env.EMAIL_USER, // Send to yourself
            subject: 'Become A Skiller - Premium Welcome Test',
            message: 'Welcome to Become A Skiller!',
            html: getWelcomeEmailHtml('Test User')
        });
        console.log('✅ Success: Test email sent!');
    } catch (error) {
        console.error('❌ Failed: Could not send test email.');
        console.error('Error details:', error.message);

        if (process.env.EMAIL_PASS === 'your_email_password_here') {
            console.log('\n💡 TIP: It looks like you still have the placeholder "your_email_password_here" in your .env file.');
            console.log('You need to replace it with a Gmail App Password.');
        }
    }
};

testEmail();
