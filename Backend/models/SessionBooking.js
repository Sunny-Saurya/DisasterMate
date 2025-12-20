import mongoose from 'mongoose';

const sessionBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    sessionType: {
        type: String,
        required: true,
        trim: true
    },
    preferredDate: {
        type: Date,
        required: true
    },
    sessionDetails: {
        instructor: String,
        duration: String,
        price: Number,
        slots: Number
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
sessionBookingSchema.index({ userId: 1, bookingDate: -1 });
sessionBookingSchema.index({ sessionType: 1 });

export default mongoose.model('SessionBooking', sessionBookingSchema);
