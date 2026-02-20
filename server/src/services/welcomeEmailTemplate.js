/**
 * Generates the HTML for the welcome email.
 * @param {string} name - The user's first/full name
 * @returns {string} - Full HTML string
 */
export const getWelcomeEmailHtml = (name) => {
  const firstName = name?.split(' ')[0] || name || 'there';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Become A Skiller</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <!-- Blue Header Banner -->
                    <tr>
                        <td style="background-color: #1a6cf4; padding: 40px 0; text-align: center;">
                            <img src="${frontendUrl}/img/logo.png" alt="Become A Skiller" style="width: 180px; height: auto;">
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 48px; background-color: #ffffff;">
                            <h1 style="font-size: 24px; font-weight: 800; color: #1e293b; margin: 0 0 16px;">Dear ${firstName},</h1>
                            
                            <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px;">
                                Welcome to the <strong>Become A Skiller Community!</strong> We're thrilled to have you join our platform dedicated to bridging the gap between learning and professional success.
                            </p>

                            <p style="font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 32px;">
                                Your journey to mastery begins here. Explore our industry-aligned courses, connect with top-tier trainers, and unlock your potential.
                            </p>

                            <!-- What's Next Section -->
                            <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 20px; text-transform: uppercase; letter-spacing: 0.05em;">What’s Next?</h3>
                            
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; border-left: 4px solid #1a6cf4;">
                                            <strong style="display: block; font-size: 15px; color: #1e293b; margin-bottom: 4px;">Explore Courses</strong>
                                            <span style="font-size: 14px; color: #64748b;">Browse through our curated list of technical and soft-skill courses designed by experts.</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; border-left: 4px solid #1a6cf4;">
                                            <strong style="display: block; font-size: 15px; color: #1e293b; margin-bottom: 4px;">Apply for Jobs</strong>
                                            <span style="font-size: 14px; color: #64748b;">Visit our job board to find opportunities that match your skill set and aspirations.</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 32px;">
                                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; border-left: 4px solid #1a6cf4;">
                                            <strong style="display: block; font-size: 15px; color: #1e293b; margin-bottom: 4px;">Track Progress</strong>
                                            <span style="font-size: 14px; color: #64748b;">Use your personalized dashboard to keep tabs on your enrollments and certifications.</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA -->
                            <div style="text-align: center;">
                                <a href="${frontendUrl}/dashboard" style="display: inline-block; background-color: #1a6cf4; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">Go to Dashboard Hub</a>
                            </div>

                            <!-- Motivational Closing -->
                            <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                                <p style="font-size: 18px; font-style: italic; color: #1e293b; font-weight: 600;">
                                    "Your future is created by what you do today, not tomorrow."
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 48px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="font-size: 14px; color: #64748b; margin: 0 0 12px;">
                                Believe, Begin, Become – with Become A Skiller.
                            </p>
                            <div style="font-size: 12px; color: #94a3b8;">
                                &copy; 2024 Become A Skiller. All rights reserved.<br>
                                Tirunelveli, Tamil Nadu, India
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};
