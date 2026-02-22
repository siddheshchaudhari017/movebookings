import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Sparkles, TrendingUp, Trophy, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MovieSection from '../components/MovieSection';
import API_URL from '../config';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const categories = ['All', 'Bollywood', 'Hollywood', 'Tollywood', 'South Movies'];

    // Movie Wall Component for Background
    const MovieWall = () => {
        const displayMovies = movies.length > 0 ? [...movies, ...movies, ...movies].slice(0, 24) : [];
        if (displayMovies.length === 0) return null;

        return (
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 z-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 opacity-20 pointer-events-none overflow-hidden"
            >
                {displayMovies.map((movie, i) => (
                    <motion.div
                        key={`${movie._id}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, Math.random() * 20 - 10, 0],
                            rotate: [0, Math.random() * 4 - 2, 0]
                        }}
                        transition={{
                            opacity: { duration: 1, delay: i * 0.05 },
                            scale: { duration: 1, delay: i * 0.05 },
                            y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    >
                        <img
                            src={movie.poster}
                            alt=""
                            className="w-full h-full object-cover blur-[1px]"
                        />
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url = `${API_URL}/api/movies`;
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (activeCategory !== 'All') params.append('industry', activeCategory);

                const { data } = await axios.get(`${url}?${params.toString()}`);
                setMovies(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [search, activeCategory]);

    // Filtering logic for sections
    const bollywoodMovies = movies.filter(m => m.industry === 'Bollywood');
    const hollywoodMovies = movies.filter(m => m.industry === 'Hollywood');
    const tollywoodMovies = movies.filter(m => m.industry === 'Tollywood');
    const southMovies = movies.filter(m => m.industry === 'South Movies' || m.industry === 'Tollywood');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="space-y-12 pb-20 dark:bg-cinema-black">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center px-4 md:px-12 overflow-hidden">
                <MovieWall />

                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50/50 dark:from-cinema-black dark:via-cinema-black/40 dark:to-cinema-black/60"></div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 max-w-4xl space-y-8"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600/10 border border-rose-600/20 text-rose-600 text-xs font-bold rounded-full backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4" /> REINVENTING THE CINEMA EXPERIENCE
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-9xl font-black dark:text-white leading-[1] tracking-tighter"
                    >
                        Your Gateway to <br />
                        <span className="text-rose-600 inline-block">
                            Blockbusters.
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed font-medium"
                    >
                        Discover, book, and enjoy the latest movies in premium theatres across the city. Experience the magic of the big screen.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="btn-primary group !py-5 !px-10 flex items-center gap-3 text-xl font-bold shadow-2xl shadow-rose-600/30">
                            Explore Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Filter & Search Bar */}
            <div className="px-4 md:px-12 sticky top-20 z-40">
                <div className="glass-card p-4 flex flex-col lg:flex-row gap-6 items-center justify-between border-none shadow-2xl">
                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                                    ${activeCategory === cat
                                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by movie name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-3.5 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-rose-600/30 rounded-2xl outline-none transition-all dark:text-white text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Movie Sections */}
            <div className="space-y-20">
                {activeCategory === 'All' ? (
                    <>
                        <MovieSection
                            title={<span><TrendingUp className="inline w-6 h-6 mr-3 text-rose-500" /> Trending in Bollywood</span>}
                            movies={bollywoodMovies}
                            loading={loading}
                        />
                        <MovieSection
                            title={<span><Trophy className="inline w-6 h-6 mr-3 text-yellow-500" /> Top Rated Hollywood</span>}
                            movies={hollywoodMovies.sort((a, b) => b.rating - a.rating)}
                            loading={loading}
                        />
                        <MovieSection
                            title="New South Releases"
                            movies={southMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))}
                            loading={loading}
                        />
                        <MovieSection
                            title="Tollywood Blockbusters"
                            movies={tollywoodMovies}
                            loading={loading}
                        />
                    </>
                ) : (
                    <MovieSection
                        title={`${activeCategory} Movies`}
                        movies={movies}
                        loading={loading}
                    />
                )}
            </div>

        </div>
    );
};

export default Home;
