import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Download, Calendar, MapPin, Ticket, QrCode, Home } from 'lucide-react';

const BookingSuccess = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you'd fetch the booking details
        // Here we'll simulate it or fetch if we had the endpoint
        const fetchBooking = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/bookings/mybookings`, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
                });
                const current = data.find(b => b._id === bookingId);
                setBooking(current);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [bookingId]);

    if (loading) return <div className="p-20 text-center dark:text-white">Processing your ticket...</div>;

    return (
        <div className="min-h-screen dark:bg-cinema-black py-20 px-4">
            <div className="max-w-xl mx-auto space-y-12">
                <div className="text-center space-y-4 animate-fade-in">
                    <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold dark:text-white">Booking Confirmed!</h1>
                    <p className="text-gray-500">Your tickets have been sent to your email.</p>
                </div>

                {/* Ticket Layout */}
                <div className="glass-card overflow-hidden bg-white dark:bg-zinc-900 border-none shadow-2xl animate-slide-up">
                    <div className="bg-rose-600 p-6 flex justify-between items-center text-white">
                        <h2 className="text-2xl font-black uppercase tracking-tighter italic">CineBook Ticket</h2>
                        <Ticket className="w-8 h-8 opacity-50" />
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2">
                                <p className="text-xs uppercase font-bold text-gray-400">Movie</p>
                                <h3 className="text-2xl font-bold dark:text-white">{booking?.show.movie.title}</h3>
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg">
                                <QrCode className="w-16 h-16 dark:text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase">
                                    <Calendar className="w-3 h-3" /> Date & Time
                                </div>
                                <p className="font-bold dark:text-white">{new Date(booking?.show.date).toLocaleDateString()}, {booking?.show.time}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase justify-end">
                                    <MapPin className="w-3 h-3" /> Venue
                                </div>
                                <p className="font-bold dark:text-white truncate">{booking?.show.theatre.name}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase">
                                    <Armchair className="w-3 h-3" /> Seats
                                </div>
                                <p className="font-bold dark:text-white">{booking?.seats.join(', ')}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="text-xs text-gray-400 font-bold uppercase">Booking ID</div>
                                <p className="font-bold text-xs dark:text-white truncate">#{booking?._id}</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-gray-200 dark:border-white/10 pt-8 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Total Paid</p>
                                <p className="text-2xl font-black text-rose-600">₹{booking?.totalAmount.toFixed(2)}</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all dark:text-white font-bold">
                                <Download className="w-5 h-5" /> PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link to="/" className="flex-1 btn-primary py-4 flex items-center justify-center gap-2">
                        <Home className="w-5 h-5" /> Back to Home
                    </Link>
                    <Link to="/my-bookings" className="flex-1 glass-card py-4 flex items-center justify-center gap-2 border-gray-200 dark:border-white/10 dark:text-white font-bold">
                        View My History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;

const Armchair = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2v-4zm0 0h2m0 0v6a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6z" />
    </svg>
);
