import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Film, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full glass-card border-none rounded-none backdrop-blur-md bg-white/70 dark:bg-black/70 px-4 md:px-8 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-rose-600 font-bold text-2xl tracking-tighter">
                <Film className="w-8 h-8 fill-rose-600" />
                <span>CINE<span className="text-gray-800 dark:text-white">BOOK</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Link to="/" className="hover:text-rose-600 transition-colors">Movies</Link>
                <Link to="/theatres" className="hover:text-rose-600 transition-colors">Theatres</Link>
                {user?.role === 'admin' && (
                    <Link to="/admin" className="hover:text-rose-600 transition-colors font-bold text-rose-500">Admin Panel</Link>
                )}
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>

                {user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/my-bookings" className="hidden md:block hover:text-rose-600 dark:text-gray-300 transition-colors">My Bookings</Link>
                        <div className="group relative">
                            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-cinema-black border border-gray-100 dark:border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10">
                                    <p className="text-sm font-bold dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <Link to="/my-bookings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 dark:text-gray-300">
                                    <User className="w-4 h-4" /> My Profile
                                </Link>
                                <button
                                    onClick={() => { logout(); navigate('/login'); }}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-rose-600 transition-colors dark:text-gray-300">Login</Link>
                        <Link to="/register" className="btn-primary text-sm !px-4 !py-1.5">Sign Up</Link>
                    </div>
                )}

                <button className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10">
                    <Menu className="w-6 h-6 dark:text-gray-300" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
