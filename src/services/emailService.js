const nodemailer = require('nodemailer');
const dns = require('node:dns');
require('dotenv').config();

// Force Node.js to prefer IPv4 over IPv6. 
// This fixes the 'ENETUNREACH 2607:f8b0...' error on Render's free tier.
dns.setDefaultResultOrder('ipv4first');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // This helps avoid IPv6 network issues on hosting platforms like Render
  tls: {
    rejectUnauthorized: false
  }
});

const EmailService = {
  /**
   * Send a notification email for a new contact form submission
   */
  async sendContactNotification(name, email, message) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not set. Skipping email notification.');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send email to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio website!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1e293b; margin: 0; font-size: 24px;">New Message! 🎉</h2>
            <p style="color: #64748b; margin-top: 5px;">Someone reached out from your portfolio.</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <h3 style="color: #3b82f6; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #eff6ff; padding-bottom: 10px;">Contact Details</h3>
            
            <p style="margin: 10px 0; color: #334155;">
              <strong style="color: #0f172a; min-width: 80px; display: inline-block;">Name:</strong> ${name}
            </p>
            
            <p style="margin: 10px 0; color: #334155;">
              <strong style="color: #0f172a; min-width: 80px; display: inline-block;">Email:</strong> 
              <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
            </p>
            
            <h3 style="color: #3b82f6; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #eff6ff; padding-bottom: 10px;">Message</h3>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px;">
            <p>Sent automatically from your Portfolio Backend</p>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Notification email sent for message from ${name}`);
    } catch (err) {
      console.error('Error sending email notification:', err);
    }
  }
};

module.exports = EmailService;
//new commit