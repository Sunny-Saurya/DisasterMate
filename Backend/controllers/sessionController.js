import SessionBooking from '../models/SessionBooking.js';

// Book a session
export const bookSession = async (req, res) => {
    try {
        const { name, location, sessionType, preferredDate, sessionDetails } = req.body;

        // Validate required fields
        if (!name || !location || !sessionType || !preferredDate) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Get user email from authenticated user
        const userEmail = req.user.email;

        // Create booking
        const booking = await SessionBooking.create({
            userId: req.user._id,
            name,
            email: userEmail,
            location,
            sessionType,
            preferredDate: new Date(preferredDate),
            sessionDetails: sessionDetails || {},
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Session booked successfully!',
            data: booking
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to book session',
            error: error.message
        });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await SessionBooking.find({ userId: req.user._id })
            .sort({ bookingDate: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

// Get single booking
export const getBooking = async (req, res) => {
    try {
        const booking = await SessionBooking.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });

    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await SessionBooking.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });

    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await SessionBooking.find()
            .populate('userId', 'name email')
            .sort({ bookingDate: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};
