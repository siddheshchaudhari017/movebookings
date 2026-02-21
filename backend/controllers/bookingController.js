import Booking from '../models/Booking.js';
import Show from '../models/Show.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    const { showId, seats, totalAmount, taxAmount } = req.body;

    try {
        const show = await Show.findById(showId);

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        // Check if seats are already booked
        const isAlreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
        if (isAlreadyBooked) {
            return res.status(400).json({ message: 'One or more seats already booked' });
        }

        // Atomic update to add seats to bookedSeats
        // This prevents double booking if two users try to book the same seats simultaneously
        const updatedShow = await Show.findOneAndUpdate(
            {
                _id: showId,
                bookedSeats: { $nin: seats } // Ensure none of the requested seats are already in bookedSeats
            },
            {
                $push: { bookedSeats: { $each: seats } }
            },
            { new: true }
        );

        if (!updatedShow) {
            return res.status(400).json({ message: 'Seats were just booked by someone else. Please try again.' });
        }

        const booking = await Booking.create({
            user: req.user._id,
            show: showId,
            seats,
            totalAmount,
            taxAmount,
            paymentStatus: 'Completed', // Dummy payment logic: treat as completed
            paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate({
            path: 'show',
            populate: ['movie', 'theatre']
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate({
            path: 'show',
            populate: ['movie', 'theatre']
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
