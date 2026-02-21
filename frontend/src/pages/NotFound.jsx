import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Film, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-cinema-black flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
            {/* Cinematic Background Grain/Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.1)_0%,_transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 space-y-8"
            >
                <div className="relative inline-block">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent italic select-none"
                    >
                        404
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className="p-6 bg-rose-600 rounded-full shadow-[0_0_50px_rgba(225,29,72,0.5)] border-4 border-white/20"
                        >
                            <Film className="w-16 h-16 text-white" />
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                        Lost in <span className="text-rose-600">Space</span>
                    </h1>
                    <p className="text-gray-400 font-medium">
                        The reel you're looking for was cut from the final edit. Our scriptwriters couldn't find this scene.
                    </p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block pt-8"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-2xl group"
                    >
                        <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                        Ticket to Home
                    </Link>
                </motion.div>

                <div className="pt-20 opacity-20 flex items-center justify-center gap-6">
                    <div className="w-24 h-px bg-white/50" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">Scene 404 / Take 1</p>
                    <div className="w-24 h-px bg-white/50" />
                </div>
            </motion.div>

            {/* Industrial Progress bar (Decoration) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-1/3 h-full bg-rose-600 shadow-[0_0_20px_rgba(225,29,72,1)]"
                />
            </div>
        </div>
    );
};

export default NotFound;
