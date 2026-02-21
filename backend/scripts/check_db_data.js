import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Movie from '../models/Movie.js';
import Theatre from '../models/Theatre.js';
import Show from '../models/Show.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        const moviesCount = await Movie.countDocuments({});
        const activeMoviesCount = await Movie.countDocuments({ isActive: true });
        const theatresCount = await Theatre.countDocuments({});
        const activeTheatresCount = await Theatre.countDocuments({ isActive: true });
        const showsCount = await Show.countDocuments({});
        const adminsCount = await User.countDocuments({ role: 'admin' });

        console.log('--- Database Stats ---');
        console.log(`Movies: ${moviesCount} (Active: ${activeMoviesCount})`);
        console.log(`Theatres: ${theatresCount} (Active: ${activeTheatresCount})`);
        console.log(`Shows: ${showsCount}`);
        console.log(`Admins: ${adminsCount}`);

        if (adminsCount > 0) {
            const sampleAdmin = await User.findOne({ isAdmin: true });
            console.log('Sample Admin:', sampleAdmin.email);
        }

        if (moviesCount > 0) {
            const sampleMovie = await Movie.findOne();
            console.log('Sample Movie:', sampleMovie.title, 'Active:', sampleMovie.isActive);
        }

        if (theatresCount > 0) {
            const sampleTheatre = await Theatre.findOne();
            console.log('Sample Theatre:', sampleTheatre.name, 'Active:', sampleTheatre.isActive);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
