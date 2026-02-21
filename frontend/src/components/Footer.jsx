import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-cinema-black border-t border-gray-100 dark:border-white/5 pt-16 pb-8 px-4 md:px-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand & Mission */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2 text-rose-600 font-bold text-2xl tracking-tighter">
                        <Film className="w-8 h-8 fill-rose-600" />
                        <span>CINE<span className="text-gray-800 dark:text-white">BOOK</span></span>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Experience cinema like never before. We provide the most seamless movie booking experience with the best theatres across the country.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-sm font-black dark:text-white uppercase tracking-[0.2em] mb-8">Navigation</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><Link to="/" className="hover:text-rose-600 transition-colors flex items-center gap-2">Home</Link></li>
                        <li><Link to="/" className="hover:text-rose-600 transition-colors flex items-center gap-2">Browse Movies</Link></li>
                        <li><Link to="/theatres" className="hover:text-rose-600 transition-colors flex items-center gap-2">Cinemas</Link></li>
                        <li><Link to="/my-bookings" className="hover:text-rose-600 transition-colors flex items-center gap-2">My Bookings</Link></li>
                    </ul>
                </div>

                {/* Legal & Help */}
                <div>
                    <h4 className="text-sm font-black dark:text-white uppercase tracking-[0.2em] mb-8">Support</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-rose-600 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-rose-600 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-rose-600 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-rose-600 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-sm font-black dark:text-white uppercase tracking-[0.2em] mb-8">Contact Us</h4>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 group">
                            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-rose-600 group-hover:scale-110 transition-transform">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                123 Cinema Plaza, Film City Lane,<br />Delhi, India 110001
                            </p>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-rose-600 group-hover:scale-110 transition-transform">
                                <Phone className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">+91 98765 43210</p>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-rose-600 group-hover:scale-110 transition-transform">
                                <Mail className="w-4 h-4" />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">support@cinebook.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} CINEBOOK. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] dark:text-gray-500 text-gray-400 border-l border-gray-100 dark:border-white/10 md:pl-8 pl-0">
                        Developed by : <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400 dark:from-rose-500 dark:to-white">siddhesh chaudhari</span>
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" alt="Paypal" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" alt="Mastercard" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
