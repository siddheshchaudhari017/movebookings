import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

const tmdbFetch = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error(`TMDb API Error (${endpoint}):`, error.response?.data || error.message);
        throw error;
    }
};

export const tmdbService = {
    // Top Rated Hollywood
    getTopRatedMovies: () => tmdbFetch('/movie/top_rated', { language: 'en-US', page: 1 }),

    // Hindi Movies (Bollywood)
    getHindiMovies: () => tmdbFetch('/discover/movie', {
        with_original_language: 'hi',
        sort_by: 'popularity.desc',
        page: 1
    }),

    // South Movies (Tollywood/Telugu, Tamil, etc.)
    getSouthMovies: () => tmdbFetch('/discover/movie', {
        with_original_language: 'te|ta|kn|ml',
        sort_by: 'popularity.desc',
        page: 1
    }),

    // English Movies
    getEnglishMovies: () => tmdbFetch('/discover/movie', {
        with_original_language: 'en',
        sort_by: 'popularity.desc',
        page: 1
    }),

    // Fetch movie details by ID
    getMovieDetails: (id) => tmdbFetch(`/movie/${id}`, { append_to_response: 'credits' }),

    // Search movies
    searchMovies: (query) => tmdbFetch('/search/movie', { query })
};

export default tmdbService;
