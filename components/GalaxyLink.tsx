import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalaxyLink: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.button
                className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer overflow-hidden group outline-none shrink-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Developer Info"
                title="Who made this?"
            >
                {/* Core glow */}
                <div className="absolute inset-0 bg-red-600/30 blur-md rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

                {/* Swirling Galaxy Base */}
                <motion.div
                    className="absolute inset-[-50%] rounded-full opacity-60 mix-blend-screen"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 0%, rgba(220,38,38,0.4) 20%, rgba(147,51,234,0.4) 40%, transparent 50%, rgba(220,38,38,0.4) 70%, rgba(147,51,234,0.4) 90%, transparent 100%)',
                        filter: 'blur(3px)'
                    }}
                    animate={{ rotate: isHovered ? 720 : 360 }}
                    transition={{ duration: isHovered ? 3 : 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Outer Dust */}
                <motion.div
                    className="absolute inset-[-100%] rounded-full opacity-50 mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, transparent 20%, rgba(255,100,100,0.2) 40%, transparent 70%)',
                        filter: 'blur(2px)'
                    }}
                    animate={{ rotate: isHovered ? -360 : -180, scale: isHovered ? 1.2 : 1 }}
                    transition={{ duration: isHovered ? 4 : 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Star */}
                <div className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_3px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-125" />
            </motion.button>

            {/* Placeholder Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)]"
                        >
                            {/* Background galaxy effect inside modal */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <motion.div
                                    className="absolute inset-[-50%] opacity-50"
                                    style={{
                                        background: 'conic-gradient(from 0deg, transparent 0%, rgba(220,38,38,0.5) 20%, rgba(147,51,234,0.3) 40%, transparent 50%, rgba(220,38,38,0.5) 70%, rgba(147,51,234,0.3) 90%, transparent 100%)',
                                        filter: 'blur(50px)'
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black italic text-white mb-4 relative z-10 tracking-wide font-orbitron drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Vito & Viki <span className="text-red-500">Make This</span>
                            </h3>

                            <p className="text-gray-300 font-medium mb-8 relative z-10 text-lg leading-relaxed">
                                Наш сайт пока в разработке, но скоро здесь будет что-то <br />
                                <span className="italic text-gray-400">красивое, стильное и немножко эротичное.</span>
                            </p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="relative z-10 px-10 py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full font-bold uppercase tracking-widest text-xs transition-colors duration-300"
                            >
                                Вернуться
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GalaxyLink;
