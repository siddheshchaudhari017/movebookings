import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, ChevronRight, Clock } from 'lucide-react';

const ShowSelection = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, showsRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/movies/${movieId}`),
                    axios.get(`http://localhost:5000/api/cinema/shows/movie/${movieId}?date=${selectedDate}`)
                ]);
                setMovie(movieRes.data);
                setShows(showsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [movieId, selectedDate]);

    // Group shows by theatre
    const groupedShows = shows.reduce((acc, show) => {
        const theatreId = show.theatre._id;
        if (!acc[theatreId]) {
            acc[theatreId] = {
                theatre: show.theatre,
                shows: []
            };
        }
        acc[theatreId].shows.push(show);
        return acc;
    }, {});

    if (loading) return <div className="p-20 text-center dark:text-white">Loading shows...</div>;

    return (
        <div className="min-h-screen dark:bg-cinema-black py-12 px-4 md:px-12 space-y-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">{movie?.title}</h1>
                        <p className="text-gray-500">{movie?.language} • {movie?.genre.join(', ')}</p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {[0, 1, 2, 3, 4, 5].map(offset => {
                            const date = new Date();
                            date.setDate(date.getDate() + offset);
                            const dateStr = date.toISOString().split('T')[0];
                            const isSelected = selectedDate === dateStr;

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className={`flex flex-col items-center min-w-[70px] p-2 rounded-xl border transition-all ${isSelected
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20'
                                            : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 dark:text-gray-300 hover:border-rose-600/50'
                                        }`}
                                >
                                    <span className="text-xs uppercase font-bold">{date.toLocaleString('default', { weekday: 'short' })}</span>
                                    <span className="text-lg font-bold">{date.getDate()}</span>
                                    <span className="text-xs uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-6">
                    {Object.values(groupedShows).length > 0 ? (
                        Object.values(groupedShows).map(({ theatre, shows }) => (
                            <div key={theatre._id} className="glass-card p-6 flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3 space-y-2">
                                    <h3 className="text-xl font-bold dark:text-white">{theatre.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <MapPin className="w-4 h-4" /> {theatre.location}, {theatre.city}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-wrap gap-4">
                                    {shows.map(show => (
                                        <button
                                            key={show._id}
                                            onClick={() => navigate(`/seats/${show._id}`)}
                                            className="group flex flex-col items-center p-4 border border-gray-200 dark:border-white/10 rounded-xl hover:border-rose-600 hover:bg-rose-600/5 transition-all text-center min-w-[120px]"
                                        >
                                            <span className="text-lg font-bold text-rose-600 group-hover:text-rose-500">{show.time}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Screen {show.screen}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center glass-card text-gray-500">
                            No shows available for the selected date. Please try another day.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowSelection;
