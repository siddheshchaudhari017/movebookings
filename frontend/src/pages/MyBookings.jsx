import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Calendar, MapPin, Download, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/bookings/mybookings`, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
                });
                setBookings(data.reverse());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="p-20 text-center dark:text-white">Loading your history...</div>;

    return (
        <div className="min-h-screen dark:bg-cinema-black py-12 px-4 md:px-12 space-y-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold dark:text-white">Your Bookings</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.length > 0 ? (
                        bookings.map(booking => (
                            <div key={booking._id} className="glass-card overflow-hidden group">
                                <div className="h-2 bg-rose-600"></div>
                                <div className="p-6 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold dark:text-white truncate max-w-[250px]">{booking.show.movie.title}</h3>
                                            <p className="text-xs text-rose-500 font-bold uppercase">ID: #{booking._id.substr(-8)}</p>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">
                                            {booking.paymentStatus}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-xs font-bold uppercase">Venue</p>
                                            <p className="dark:text-gray-200 truncate">{booking.show.theatre.name}</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-gray-400 text-xs font-bold uppercase">Seats</p>
                                            <p className="dark:text-gray-200 font-bold">{booking.seats.join(', ')}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-xs font-bold uppercase">Date & Time</p>
                                            <p className="dark:text-gray-200 font-bold">
                                                {new Date(booking.show.date).toLocaleDateString()}, {booking.show.time}
                                            </p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-gray-400 text-xs font-bold uppercase">Total Amount</p>
                                            <p className="text-lg font-black text-rose-600">₹{booking.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-white/10">
                                        <Link to={`/movie/${booking.show.movie._id}`} className="flex-1 py-2 text-center text-xs font-bold bg-gray-100 dark:bg-white/5 dark:text-gray-300 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
                                            VIEW MOVIE
                                        </Link>
                                        <button className="flex items-center justify-center gap-1 flex-1 py-2 text-xs font-bold bg-gray-100 dark:bg-white/5 dark:text-gray-300 rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
                                            <Download className="w-3 h-3" /> TICKET
                                        </button>
                                        {new Date(booking.show.date) > new Date() && (
                                            <button className="flex items-center justify-center gap-1 flex-1 py-2 text-xs font-bold bg-gray-100 dark:bg-white/5 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                                <XCircle className="w-3 h-3" /> CANCEL
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center glass-card space-y-6">
                            <Ticket className="w-16 h-16 text-gray-300 mx-auto" />
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold dark:text-white">No bookings yet!</h3>
                                <p className="text-gray-500">You haven't booked any movies. Explore upcoming blockbusters now.</p>
                            </div>
                            <Link to="/" className="inline-block btn-primary">Book Now</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
