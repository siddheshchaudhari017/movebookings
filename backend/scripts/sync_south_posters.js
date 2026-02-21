import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';
import connectDB from '../config/db.js';

dotenv.config();

const moviesToUpdate = [
    'Devara: Part 1',
    'Vikram',
    'K.G.F: Chapter 2',
    'RRR',
    'Pushpa: The Rise'
];

const syncPosters = async () => {
    try {
        await connectDB();
        const apiKey = process.env.TMDB_API_KEY;

        for (const title of moviesToUpdate) {
            console.log(`Searching for: ${title}...`);
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
            const { data } = await axios.get(searchUrl);

            if (data.results && data.results.length > 0) {
                const posterPath = data.results[0].poster_path;
                const fullPosterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

                const res = await Movie.updateOne(
                    { title: new RegExp(`^${title}$`, 'i') },
                    { posterImage: fullPosterUrl }
                );

                if (res.modifiedCount > 0) {
                    console.log(`✅ Updated ${title} with ${fullPosterUrl}`);
                } else {
                    console.log(`ℹ️ ${title} already up to date or not found.`);
                }
            } else {
                console.log(`❌ No results found for ${title}`);
            }
        }

        console.log('Sync complete.');
        process.exit();
    } catch (error) {
        console.error('Error syncing posters:', error.message);
        process.exit(1);
    }
};

syncPosters();
