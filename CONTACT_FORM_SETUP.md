# Contact Form Email Setup - Gmail Configuration

## ✅ Implementation Complete!

Your contact form is now configured to send emails to **sunnysaurya9955@gmail.com** using nodemailer.

## 🔐 Important: Gmail App Password Setup

To make this work, you need to generate a **Gmail App Password** (not your regular Gmail password).

### Steps to Generate Gmail App Password:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Click on "2-Step Verification"
   - Follow the steps to enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "DisasterMate"
   - Click "Generate"
   - Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

3. **Update your `.env` file**:
   - Open `Backend/.env`
   - Replace `your_gmail_app_password_here` with the generated app password (no spaces)
   - Example: `EMAIL_PASS=abcdabcdabcdabcd`

## 📝 What Was Implemented:

### Backend:
- ✅ Installed nodemailer package
- ✅ Created `contactController.js` to handle email sending
- ✅ Created `contact.js` route
- ✅ Updated `server.js` to include contact route
- ✅ Added email configuration to `.env`

### Frontend:
- ✅ Updated Contact.jsx to send data to backend
- ✅ Added loading state and better error handling
- ✅ Connected emergency type field to form data
- ✅ Displays success/error messages

## 🚀 How to Test:

1. **Set up the App Password** (see steps above)
2. **Start the backend**:
   ```bash
   cd Backend
   npm start
   ```
3. **Start the frontend** (in another terminal):
   ```bash
   cd Frontend
   npm run dev
   ```
4. **Go to the Contact page** and submit the form
5. **Check your email** (sunnysaurya9955@gmail.com) for the message

## 📧 Email Features:

- Professional HTML formatted emails
- Includes sender's name, email, emergency type, and message
- Reply-to is set to the user's email for easy responses
- Beautiful styling with DisasterMate branding

## 🛠️ Troubleshooting:

**If emails aren't sending:**
- Make sure you're using an App Password, not your regular Gmail password
- Check that 2-Step Verification is enabled
- Verify the backend server is running on port 5000
- Check the browser console for any errors
- Check the backend terminal for error messages

## 🔒 Security Note:

Never commit your `.env` file with the real app password to GitHub. Add it to `.gitignore`.
