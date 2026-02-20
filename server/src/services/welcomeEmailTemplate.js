export const getWelcomeEmailHtml = (name) => {
    const firstName = name?.split(' ')[0] || name || 'there';
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Note: For logos to be visible in all email clients, the image must be hosted on a public URL.
    // During local development (localhost), the logo will appear as a broken image in most clients.
    const logoUrl = frontendUrl.includes('localhost')
        ? 'https://raw.githubusercontent.com/kannanVS007/become-a-skiller/main/public/img/logo.png' // Fallback to a potential GitHub path or similar if available
        : `${frontendUrl}/img/logo.png`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Become A Skiller</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
        
        body {
            background-color: #f1f5f9;
            font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
            padding: 60px 40px;
            text-align: center;
        }
        .logo {
            width: 220px;
            height: auto;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }
        .content {
            padding: 50px 40px;
            color: #1e293b;
        }
        .greeting {
            font-size: 32px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 20px;
            letter-spacing: -0.02em;
        }
        .text {
            font-size: 18px;
            line-height: 1.7;
            color: #475569;
            margin-bottom: 30px;
        }
        .feature-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 20px;
            transition: transform 0.2s ease;
        }
        .feature-title {
            display: block;
            font-size: 18px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .feature-desc {
            font-size: 15px;
            color: #64748b;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 18px 40px;
            border-radius: 14px;
            text-decoration: none;
            font-weight: 700;
            font-size: 18px;
            margin-top: 20px;
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }
        .footer {
            background-color: #0f172a;
            padding: 40px;
            text-align: center;
            color: #94a3b8;
        }
        .quote-box {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        }
        .quote {
            font-size: 20px;
            font-style: italic;
            color: #1e293b;
            font-weight: 600;
            line-height: 1.4;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 40px 20px;
            }
            .greeting {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Premium Header -->
        <div class="header">
            <img src="${logoUrl}" alt="Become A Skiller" class="logo">
        </div>

        <!-- Main Content -->
        <div class="content">
            <h1 class="greeting">Hey ${firstName},</h1>
            
            <p class="text">
                Welcome to the <strong>Become A Skiller Community!</strong> We're beyond excited to have you join our platform—the ultimate bridge between learning and professional excellence.
            </p>

            <div class="feature-card">
                <span class="feature-title">🚀 Mastery Awaits</span>
                <span class="feature-desc">Dive into expert-crafted, industry-aligned courses that transform your potential into expertise.</span>
            </div>

            <div class="feature-card">
                <span class="feature-title">💼 Career Accelerator</span>
                <span class="feature-desc">Connect with top trainers and explore exclusive job opportunities tailored to your new skills.</span>
            </div>

            <div class="feature-card">
                <span class="feature-title">📊 Real-time Progress</span>
                <span class="feature-desc">Track every milestone on your personalized dashboard and earn certifications that matter.</span>
            </div>

            <!-- Stylish CTA -->
            <div style="text-align: center; margin-top: 40px;">
                <a href="${frontendUrl}/dashboard" class="cta-button">Launch Your Dashboard</a>
            </div>

            <!-- Motivational Section -->
            <div class="quote-box">
                <p class="quote">
                    "The best way to predict the future is to create it."
                </p>
                <p style="font-size: 14px; color: #64748b; margin-top: 10px;">— Set your goals, we'll help you reach them.</p>
            </div>
        </div>

        <!-- Professional Footer -->
        <div class="footer">
            <p style="color: #ffffff; font-weight: 600; margin-bottom: 20px;">Believe. Begin. Become.</p>
            <div style="font-size: 13px; line-height: 1.8;">
                &copy; 2024 Become A Skiller. Built with ❤️ for future masters.<br>
                Tirunelveli, Tamil Nadu, India
            </div>
            <div style="margin-top: 25px;">
                <a href="#" style="color: #94a3b8; text-decoration: underline; margin: 0 10px;">Privacy Policy</a>
                <a href="#" style="color: #94a3b8; text-decoration: underline; margin: 0 10px;">Unsubscribe</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
};
