import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Movie from '../models/Movie.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const syncMovies = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB for TMDb Local Sync...');

        const dataPath = path.join(process.cwd(), 'data', 'tmdb_data.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const tmdbData = JSON.parse(rawData);

        const categories = [
            { key: 'hindi', industry: 'Bollywood', name: 'Hindi' },
            { key: 'english', industry: 'Hollywood', name: 'English' },
            { key: 'top_rated', industry: 'Hollywood', name: 'Top Rated' },
            { key: 'south', industry: 'South Movies', name: 'South' }
        ];

        for (const cat of categories) {
            console.log(`Syncing ${cat.name} movies from local cache...`);
            const movies = tmdbData[cat.key];

            for (const item of movies) {
                // Check if movie already exists by TMDB ID or Title
                let existing = await Movie.findOne({
                    $or: [{ tmdbId: item.id }, { title: item.title }]
                });

                const trailerUrl = item.youtube_id
                    ? `https://www.youtube.com/watch?v=${item.youtube_id}`
                    : `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + ' trailer')}`;

                const movieData = {
                    title: item.title,
                    description: item.overview,
                    genre: ['Action', 'Drama', 'Thriller'], // Default for now
                    language: item.original_language,
                    industry: cat.industry,
                    duration: 120 + Math.floor(Math.random() * 40),
                    releaseDate: new Date(item.release_date),
                    posterImage: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    trailerUrl: trailerUrl,
                    cast: ['Lead Actor', 'Co-Star'],
                    rating: item.vote_average,
                    tmdbId: item.id
                };

                if (existing) {
                    await Movie.findByIdAndUpdate(existing._id, movieData);
                    console.log(`Updated: ${item.title}`);
                } else {
                    await Movie.create(movieData);
                    console.log(`Created: ${item.title}`);
                }
            }
        }

        console.log('TMDb Local Sync Complete!');
        process.exit();
    } catch (error) {
        console.error('Local Sync failed:', error.message);
        process.exit(1);
    }
};

syncMovies();
