import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    genre: {
        type: [String],
        required: [true, 'Please add at least one genre']
    },
    language: {
        type: String,
        required: [true, 'Please add a language']
    },
    industry: {
        type: String,
        required: [true, 'Please add an industry'],
        enum: ['Bollywood', 'Hollywood', 'Tollywood', 'South Movies', 'Other']
    },
    duration: {
        type: Number, // in minutes
        required: [true, 'Please add duration']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please add release date']
    },
    posterImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    trailerUrl: {
        type: String,
        required: false
    },
    cast: {
        type: [String],
        required: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    tmdbId: {
        type: Number,
        unique: true,
        sparse: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Movie', movieSchema);
