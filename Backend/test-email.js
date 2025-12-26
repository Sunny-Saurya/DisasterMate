import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***configured***' : 'NOT SET');

    try {
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

        console.log('\nVerifying transporter...');
        await transporter.verify();
        console.log('✅ Transporter verified successfully!');

        console.log('\nSending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'DisasterMate Test Email',
            text: 'This is a test email from DisasterMate contact form.',
            html: '<b>This is a test email from DisasterMate contact form.</b>'
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\n✨ Email configuration is working correctly!');

    } catch (error) {
        console.error('❌ Email test failed:');
        console.error('Error:', error.message);
        if (error.code) console.error('Error Code:', error.code);
        if (error.response) console.error('SMTP Response:', error.response);
        
        console.log('\n📝 Troubleshooting steps:');
        console.log('1. Make sure you are using a Gmail App Password, not your regular password');
        console.log('2. Generate a new App Password at: https://myaccount.google.com/apppasswords');
        console.log('3. Update the EMAIL_PASS in your .env file');
        console.log('4. Make sure 2-Step Verification is enabled on your Google account');
    }
}

testEmail();
