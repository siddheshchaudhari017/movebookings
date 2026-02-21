import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Film } from 'lucide-react';
import MovieImage from './MovieImage';

const MovieSection = ({ title, movies, loading }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!loading && (!movies || movies.length === 0)) return null;

    return (
        <section className="space-y-6 relative px-4 md:px-12 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tight flex items-center gap-3">
                        {title}
                    </h2>
                    <div className="h-1 w-12 bg-rose-600 rounded-full" />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-rose-600 hover:text-white transition-all shadow-sm hover:shadow-rose-600/20 group translate-y-2 hover:translate-y-0"
                    >
                        <ChevronLeft className="w-5 h-5 group-active:scale-95" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:bg-rose-600 hover:text-white transition-all shadow-sm hover:shadow-rose-600/20 group translate-y-2 hover:translate-y-0"
                    >
                        <ChevronRight className="w-5 h-5 group-active:scale-95" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="w-[200px] md:w-[260px] flex-shrink-0 aspect-[2/3] bg-gray-100 dark:bg-white/5 rounded-[2rem] animate-pulse flex items-center justify-center">
                            <Film className="w-8 h-8 text-gray-300 dark:text-gray-700 animate-bounce" />
                        </div>
                    ))
                ) : (
                    movies.map(movie => (
                        <Link
                            key={movie._id}
                            to={`/movie/${movie._id}`}
                            className="w-[200px] md:w-[260px] flex-shrink-0 group relative block aspect-[2/3] overflow-hidden rounded-[1.8rem] bg-gray-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 snap-start border border-transparent dark:hover:border-white/10"
                        >
                            {/* Poster Image */}
                            <MovieImage
                                src={movie.posterImage}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                alt={movie.title}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-transparent transition-all duration-500" />

                            {/* Rating Badge */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl flex items-center gap-1.5 border border-white/10 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-black text-white">{movie.rating.toFixed(1)}</span>
                            </div>

                            {/* Info */}
                            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
                                <h3 className="font-black text-white truncate text-xl mb-1 group-hover:text-rose-500 transition-colors uppercase tracking-tight">
                                    {movie.title}
                                </h3>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {movie.genre.slice(0, 2).map((g, idx) => (
                                        <span key={idx} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{g}</span>
                                    ))}
                                </div>

                                {/* Book Now Button */}
                                <div className="mt-2 overflow-hidden">
                                    <button className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black tracking-[0.2em] rounded-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-lg shadow-rose-600/30">
                                        BOOK TICKETS NOW
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
};

export default MovieSection;
