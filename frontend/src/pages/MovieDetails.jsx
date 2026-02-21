import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Calendar, Ticket, Play, Info, Share2, Heart } from 'lucide-react';
import MovieImage from '../components/MovieImage';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center dark:bg-cinema-black">
            <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!movie) return <div className="p-20 text-center">Movie not found.</div>;

    return (
        <div className="min-h-screen dark:bg-cinema-black pb-20">
            {/* Backdrop Hero */}
            <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
                <MovieImage
                    src={movie.posterImage}
                    className="w-full h-full object-cover blur-sm opacity-30 scale-110"
                    alt="backdrop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-cinema-black via-transparent to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 px-4 md:px-12 py-10 flex flex-col md:flex-row gap-8 items-end">
                    <div className="shrink-0 w-48 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 z-10 animate-fade-in">
                        <MovieImage src={movie.posterImage} className="w-full h-full" alt={movie.title} />
                    </div>

                    <div className="flex-1 space-y-4 animate-slide-up mb-4">
                        <div className="flex flex-wrap gap-2">
                            {movie.genre.map(g => (
                                <span key={g} className="px-3 py-1 bg-rose-600/20 text-rose-600 text-xs font-bold rounded-full">{g}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold dark:text-white">{movie.title}</h1>
                        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold">{movie.rating} / 10</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-5 h-5" />
                                <span>{movie.duration} mins</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-5 h-5" />
                                <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <button className="p-3 glass-card !rounded-full hover:bg-rose-600 hover:text-white transition-all">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="p-3 glass-card !rounded-full hover:bg-rose-600 hover:text-white transition-all">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                            <Info className="w-6 h-6 text-rose-600" /> About the Movie
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
                            "{movie.description}"
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold dark:text-white">Cast</h2>
                        <div className="flex flex-wrap gap-4">
                            {movie.cast.map(c => (
                                <div key={c} className="px-4 py-2 glass-card dark:text-gray-300 text-sm">
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                            <Play className="w-6 h-6 text-rose-600" /> Official Trailer
                        </h2>
                        <div className="aspect-video rounded-3xl overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Booking */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 glass-card p-6 space-y-6 bg-rose-600 text-white border-none shadow-rose-600/20">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Book Your Ticket</h3>
                            <p className="text-rose-100 text-sm">Select from the best theatres and enjoy the show!</p>
                        </div>

                        <button
                            onClick={() => navigate(`/book/${movie._id}`)}
                            className="w-full py-4 bg-white text-rose-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow-xl"
                        >
                            <Ticket className="w-6 h-6 border-none" /> Select Showtimes
                        </button>

                        <div className="text-xs text-center text-rose-200">
                            * Cancellation policies apply. Check show details for more.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
