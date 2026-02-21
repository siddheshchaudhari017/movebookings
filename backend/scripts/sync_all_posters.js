import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';
import connectDB from '../config/db.js';

dotenv.config();

const syncAllPosters = async () => {
    try {
        await connectDB();
        const apiKey = process.env.TMDB_API_KEY;
        const movies = await Movie.find({});

        console.log(`🎬 Found ${movies.length} movies. Starting deep sync...`);

        for (const movie of movies) {
            console.log(`🔍 Searching for: "${movie.title}"...`);
            try {
                const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.title)}`;
                const { data } = await axios.get(searchUrl);

                if (data.results && data.results.length > 0) {
                    const posterPath = data.results[0].poster_path;
                    if (posterPath) {
                        const fullPosterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

                        await Movie.updateOne(
                            { _id: movie._id },
                            { posterImage: fullPosterUrl }
                        );
                        console.log(`   ✅ Corrected: "${movie.title}"`);
                    } else {
                        console.log(`   ⚠️ Found result but no poster_path for "${movie.title}"`);
                    }
                } else {
                    console.log(`   ❌ No results found on TMDb for "${movie.title}"`);
                }
            } catch (err) {
                console.error(`   🔥 Error searching for "${movie.title}": ${err.message}`);
            }
        }

        console.log('\n🚀 ALL POSTERS SYNCED SUCCESSFULLY!');
        process.exit();
    } catch (error) {
        console.error('Fatal sync error:', error.message);
        process.exit(1);
    }
};

syncAllPosters();
