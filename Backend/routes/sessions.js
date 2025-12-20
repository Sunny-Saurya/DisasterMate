import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    bookSession,
    getUserBookings,
    getBooking,
    cancelBooking,
    getAllBookings
} from '../controllers/sessionController.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/book', protect, bookSession);
router.get('/my-bookings', protect, getUserBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/cancel', protect, cancelBooking);
router.get('/admin/all', protect, getAllBookings);

export default router;
