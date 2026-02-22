import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Ticket, IndianRupee, Film, PlusCircle, Layout,
    Settings, LogOut, ChevronRight, BarChart3, PieChart, Plus, Trash2, Edit2, Loader2, AlertCircle
} from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MovieImage from '../components/MovieImage';
import API_URL from '../config';

const API_BASE = API_URL;

const StatCard = ({ icon, label, value, color }) => (
    <div className="glass-card p-6 flex items-center gap-4 transition-all hover:scale-[1.02]">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-current/20`}>{icon}</div>
        <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-3xl font-black dark:text-white">{value}</p>
        </div>
    </div>
);

const AdminHome = ({ stats }) => (
    <div className="space-y-12 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<Users className="w-7 h-7" />} label="Total Users" value={stats.users} color="bg-blue-600" />
            <StatCard icon={<Ticket className="w-7 h-7" />} label="Total Bookings" value={stats.bookings} color="bg-rose-600" />
            <StatCard icon={<IndianRupee className="w-7 h-7" />} label="Revenue" value={`₹${stats.revenue}`} color="bg-emerald-600" />
            <StatCard icon={<Film className="w-7 h-7" />} label="Movies" value={stats.movies} color="bg-purple-600" />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-rose-600" /> Industry Wise Revenue
                    </h3>
                </div>
                <div className="space-y-4">
                    {stats.industryStats?.map(stat => (
                        <div key={stat._id} className="space-y-2">
                            <div className="flex justify-between text-sm font-bold dark:text-gray-300">
                                <span>{stat._id}</span>
                                <span>₹{(stat.revenue).toLocaleString()}</span>
                            </div>
                            <div className="h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-rose-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((stat.revenue / stats.revenue) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-black dark:text-white flex items-center gap-2">
                    <PieChart className="w-6 h-6 text-blue-600" /> Booking Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.industryStats?.map(stat => (
                        <div key={stat._id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                            <p className="text-xs font-bold text-gray-500 uppercase">{stat._id}</p>
                            <p className="text-2xl font-black dark:text-white">{stat.bookings} <span className="text-xs font-medium text-gray-400">Tickets</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMovie, setEditingMovie] = useState(null);
    const [isAddingMovie, setIsAddingMovie] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        genre: '',
        language: '',
        industry: 'Bollywood',
        duration: '',
        releaseDate: '',
        posterImage: '',
        backdropImage: '',
        trailerUrl: '',
        cast: '',
        rating: 0
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/api/movies`);
            setMovies(data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleEditClick = (movie) => {
        setEditingMovie(movie);
        setIsAddingMovie(false);
        setEditForm({
            ...movie,
            genre: movie.genre?.join(', '),
            cast: movie.cast?.join(', '),
            releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : ''
        });
    };

    const handleSubmitMovie = async (e) => {
        e.preventDefault();
        try {
            if (!user?.token) return;
            const movieData = {
                ...editForm,
                genre: typeof editForm.genre === 'string' ? editForm.genre.split(',').map(g => g.trim()) : editForm.genre,
                cast: typeof editForm.cast === 'string' ? editForm.cast.split(',').map(c => c.trim()) : editForm.cast,
                duration: Number(editForm.duration),
                rating: Number(editForm.rating)
            };

            if (isAddingMovie) {
                await axios.post(`${API_BASE}/api/movies`, movieData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.put(`${API_BASE}/api/movies/${editingMovie._id}`, movieData, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            setEditingMovie(null);
            setIsAddingMovie(false);
            fetchMovies();
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                alert('Session expired or unauthorized. Please logout and login again.');
            } else {
                alert('Operation failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleDeleteMovie = async (id) => {
        if (!window.confirm('Are you sure you want to delete this movie?')) return;
        try {
            if (!user?.token) return;
            await axios.delete(`${API_BASE}/api/movies/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchMovies();
        } catch (err) {
            console.error(err);
            alert('Delete failed: ' + err.message);
        }
    };

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-rose-600" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black dark:text-white">Movie Management</h2>
                    <p className="text-gray-500">Manage your cinema catalog and categories</p>
                </div>
                <button
                    onClick={() => {
                        setIsAddingMovie(true);
                        setEditingMovie(null);
                        setEditForm({
                            title: '',
                            description: '',
                            genre: '',
                            language: '',
                            industry: 'Bollywood',
                            duration: '',
                            releaseDate: '',
                            posterImage: '',
                            trailerUrl: '',
                            cast: '',
                            rating: 0
                        });
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" /> Add New Movie
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {movies.map(movie => (
                    <div key={movie._id} className="glass-card p-4 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <MovieImage
                                src={movie.posterImage}
                                alt={movie.title}
                                className="w-24 h-32 rounded-xl shadow-lg"
                            />
                            <div>
                                <h3 className="font-bold dark:text-white text-lg">{movie.title}</h3>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-600/10 text-rose-600 rounded-md uppercase">{movie.industry}</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600/10 text-blue-600 rounded-md uppercase">{movie.language}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEditClick(movie)}
                                className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all"
                            >
                                <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDeleteMovie(movie._id)}
                                className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {(editingMovie || isAddingMovie) && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black dark:text-white">{isAddingMovie ? 'Add New Movie' : 'Edit Movie'}</h3>
                            <button onClick={() => { setEditingMovie(null); setIsAddingMovie(false); }} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">&times;</button>
                        </div>

                        <form onSubmit={handleSubmitMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Movie Title</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Poster URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={editForm.posterImage}
                                        onChange={(e) => setEditForm({ ...editForm, posterImage: e.target.value })}
                                        className="flex-1 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                        placeholder="https://..."
                                        required
                                    />
                                    <div className="shrink-0 w-16 h-20 rounded-xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm">
                                        <MovieImage src={editForm.posterImage} className="w-full h-full" alt="Preview" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Genres (comma separated)</label>
                                <input
                                    type="text"
                                    value={editForm.genre}
                                    onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    placeholder="Action, Drama, Sci-Fi"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Duration (mins)</label>
                                <input
                                    type="number"
                                    value={editForm.duration}
                                    onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Release Date</label>
                                <input
                                    type="date"
                                    value={editForm.releaseDate}
                                    onChange={(e) => setEditForm({ ...editForm, releaseDate: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rating (0-10)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={editForm.rating}
                                    onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                />
                            </div>
                            <div className="col-span-full space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cast (comma separated)</label>
                                <input
                                    type="text"
                                    value={editForm.cast}
                                    onChange={(e) => setEditForm({ ...editForm, cast: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    placeholder="Actor A, Actor B"
                                />
                            </div>
                            <div className="col-span-full space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trailer URL</label>
                                <input
                                    type="text"
                                    value={editForm.trailerUrl}
                                    onChange={(e) => setEditForm({ ...editForm, trailerUrl: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Industry</label>
                                <select
                                    value={editForm.industry}
                                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                >
                                    <option value="Bollywood">Bollywood</option>
                                    <option value="Hollywood">Hollywood</option>
                                    <option value="Tollywood">Tollywood</option>
                                    <option value="South Movies">South Movies</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language</label>
                                <input
                                    type="text"
                                    value={editForm.language}
                                    onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 col-span-full pt-4">
                                <button type="submit" className="flex-1 btn-primary py-4">{isAddingMovie ? 'Create Movie' : 'Save Changes'}</button>
                                <button type="button" onClick={() => { setEditingMovie(null); setIsAddingMovie(false); }} className="flex-1 p-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold dark:text-white">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.token) return;
            try {
                const { data } = await axios.get(`${API_BASE}/api/admin/bookings`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setBookings(data);
            } catch (err) { console.error('Bookings fetch error:', err); }
            finally { setLoading(false); }
        };
        fetchBookings();
    }, [user]);

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-rose-600" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-black dark:text-white">Booking Management</h2>
                <p className="text-gray-500">Track and manage all customer reservations</p>
            </div>

            <div className="overflow-x-auto glass-card !p-0 border-none shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest border-b dark:border-white/5">
                            <th className="p-6">Movie</th>
                            <th className="p-6">Customer</th>
                            <th className="p-6">Show Info</th>
                            <th className="p-6">Seats</th>
                            <th className="p-6">Amount</th>
                            <th className="p-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-white/5">
                        {bookings.map(booking => (
                            <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <img src={booking.show?.movie?.posterImage} className="w-10 h-14 object-cover rounded-lg shadow-md" alt="" referrerPolicy="no-referrer" />
                                        <span className="font-bold dark:text-white uppercase tracking-tighter">{booking.show?.movie?.title}</span>
                                    </div>
                                </td>
                                <td className="p-6 uppercase">
                                    <div className="flex flex-col">
                                        <span className="font-bold dark:text-white text-sm">{booking.user?.name}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{booking.user?.email}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col text-xs font-bold uppercase tracking-widest">
                                        <span className="text-rose-600">{booking.show?.time}</span>
                                        <span className="text-gray-400">{new Date(booking.show?.date).toLocaleDateString()}</span>
                                        <span className="text-[10px] text-gray-500">{booking.show?.theatre?.name}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                                        {booking.seats.map(s => (
                                            <span key={s} className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 dark:text-gray-300 text-[10px] font-black rounded-md">{s}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-6 font-black dark:text-white tracking-widest text-sm">₹{booking.totalAmount}</td>
                                <td className="p-6 tracking-widest uppercase">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.15em] ${booking.paymentStatus === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                        booking.paymentStatus === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                                        }`}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminShows = () => {
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingShow, setEditingShow] = useState(null);
    const { user } = useAuth();
    const [showForm, setShowForm] = useState({
        movie: '',
        theatre: '',
        screen: 1,
        date: '',
        time: '',
        price: { regular: 250, premium: 450, vip: 800 },
        totalSeats: 120
    });

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Public data - can be fetched even without token
            const [moviesRes, theatresRes] = await Promise.allSettled([
                axios.get(`${API_BASE}/api/movies`),
                axios.get(`${API_BASE}/api/cinema/theatres`)
            ]);

            if (moviesRes.status === 'fulfilled') setMovies(moviesRes.value.data);
            if (theatresRes.status === 'fulfilled') setTheatres(theatresRes.value.data);

            // Admin data - needs token
            if (user?.token) {
                const showsRes = await axios.get(`${API_BASE}/api/admin/shows`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setShows(showsRes.data);
            }
        } catch (err) { console.error('Shows/Data fetch error:', err); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchAllData();
    }, [user]);

    const handleEditClick = (show) => {
        setEditingShow(show);
        setShowForm({
            movie: show.movie?._id,
            theatre: show.theatre?._id,
            screen: show.screen,
            date: new Date(show.date).toISOString().split('T')[0],
            time: show.time,
            price: show.price,
            totalSeats: show.totalSeats
        });
        setShowModal(true);
    };

    const handleDeleteShow = async (id) => {
        if (!window.confirm('Delete this show slot?')) return;
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.delete(`${API_BASE}/api/cinema/shows/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchAllData();
        } catch (err) { alert('Delete failed'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (editingShow) {
                await axios.put(`${API_BASE}/api/cinema/shows/${editingShow._id}`, showForm, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            } else {
                await axios.post(`${API_BASE}/api/cinema/shows`, showForm, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
            }
            setShowModal(false);
            setEditingShow(null);
            fetchAllData();
        } catch (err) { alert('Operation failed'); }
    };

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-rose-600" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black dark:text-white">Show Configuration</h2>
                    <p className="text-gray-500">Manage booking slots, screens and pricing</p>
                </div>
                <button
                    onClick={() => {
                        setEditingShow(null);
                        setShowForm({
                            movie: '',
                            theatre: '',
                            screen: 1,
                            date: '',
                            time: '',
                            price: { regular: 250, premium: 450, vip: 800 },
                            totalSeats: 120
                        });
                        setShowModal(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Schedule New Show
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {shows.map(show => (
                    <div key={show._id} className="glass-card p-6 space-y-4 group hover:border-rose-600/50 transition-all shadow-xl shadow-black/5">
                        <div className="flex gap-4">
                            <img src={show.movie?.posterImage} className="w-20 h-28 object-cover rounded-xl shadow-lg" alt="" referrerPolicy="no-referrer" />
                            <div className="flex-1 space-y-2">
                                <h4 className="font-black dark:text-white uppercase leading-tight tracking-tighter text-lg">{show.movie?.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] font-black px-2 py-0.5 bg-rose-600/10 text-rose-600 rounded-md uppercase tracking-widest">{show.theatre?.name}</span>
                                    <span className="text-[10px] font-black px-2 py-0.5 bg-blue-600/10 text-blue-600 rounded-md uppercase tracking-widest">Screen {show.screen}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-white/5">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time & Date</p>
                                <p className="text-sm font-black dark:text-white flex items-center gap-2">
                                    <Loader2 className="w-3 h-3 text-rose-600 animate-spin-slow" /> {show.time}
                                </p>
                                <p className="text-[10px] text-gray-500 font-bold">{new Date(show.date).toDateString()}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing From</p>
                                <p className="text-lg font-black dark:text-white">₹{show.price?.regular}</p>
                                <div className="flex justify-end gap-1 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                <span>Occupancy</span>
                                <span>{show.bookedSeats?.length} / {show.totalSeats} seats</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-rose-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${(show.bookedSeats?.length / show.totalSeats) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                            <button
                                onClick={() => handleEditClick(show)}
                                className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                            >
                                Edit Slot
                            </button>
                            <button
                                onClick={() => handleDeleteShow(show._id)}
                                className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black dark:text-white">{editingShow ? 'Edit Show Slot' : 'Schedule New Show'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Movie</label>
                                <select
                                    value={showForm.movie}
                                    onChange={(e) => setShowForm({ ...showForm, movie: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                >
                                    <option value="">{loading ? 'Loading movies...' : movies.length === 0 ? 'No movies found' : 'Choose a movie...'}</option>
                                    {movies.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Theatre</label>
                                <select
                                    value={showForm.theatre}
                                    onChange={(e) => setShowForm({ ...showForm, theatre: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                >
                                    <option value="">{loading ? 'Loading theatres...' : theatres.length === 0 ? 'No theatres found' : 'Choose a theatre...'}</option>
                                    {theatres.map(t => <option key={t._id} value={t._id}>{t.name} - {t.city}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Show Date</label>
                                <input
                                    type="date"
                                    value={showForm.date}
                                    onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Show Time</label>
                                <select
                                    value={showForm.time}
                                    onChange={(e) => setShowForm({ ...showForm, time: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                >
                                    <option value="">Choose time...</option>
                                    {['09:30 AM', '12:45 PM', '04:00 PM', '07:15 PM', '10:30 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Screen Number</label>
                                <input
                                    type="number"
                                    value={showForm.screen}
                                    onChange={(e) => setShowForm({ ...showForm, screen: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket Price (Regular)</label>
                                <input
                                    type="number"
                                    value={showForm.price.regular}
                                    onChange={(e) => setShowForm({ ...showForm, price: { ...showForm.price, regular: e.target.value } })}
                                    className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 dark:text-white focus:border-rose-600 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 col-span-full pt-4">
                                <button type="submit" className="flex-1 btn-primary py-4">{editingShow ? 'Update Slot' : 'Create Slot'}</button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-4 bg-gray-100 dark:bg-white/5 rounded-2xl font-bold dark:text-white">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0, movies: 0, industryStats: [] });
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const { data } = await axios.get(`${API_BASE}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex flex-col md:flex-row dark:bg-cinema-black">
            {/* Sidebar */}
            <aside className="w-full md:w-80 border-r border-gray-100 dark:border-white/5 p-8 flex flex-col gap-3">
                <div className="mb-8">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] mb-4">Core Management</p>
                    <AdminSidebarLink icon={<Layout className="w-5 h-5" />} label="Overview" to="/admin" />
                    <AdminSidebarLink icon={<Film className="w-5 h-5" />} label="Movies" to="/admin/movies" />
                    <AdminSidebarLink icon={<Settings className="w-5 h-5" />} label="Cinemas" to="/admin/theatres" />
                    <AdminSidebarLink icon={<Ticket className="w-5 h-5" />} label="Bookings" to="/admin/bookings" />
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full p-4 text-red-500 hover:bg-red-500/5 rounded-2xl transition-all font-black text-sm uppercase tracking-widest"
                    >
                        <LogOut className="w-5 h-5" /> Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-gray-50/30 dark:bg-black/20">
                <Routes>
                    <Route path="/" element={<AdminHome stats={stats} />} />
                    <Route path="/movies" element={<AdminMovies />} />
                    <Route path="/theatres" element={<AdminShows />} />
                    <Route path="/bookings" element={<AdminBookings />} />
                </Routes>
            </main>
        </div>
    );
};

const AdminSidebarLink = ({ icon, label, to }) => {
    const active = window.location.pathname === to;
    return (
        <Link to={to} className={`flex items-center justify-between p-4 rounded-2xl transition-all font-bold group
            ${active
                ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/20'
                : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/5 hover:text-rose-600 shadow-sm'}
        `}>
            <div className="flex items-center gap-4 text-sm uppercase tracking-wider">
                {icon}
                <span>{label}</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-all ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
        </Link>
    );
};

export default AdminDashboard;
