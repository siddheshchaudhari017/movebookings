import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const updatePathaanImage = async () => {
    try {
        const movie = await Movie.findOneAndUpdate(
            { title: 'Pathaan' },
            { posterImage: 'https://fs1.extraimage.org/picupto/2023/01/28/Pathaan-2023-Hindi-Movie-1080p-HDTC-2.1GB-Download.jpg' },
            { new: true }
        );

        if (movie) {
            console.log('✅ Pathaan image updated successfully!');
            console.log('New URL:', movie.posterImage);
        } else {
            console.log('❌ Pathaan movie not found in database.');
        }
        process.exit();
    } catch (error) {
        console.error('❌ Error updating Pathaan image:', error.message);
        process.exit(1);
    }
};

updatePathaanImage();
