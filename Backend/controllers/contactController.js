import nodemailer from 'nodemailer';
export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message, emergencyType } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials not configured');
            return res.status(500).json({
                success: false,
                message: 'Email service is not configured. Please contact administrator.'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter configuration
        await transporter.verify();

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to your email
            replyTo: email, // User's email for easy reply
            subject: `DisasterMate Contact Form: ${emergencyType || 'General Inquiry'}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        
                        <div style="margin: 20px 0;">
                            <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
                            <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> ${email}</p>
                            <p style="margin: 10px 0;"><strong style="color: #374151;">Emergency Type:</strong> ${emergencyType || 'Not specified'}</p>
                        </div>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: 5px;">
                            <p style="margin: 0; color: #374151;"><strong>Message:</strong></p>
                            <p style="margin: 10px 0 0 0; color: #1f2937;">${message}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                            <p>This message was sent from the DisasterMate contact form.</p>
                            <p>Reply directly to this email to contact ${name}.</p>
                        </div>
                    </div>
                </div>
            `
        };

        // Send email to admin
        console.log('Sending email to admin:', process.env.EMAIL_USER);
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully! Message ID:', info.messageId);

        // Send confirmation email to user
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting DisasterMate',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #dc2626;">Thank You for Contacting DisasterMate</h2>
                        <p>Dear ${name},</p>
                        <p>We have received your message and our team will get back to you as soon as possible.</p>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 5px;">
                            <p style="margin: 0;"><strong>Your Message:</strong></p>
                            <p style="margin: 10px 0 0 0;">${message}</p>
                        </div>
                        
                        <p style="margin-top: 20px;">For urgent emergencies, please call:</p>
                        <p style="font-size: 24px; font-weight: bold; color: #dc2626; margin: 5px 0;">108 / 112</p>
                        
                        <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">Best regards,<br>The DisasterMate Team</p>
                    </div>
                </div>
            `
        };
        
        await transporter.sendMail(confirmationMailOptions);
        console.log('✅ Confirmation email sent to user:', email);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We will reach out soon.'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            response: error.response
        });
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error: error.message
        });
    }
};
