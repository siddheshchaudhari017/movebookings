import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    screen: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, // e.g., '10:00 AM', '1:30 PM'
        required: true
    },
    price: {
        regular: { type: Number, required: true },
        premium: { type: Number, required: true },
        vip: { type: Number, required: true }
    },
    totalSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: [String], // Array of seat IDs like 'A1', 'B5'
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Show', showSchema);
