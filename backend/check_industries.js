import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';

dotenv.config();

const checkIndustries = async () => {
    try {
        await connectDB();
        const industries = await Movie.distinct('industry');
        console.log('INDUSTRIES_IN_DB:', industries);
        const sample = await Movie.findOne();
        console.log('SAMPLE_MOVIE:', JSON.stringify(sample, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkIndustries();
