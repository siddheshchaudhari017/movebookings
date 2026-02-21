import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const testTMDb = async () => {
    const API_KEY = process.env.TMDB_API_KEY;
    console.log(`Using API Key: ${API_KEY}`);
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        console.log(`Fetching from: ${url}`);
        const response = await axios.get(url);
        console.log('Success! Popular movies count:', response.data.results.length);
        console.log('First movie:', response.data.results[0].title);
    } catch (error) {
        console.error('Test Failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
};

testTMDb();
