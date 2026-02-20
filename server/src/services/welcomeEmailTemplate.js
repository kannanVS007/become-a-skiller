/**
 * Generates the HTML for the welcome email.
 * @param {string} name - The user's first/full name
 * @returns {string} - Full HTML string
 */
export const getWelcomeEmailHtml = (name) => {
    const firstName = name?.split(' ')[0] || name || 'there';
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Become A Skiller</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Blue Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a6cf4 0%,#0ea5e9 100%);padding:40px 48px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                Become <span style="color:#bfdbfe;">A</span> Skiller
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                Believe · Begin · Become
              </p>
            </td>
          </tr>

          <!-- Greeting Section -->
          <tr>
            <td style="padding:48px 48px 32px;">
              <h2 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#1e293b;">
                Welcome to the community, ${firstName}! 🎉
              </h2>
              <p style="margin:0 0 12px;font-size:16px;color:#475569;line-height:1.7;">
                We're thrilled to have you on board at <strong>Become A Skiller</strong> — your launchpad for real-world tech skills, career growth, and professional excellence.
              </p>
              <p style="margin:0;font-size:16px;color:#475569;line-height:1.7;">
                Your account is now active and ready for action. Here's how to make the most of your journey with us:
              </p>
            </td>
          </tr>

          <!-- What's Next Section -->
          <tr>
            <td style="padding:0 48px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h3 style="margin:0 0 20px;font-size:18px;font-weight:800;color:#1e293b;border-left:4px solid #1a6cf4;padding-left:14px;">
                      What's Next?
                    </h3>
                  </td>
                </tr>

                <!-- Step 1 -->
                <tr>
                  <td style="padding:0 0 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:14px;padding:20px;" >
                      <tr>
                        <td width="48" valign="top" style="padding:0 16px 0 20px;">
                          <div style="width:40px;height:40px;background:#1a6cf4;border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:40px;font-size:20px;">📚</div>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-weight:800;font-size:15px;color:#1e293b;">Explore Courses</p>
                          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Browse 50+ industry-relevant courses in tech, design, and business. Learn at your own pace.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 2 -->
                <tr>
                  <td style="padding:0 0 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:14px;padding:20px;">
                      <tr>
                        <td width="48" valign="top" style="padding:0 16px 0 20px;">
                          <div style="width:40px;height:40px;background:#22c55e;border-radius:12px;text-align:center;line-height:40px;font-size:20px;">💼</div>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-weight:800;font-size:15px;color:#1e293b;">Apply for Jobs</p>
                          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Connect with top employers. Browse curated job listings tailored to your skills.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 3 -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf4ff;border-radius:14px;padding:20px;">
                      <tr>
                        <td width="48" valign="top" style="padding:0 16px 0 20px;">
                          <div style="width:40px;height:40px;background:#a855f7;border-radius:12px;text-align:center;line-height:40px;font-size:20px;">📈</div>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-weight:800;font-size:15px;color:#1e293b;">Track Your Progress</p>
                          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">Monitor your learning journey with certificates, badges, and a personalised dashboard.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 48px 40px;text-align:center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/courses"
                style="display:inline-block;background:linear-gradient(135deg,#1a6cf4,#0ea5e9);color:#ffffff;font-weight:800;font-size:16px;padding:16px 40px;border-radius:14px;text-decoration:none;letter-spacing:0.3px;">
                Start Learning Now →
              </a>
            </td>
          </tr>

          <!-- Motivational Closing -->
          <tr>
            <td style="padding:0 48px 40px;">
              <div style="background:linear-gradient(135deg,#1a6cf4 0%,#7c3aed 100%);border-radius:16px;padding:28px 32px;text-align:center;">
                <p style="margin:0;font-size:18px;font-weight:800;color:#ffffff;line-height:1.5;">
                  "Every expert was once a beginner. Your journey starts today."
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:32px 48px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#1e293b;">
                Become A Skiller
              </p>
              <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;line-height:1.6;">
                Palayamkottai, Tirunelveli, Tamil Nadu, India<br/>
                vskannan4135@gmail.com &nbsp;|&nbsp; +91 63795 24135
              </p>
              <p style="margin:16px 0 0;font-size:13px;color:#64748b;font-style:italic;font-weight:600;">
                Believe, Begin, Become – with Become A Skiller.
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#cbd5e1;">
                You received this email because you signed up at Become A Skiller. &nbsp;|&nbsp;
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" style="color:#1a6cf4;text-decoration:none;">Visit Website</a>
              </p>
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
