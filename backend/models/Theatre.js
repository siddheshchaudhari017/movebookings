import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a theatre name'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    screens: {
        type: Number,
        default: 1
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Theatre', theatreSchema);
