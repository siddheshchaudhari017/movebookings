import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const verifyUpdate = async () => {
    try {
        const movie = await Movie.findOne({ title: 'Pathaan' });
        if (movie) {
            console.log('✅ Verification successful!');
            console.log('Title:', movie.title);
            console.log('Poster URL:', movie.posterImage);
        } else {
            console.log('❌ Movie not found.');
        }
        process.exit();
    } catch (error) {
        console.error('❌ Error during verification:', error.message);
        process.exit(1);
    }
};

verifyUpdate();
