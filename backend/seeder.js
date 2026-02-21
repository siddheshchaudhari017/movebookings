import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Movie from './models/Movie.js';
import Theatre from './models/Theatre.js';
import Show from './models/Show.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Movie.deleteMany();
        await Theatre.deleteMany();
        await Show.deleteMany();

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });

        const movieData = [
            // Bollywood (Hindi)
            {
                title: 'Animal',
                description: 'A father-son bond carved in blood and vengeance.',
                genre: ['Action', 'Crime', 'Drama'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 201,
                releaseDate: new Date('2023-12-01'),
                posterImage: 'https://image.tmdb.org/t/p/w500/sy6vUn7S6RiS8U7mPAs0vY7iX6f.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=DydmpavqHaU',
                cast: ['Ranbir Kapoor', 'Anil Kapoor', 'Rashmika Mandanna'],
                rating: 6.8
            },
            {
                title: 'Pathaan',
                description: 'An Indian agent races against a doomsday clock as a ruthless mercenary returns with a vendetta.',
                genre: ['Action', 'Thriller'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 146,
                releaseDate: new Date('2023-01-25'),
                posterImage: 'https://image.tmdb.org/t/p/w500/a6b3d2e1f0g9h8i7j6k5l4m3n2o.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=vqu4z34wENw',
                cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'],
                rating: 5.9
            },
            {
                title: 'Jawan',
                description: 'A high-octane action thriller which outlines the emotional journey of a man set to rectify wrongs in society.',
                genre: ['Action', 'Thriller'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 169,
                releaseDate: new Date('2023-09-07'),
                posterImage: 'https://image.tmdb.org/t/p/w500/zzWc2c7tC7XvS71t3BtebV6qCqF.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=COv527zjdko',
                cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
                rating: 7.0
            },
            {
                title: 'Dangal',
                description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory.',
                genre: ['Biography', 'Drama', 'Sport'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 161,
                releaseDate: new Date('2016-12-23'),
                posterImage: 'https://image.tmdb.org/t/p/w500/p2lVAcPuRPSO8Al6hDDGw0OgMi8.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=x_7YlGv9u1g',
                cast: ['Aamir Khan', 'Sakshi Tanwar'],
                rating: 8.3
            },
            {
                title: 'Stree 2',
                description: 'The town of Chanderi is being haunted again. This time, by a headless entity called Sarkata.',
                genre: ['Comedy', 'Horror'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 147,
                releaseDate: new Date('2024-08-15'),
                posterImage: 'https://image.tmdb.org/t/p/w500/tP3c9v1d4g7h0j2k5l8m1n4p7q0.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=KVnheXyw8vk',
                cast: ['Rajkummar Rao', 'Shraddha Kapoor'],
                rating: 7.2
            },
            {
                title: 'Fighter',
                description: 'Top Indian air force pilots come together in the face of imminent danger.',
                genre: ['Action', 'Thriller'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 166,
                releaseDate: new Date('2024-01-25'),
                posterImage: 'https://image.tmdb.org/t/p/w500/5on9sR0rK8WstI78S9p9B0nOaTM.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=DAsR_LqLidA',
                cast: ['Hrithik Roshan', 'Deepika Padukone'],
                rating: 6.9
            },
            {
                title: 'Bhool Bhulaiyaa 3',
                description: 'Ruhaan travels to a haunted castle in Bengal to confront two vengeful spirits.',
                genre: ['Comedy', 'Horror'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 158,
                releaseDate: new Date('2024-11-01'),
                posterImage: 'https://image.tmdb.org/t/p/w500/3U6Y9XyD0X9F4h8j8Z1gF7hF9L8.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=DAsR_LqLidA',
                cast: ['Kartik Aaryan', 'Vidya Balan'],
                rating: 6.5
            },
            {
                title: 'Kill',
                description: 'A commando faces an army of bandits on a train journey.',
                genre: ['Action', 'Thriller'],
                language: 'Hindi',
                industry: 'Bollywood',
                duration: 105,
                releaseDate: new Date('2024-07-05'),
                posterImage: 'https://image.tmdb.org/t/p/w500/7Wv9M9Yv7K8w7rI8V9Q8L9S9T9.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=7X9fN_qfxyY',
                cast: ['Lakshya', 'Raghav Juyal'],
                rating: 7.4
            },

            // Hollywood (English)
            {
                title: 'Interstellar',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                genre: ['Sci-Fi', 'Drama'],
                language: 'English',
                industry: 'Hollywood',
                duration: 169,
                releaseDate: new Date('2014-11-07'),
                posterImage: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EzuH6vCUfe0bpIow7n.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Matthew McConaughey', 'Anne Hathaway'],
                rating: 8.7
            },
            {
                title: 'Superman',
                description: 'The story of Superman\'s journey to reconcile his Kryptonian heritage with his adopted human upbringing.',
                genre: ['Action', 'Adventure', 'Sci-Fi'],
                language: 'English',
                industry: 'Hollywood',
                duration: 140,
                releaseDate: new Date('2025-07-11'),
                posterImage: 'https://image.tmdb.org/t/p/w500/7Wv9M9Yv7K8w7rI8V9Q8L9S9T9.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['David Corenswet', 'Rachel Brosnahan'],
                rating: 8.5
            },
            {
                title: 'Jurassic World: Rebirth',
                description: 'Five years after the events of Dominion, humans and dinosaurs coexist in a fragile balance.',
                genre: ['Action', 'Adventure', 'Sci-Fi'],
                language: 'English',
                industry: 'Hollywood',
                duration: 125,
                releaseDate: new Date('2025-07-02'),
                posterImage: 'https://image.tmdb.org/t/p/w500/sh779KpkvSTjTM96Pb9uCj97t9S.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Scarlett Johansson', 'Jonathan Bailey'],
                rating: 7.8
            },

            // South Movies
            {
                title: 'Kalki 2898 AD',
                description: 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world.',
                genre: ['Action', 'Sci-Fi'],
                language: 'Telugu',
                industry: 'Tollywood',
                duration: 181,
                releaseDate: new Date('2024-06-27'),
                posterImage: 'https://image.tmdb.org/t/p/w500/mXf5O2Qv8qSJlQePVsx3KoJlQPa.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Prabhas', 'Deepika Padukone', 'Amitabh Bachchan'],
                rating: 7.9
            },
            {
                title: 'Manjummel Boys',
                description: 'A group of friends gets trapped in the Guna Caves in Kodaikanal.',
                genre: ['Adventure', 'Drama', 'Thriller'],
                language: 'Malayalam',
                industry: 'South Movies',
                duration: 135,
                releaseDate: new Date('2024-02-22'),
                posterImage: 'https://image.tmdb.org/t/p/w500/aHk5c7c7v8P9v7X8Y9Z0a1b2c3d.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Soubin Shahir', 'Sreenath Bhasi'],
                rating: 8.4
            },
            {
                title: 'Maharaja',
                description: 'A barber seeks vengeance after his home is burglarized, telling police his "Lakshmi" is missing.',
                genre: ['Action', 'Drama', 'Thriller'],
                language: 'Tamil',
                industry: 'South Movies',
                duration: 142,
                releaseDate: new Date('2024-06-14'),
                posterImage: 'https://image.tmdb.org/t/p/w500/bC8v9W1X2Y3Z4A5B6C7D8E9F0G1.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Vijay Sethupathi', 'Anurag Kashyap'],
                rating: 8.6
            },
            {
                title: 'Aavesham',
                description: 'Three teenagers come to Bangalore for their engineering education and get involved in a fight with seniors.',
                genre: ['Action', 'Comedy'],
                language: 'Malayalam',
                industry: 'South Movies',
                duration: 158,
                releaseDate: new Date('2024-04-11'),
                posterImage: 'https://image.tmdb.org/t/p/w500/cC8v9W1X2Y3Z4A5B6C7D8E9F0G1.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
                cast: ['Fahadh Faasil'],
                rating: 8.0
            },
            {
                title: 'The Dark Knight',
                description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
                genre: ['Action', 'Crime', 'Drama'],
                language: 'English',
                industry: 'Hollywood',
                duration: 152,
                releaseDate: new Date('2008-07-18'),
                posterImage: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QEQmtvMfsOut9Ja.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
                cast: ['Christian Bale', 'Heath Ledger'],
                rating: 9.0
            },
            {
                title: 'Oppenheimer',
                description: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
                genre: ['Drama', 'History'],
                language: 'English',
                industry: 'Hollywood',
                duration: 180,
                releaseDate: new Date('2023-07-21'),
                posterImage: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
                cast: ['Cillian Murphy', 'Emily Blunt'],
                rating: 8.4
            },
            {
                title: 'Deadpool & Wolverine',
                description: 'A listless Wade Wilson toils in civilian life. His days as the morally flexible mercenary, Deadpool, behind him.',
                genre: ['Action', 'Comedy', 'Sci-Fi'],
                language: 'English',
                industry: 'Hollywood',
                duration: 128,
                releaseDate: new Date('2024-07-26'),
                posterImage: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=73_1biulkYk',
                cast: ['Ryan Reynolds', 'Hugh Jackman'],
                rating: 8.1
            },
            {
                title: 'Dune: Part Two',
                description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators.',
                genre: ['Sci-Fi', 'Adventure'],
                language: 'English',
                industry: 'Hollywood',
                duration: 166,
                releaseDate: new Date('2024-03-01'),
                posterImage: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
                cast: ['Timothée Chalamet', 'Zendaya'],
                rating: 8.9
            },

            // Tollywood / South (Telugu, Tamil, etc.)
            {
                title: 'Pushpa: The Rise',
                description: 'Violence erupts between red sandalwood smugglers and the police in the Seshachalam forests.',
                genre: ['Action', 'Crime', 'Drama'],
                language: 'Telugu',
                industry: 'Tollywood',
                duration: 179,
                releaseDate: new Date('2021-12-17'),
                posterImage: 'https://image.tmdb.org/t/p/w500/rYPqR2aF4d0n4j9W7h9t5d5z3a5.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=Q1NKMPhP8PY',
                cast: ['Allu Arjun', 'Rashmika Mandanna'],
                rating: 7.6
            },
            {
                title: 'RRR',
                description: 'A fictitious story about two legendary revolutionaries and their journey away from home.',
                genre: ['Action', 'Drama'],
                language: 'Telugu',
                industry: 'Tollywood',
                duration: 187,
                releaseDate: new Date('2022-03-25'),
                posterImage: 'https://image.tmdb.org/t/p/w500/wE0I6efAW4cDDmZQWtwZMOW44EJ.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=NgBoMJy386M',
                cast: ['N.T. Rama Rao Jr.', 'Ram Charan'],
                rating: 7.8
            },
            {
                title: 'K.G.F: Chapter 2',
                description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes.',
                genre: ['Action', 'Crime', 'Drama'],
                language: 'Kannada',
                industry: 'South Movies',
                duration: 168,
                releaseDate: new Date('2022-04-14'),
                posterImage: 'https://image.tmdb.org/t/p/w500/r0s9N7m4V0q5X7j7h4d1z3b3w6m.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=JKa05nyU8Qo',
                cast: ['Yash', 'Sanjay Dutt'],
                rating: 8.3
            },
            {
                title: 'Devara: Part 1',
                description: 'An epic action saga set against coastal lands, which brief about the emotionally charged journey of a man.',
                genre: ['Action', 'Drama'],
                language: 'Telugu',
                industry: 'Tollywood',
                duration: 178,
                releaseDate: new Date('2024-09-27'),
                posterImage: 'https://image.tmdb.org/t/p/w500/rNn7P1g5R4Z6t7h1j3m4f2c0s9q.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=7X9fN_qfxyY',
                cast: ['N.T. Rama Rao Jr.', 'Saif Ali Khan', 'Janhvi Kapoor'],
                rating: 7.1
            },
            {
                title: 'Vikram',
                description: 'A high-octane action film where a special agent investigates a series of murders.',
                genre: ['Action', 'Crime', 'Thriller'],
                language: 'Tamil',
                industry: 'South Movies',
                duration: 175,
                releaseDate: new Date('2022-06-03'),
                posterImage: 'https://image.tmdb.org/t/p/w500/r1PjEPwT5B7f7a7jV0d3xV4jV5X.jpg',
                trailerUrl: 'https://www.youtube.com/watch?v=OKBMCL-frPU',
                cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
                rating: 8.3
            }
        ];

        const movies = await Movie.insertMany(movieData);

        const theatres = await Theatre.insertMany([
            { name: 'PVR IMAX', location: 'Ambience Mall', city: 'Delhi', screens: 5 },
            { name: 'Cinepolis', location: 'DLF Avenue', city: 'Delhi', screens: 4 },
            { name: 'INOX Insignia', location: 'Nehru Place', city: 'Delhi', screens: 2 },
            { name: 'Miraj Cinemas', location: 'Janakpuri', city: 'Delhi', screens: 3 }
        ]);

        // Create Shows for next 7 days
        const times = ['09:30 AM', '12:45 PM', '04:00 PM', '07:15 PM', '10:30 PM'];

        for (const movie of movies) {
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);

                // Add 2-3 shows per movie per day
                const showsPerDay = 2 + Math.floor(Math.random() * 2);
                for (let j = 0; j < showsPerDay; j++) {
                    const theatre = theatres[Math.floor(Math.random() * theatres.length)];

                    // Pre-populate some booked seats for testing
                    const bookedSeats = ['A1', 'A2', 'B5', 'C8', 'D10', 'E4', 'F1', 'G12'].filter(() => Math.random() > 0.5);

                    await Show.create({
                        movie: movie._id,
                        theatre: theatre._id,
                        screen: Math.floor(Math.random() * theatre.screens) + 1,
                        date: date,
                        time: times[j % times.length],
                        price: { regular: 250, premium: 450, vip: 800 },
                        totalSeats: 120,
                        bookedSeats: bookedSeats
                    });
                }
            }
        }

        console.log(`🚀 MASSIVE CATEGORIZED SEED COMPLETE!`);
        console.log(`🎬 Movies: ${movies.length}`);
        console.log(`🏢 Theatres: ${theatres.length}`);
        console.log(`🎟️ Shows: ${await Show.countDocuments()}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
