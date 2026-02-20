import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Determine sender based on scenario
    const primarySender = process.env.FROM_EMAIL || 'vskannan4135@gmail.com';
    const fallbackSender = process.env.FALLBACK_EMAIL || 'vskannan4135@gmail.com';

    const message = {
        from: `"Become A Skiller" <${primarySender}>`,
        to: options.email,
        subject: options.subject,
        text: options.message || '',
        html: options.html || undefined,
        attachments: options.attachments || []
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`[Email] Message sent to ${options.email}: %s`, info.messageId);
        return info;
    } catch (error) {
        console.warn(`[Email] Primary sender failed, trying fallback: ${error.message}`);

        // Try fallback sender if first one fails
        message.from = `"Become A Skiller" <${fallbackSender}>`;
        try {
            const info = await transporter.sendMail(message);
            console.log(`[Email] Message sent via fallback to ${options.email}: %s`, info.messageId);
            return info;
        } catch (fallbackError) {
            console.error(`[Email] Critical failure: All senders failed.`, fallbackError.message);
            throw fallbackError;
        }
    }
};

export default sendEmail;
