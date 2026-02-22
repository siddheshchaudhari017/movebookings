import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';

dotenv.config();

const countMovies = async () => {
    try {
        await connectDB();
        const count = await Movie.countDocuments();
        console.log(`TOTAL_MOVIES_IN_DB: ${count}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

countMovies();
