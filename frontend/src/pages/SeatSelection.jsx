import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Armchair, CheckCircle2, Info, ChevronRight, Loader2 } from 'lucide-react';
import API_URL from '../config';

const SEAT_TYPES = {
    regular: { label: 'Regular', color: 'bg-emerald-500', priceKey: 'regular' },
    premium: { label: 'Premium', color: 'bg-blue-500', priceKey: 'premium' },
    vip: { label: 'VIP', color: 'bg-purple-600', priceKey: 'vip' }
};

const SeatSelection = () => {
    const { showId } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/cinema/shows/${showId}`);
                setShow(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchShow();
    }, [showId]);

    const toggleSeat = (seatId) => {
        if (show.bookedSeats.includes(seatId)) return;
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const calculateTotal = () => {
        if (!show) return 0;
        return selectedSeats.reduce((total, seat) => {
            const row = seat.charAt(0);
            let price = show.price.regular;
            if (['F', 'G', 'H'].includes(row)) price = show.price.premium;
            if (['I', 'J'].includes(row)) price = show.price.vip;
            return total + price;
        }, 0);
    };

    const handleBooking = async () => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
            alert('Please login to book seats');
            navigate('/login');
            return;
        }

        const user = JSON.parse(savedUser);
        if (!user || !user.token) {
            alert('Your session has expired. Please login again.');
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        try {
            const total = calculateTotal();
            const tax = total * 0.18; // 18% tax
            const { data } = await axios.post(`${API_URL}/api/bookings`, {
                showId: show._id,
                seats: selectedSeats,
                totalAmount: total + tax,
                taxAmount: tax
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate(`/booking-success/${data._id}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="p-20 text-center dark:text-white">Loading seat layout...</div>;

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const cols = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen dark:bg-cinema-black py-12 px-4 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Seat Layout */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold dark:text-white">{show.movie.title}</h1>
                        <p className="text-gray-500">{show.theatre.name} • {show.time}</p>
                    </div>

                    {/* Screen Indicator */}
                    <div className="relative w-full h-16 bg-gradient-to-b from-rose-600/20 to-transparent rounded-t-[100px] border-t-4 border-rose-600/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4">All Eyes Here</span>
                    </div>

                    <div className="overflow-x-auto pb-8 scrollbar-none">
                        <div className="inline-block min-w-full text-center">
                            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols.length + 1}, minmax(0, 1fr))` }}>
                                <div className="w-8"></div>
                                {cols.map(c => <div key={c} className="text-xs font-medium text-gray-400">{c}</div>)}

                                {rows.map(row => (
                                    <React.Fragment key={row}>
                                        <div className="flex items-center justify-center text-xs font-medium text-gray-400">{row}</div>
                                        {cols.map(col => {
                                            const seatId = `${row}${col}`;
                                            const isBooked = show.bookedSeats.includes(seatId);
                                            const isSelected = selectedSeats.includes(seatId);

                                            let type = 'regular';
                                            if (['F', 'G', 'H'].includes(row)) type = 'premium';
                                            if (['I', 'J'].includes(row)) type = 'vip';

                                            return (
                                                <button
                                                    key={seatId}
                                                    disabled={isBooked}
                                                    onClick={() => toggleSeat(seatId)}
                                                    className={`aspect-square w-full max-w-[40px] rounded-lg transition-all flex items-center justify-center
                            ${isBooked ? 'bg-zinc-200 dark:bg-white/5 cursor-not-allowed text-zinc-400 dark:text-white/10' :
                                                            isSelected ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' :
                                                                'bg-gray-100 dark:bg-zinc-800 hover:bg-rose-600/20 dark:text-gray-400'}
                          `}
                                                >
                                                    {isBooked ? <Armchair className="w-5 h-5 opacity-20" /> :
                                                        isSelected ? <CheckCircle2 className="w-5 h-5" /> :
                                                            <Armchair className={`w-5 h-5 ${SEAT_TYPES[type].color.replace('bg-', 'text-')}`} />}
                                                </button>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 rounded bg-zinc-200 dark:bg-white/5"></div>
                            <Armchair className="w-4 h-4 opacity-30" /> Booked
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 rounded bg-emerald-500"></div> Regular
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 rounded bg-blue-500"></div> Premium
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 rounded bg-purple-600"></div> VIP
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 rounded bg-rose-600"></div> Selected
                        </div>
                    </div>
                </div>

                {/* Booking Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-white/10 pb-4">Booking Summary</h3>

                            {selectedSeats.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Seats ({selectedSeats.length}x)</span>
                                        <span className="font-bold dark:text-white">{selectedSeats.join(', ')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Base Price</span>
                                        <span className="font-bold dark:text-white">₹{calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Taxes (18%)</span>
                                        <span className="font-bold dark:text-white">₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-white/10 pt-4 flex justify-between items-center">
                                        <span className="text-lg font-bold dark:text-white">Grand Total</span>
                                        <span className="text-2xl font-black text-rose-600">₹{(calculateTotal() * 1.18).toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={handleBooking}
                                        disabled={bookingLoading}
                                        className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                                    >
                                        {bookingLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>Confirm & Pay <ChevronRight className="w-5 h-5" /></>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-10 space-y-4">
                                    <Armchair className="w-12 h-12 text-gray-300 mx-auto" />
                                    <p className="text-gray-500 text-sm italic">Please select at least one seat to continue.</p>
                                </div>
                            )}
                        </div>

                        <div className="glass-card p-6 bg-blue-500/10 border-blue-500/20 text-blue-600 flex gap-4">
                            <Info className="w-6 h-6 shrink-0" />
                            <p className="text-xs leading-relaxed">Safety is our priority! Every seat is sanitized after every show. Enjoy your movie safely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
