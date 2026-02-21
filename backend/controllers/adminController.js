import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';
import Show from '../models/Show.js';
import Theatre from '../models/Theatre.js';

export const getAdminStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const moviesCount = await Movie.countDocuments({ isActive: true });
        const bookingsCount = await Booking.countDocuments();

        // Calculate Total Revenue
        const bookings = await Booking.find();
        const revenue = bookings.reduce((acc, curr) => acc + curr.totalAmount, 0);

        // Category-wise Analytics (Industry)
        const industryStats = await Booking.aggregate([
            {
                $lookup: {
                    from: 'shows',
                    localField: 'show',
                    foreignField: '_id',
                    as: 'showDetails'
                }
            },
            { $unwind: '$showDetails' },
            {
                $lookup: {
                    from: 'movies',
                    localField: 'showDetails.movie',
                    foreignField: '_id',
                    as: 'movieDetails'
                }
            },
            { $unwind: '$movieDetails' },
            {
                $group: {
                    _id: '$movieDetails.industry',
                    bookings: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            }
        ]);

        res.json({
            users: usersCount,
            movies: moviesCount,
            bookings: bookingsCount,
            revenue: revenue.toFixed(2),
            industryStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate({
                path: 'show',
                populate: [
                    { path: 'movie', select: 'title posterImage' },
                    { path: 'theatre', select: 'name location' }
                ]
            })
            .sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all shows
// @route   GET /api/admin/shows
// @access  Private/Admin
export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find()
            .populate('movie', 'title posterImage')
            .populate('theatre', 'name city')
            .sort('-date');
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
