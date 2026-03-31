import mongoose from 'mongoose';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const checkDB = async () => {
    try {
        await connectDB();
        const count = await Movie.countDocuments();
        console.log(`Total movies in DB: ${count}`);
        const activeCount = await Movie.countDocuments({ isActive: true });
        console.log(`Active movies in DB: ${activeCount}`);

        if (count > 0) {
            const sample = await Movie.findOne();
            console.log('Sample movie:', JSON.stringify(sample, null, 2));
        }

        process.exit();
    } catch (error) {
        console.error('Check failed:', error.message);
        process.exit(1);
    }
};

checkDB();
