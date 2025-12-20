import nodemailer from 'nodemailer';

// @desc    Send contact form email
// @route   POST /api/contact
// @access  Public
export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message, emergencyType } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // Create a transporter inside the function
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

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

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We will reach out soon.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error: error.message
        });
    }
};
