import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Film, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const Theatres = () => {
    const [theatres, setTheatres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/cinema/theatres`);
                setTheatres(data);
            } catch (err) {
                console.error('Error fetching theatres:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTheatres();
    }, []);

    const filteredTheatres = theatres.filter(theatre =>
        theatre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theatre.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-cinema-black py-12 px-4 md:px-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black dark:text-white tracking-tight">Our <span className="text-rose-600">Cinemas</span></h1>
                        <p className="text-gray-500 dark:text-gray-400">Discover premium movie experiences near you</p>
                    </div>

                    <div className="relative group max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name or city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all dark:text-white"
                        />
                    </div>
                </div>

                {/* Theatre Grid */}
                {filteredTheatres.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTheatres.map(theatre => (
                            <div key={theatre._id} className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-300">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Link to="/" className="flex items-center hover:text-netflix-red transition-colors">
                                            <h3 className="text-xl font-bold dark:text-white group-hover:text-rose-600 transition-colors">{theatre.name}</h3>
                                            <span className="text-xs font-bold px-2 py-1 bg-rose-600/10 text-rose-600 rounded-md">PREMIUM</span>
                                        </Link>
                                        <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                            <MapPin className="w-4 h-4" /> {theatre.location}, {theatre.city}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Screens</p>
                                            <p className="text-lg font-bold dark:text-white">{theatre.screens || 5}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Experience</p>
                                            <p className="text-lg font-bold dark:text-white">4K Dolby</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-cinema-black bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                                                    <Film className="w-4 h-4 text-gray-400" />
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            to="/"
                                            className="text-sm font-bold text-rose-600 hover:text-rose-500 flex items-center gap-1"
                                        >
                                            View Movies
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center glass-card">
                        <div className="bg-gray-100 dark:bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold dark:text-white">No theatres found</h2>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">Try searching for a different city or theatre name.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-rose-600 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Theatres;
