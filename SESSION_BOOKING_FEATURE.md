# Session Booking Feature

## Overview
Users can now book safety training sessions and all bookings are saved to the MongoDB database with proper authentication.

## Backend Setup

### Files Created:
1. **models/SessionBooking.js** - MongoDB model for session bookings
2. **controllers/sessionController.js** - Handles booking logic
3. **routes/sessions.js** - API routes for session operations

### API Endpoints:

#### Book a Session
- **POST** `/api/sessions/book`
- **Auth Required**: Yes (Bearer token)
- **Body**:
```json
{
  "name": "John Doe",
  "location": "Central High School",
  "sessionType": "Fire Safety",
  "preferredDate": "2025-01-15",
  "sessionDetails": {
    "instructor": "John Smith",
    "duration": "2 hours",
    "price": 0,
    "slots": 20
  }
}
```

#### Get User's Bookings
- **GET** `/api/sessions/my-bookings`
- **Auth Required**: Yes

#### Get Single Booking
- **GET** `/api/sessions/:id`
- **Auth Required**: Yes

#### Cancel Booking
- **PUT** `/api/sessions/:id/cancel`
- **Auth Required**: Yes

#### Get All Bookings (Admin)
- **GET** `/api/sessions/admin/all`
- **Auth Required**: Yes

## Frontend Changes

### SafetySessions.jsx Updates:
- Added `isSubmitting` state for loading indicator
- Integrated API call to backend on form submission
- Enhanced error handling with toast notifications
- Added authentication check before booking
- Loading spinner on submit button during API call

### Toast Notifications:
- ✅ Success: When booking is confirmed
- ❌ Error: When booking fails or network error
- ⚠️ Warning: When user is not authenticated

## Database Schema

### SessionBooking Model:
```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  email: String,
  location: String,
  sessionType: String,
  preferredDate: Date,
  sessionDetails: {
    instructor: String,
    duration: String,
    price: Number,
    slots: Number
  },
  status: String (pending/confirmed/cancelled/completed),
  bookingDate: Date,
  timestamps: true
}
```

## How to Test

1. **Start Backend**:
   ```bash
   cd Backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Login** with credentials:
   - Email: user1@email.com
   - Password: user1234

4. **Navigate** to Safety Sessions page

5. **Book a Session**:
   - Click on any available session
   - Fill in the booking form
   - Click "Confirm Booking"
   - Check toast notification for success/error

6. **Verify in Database**:
   - Check MongoDB for the new booking entry
   - Check that userId matches the logged-in user

## Features Implemented

✅ Database persistence for all bookings
✅ User authentication required for booking
✅ Toast notifications for success/error states
✅ Loading states during API calls
✅ Error handling for network issues
✅ Automatic logout redirect if not authenticated
✅ Session details stored with booking
✅ Booking status tracking (pending/confirmed/cancelled/completed)

## Future Enhancements

- [ ] Email confirmation after booking
- [ ] View "My Bookings" page
- [ ] Cancel booking functionality from UI
- [ ] Admin dashboard to manage all bookings
- [ ] Payment integration for paid sessions
- [ ] Calendar view of bookings
- [ ] Booking reminders
