import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalaxyLink: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.button
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer group outline-none shrink-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Developer Info"
                title="Who made this?"
            >
                {/* Core glow / Nebulous base */}
                <motion.div
                    className="absolute inset-[-20%] bg-red-700/20 blur-xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%] transition-opacity duration-500 opacity-60 mix-blend-screen"
                    animate={{
                        rotate: isHovered ? 180 : 0,
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.8 : 0.5,
                        borderRadius: isHovered ? ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"] : "40% 60% 70% 30% / 40% 50% 60% 50%"
                    }}
                    transition={{ duration: isHovered ? 4 : 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Swirling Dust Cloud 1 */}
                <motion.div
                    className="absolute inset-[-50%] opacity-50 mix-blend-screen rounded-[60%_40%_50%_50%/50%_50%_70%_30%]"
                    style={{
                        background: 'radial-gradient(circle at 40% 40%, rgba(220,38,38,0.5) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(147,51,234,0.4) 0%, transparent 60%)',
                        filter: 'blur(4px)'
                    }}
                    animate={{
                        rotate: isHovered ? 360 : 180,
                        scale: isHovered ? 1.8 : 1.1
                    }}
                    transition={{ duration: isHovered ? 5 : 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Swirling Dust Cloud 2 */}
                <motion.div
                    className="absolute inset-[-80%] opacity-40 mix-blend-screen rounded-[30%_70%_70%_30%/30%_30%_70%_70%]"
                    style={{
                        background: 'radial-gradient(circle at 60% 30%, rgba(255,100,100,0.3) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(100,50,250,0.2) 0%, transparent 50%)',
                        filter: 'blur(6px)'
                    }}
                    animate={{
                        rotate: isHovered ? -360 : -180,
                        scale: isHovered ? 2.2 : 1.2,
                        opacity: isHovered ? 0.6 : 0.3
                    }}
                    transition={{ duration: isHovered ? 6 : 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Scattered Star Particles (visible mainly on hover) */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.8)]"
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={{
                            x: isHovered ? (Math.random() - 0.5) * 60 : (Math.random() - 0.5) * 10,
                            y: isHovered ? (Math.random() - 0.5) * 60 : (Math.random() - 0.5) * 10,
                            opacity: isHovered ? [0, 1, 0] : 0,
                            scale: isHovered ? [0, 1.5, 0] : 0
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Center Core */}
                <motion.div
                    className="absolute w-1.5 h-1.5 bg-white/90 rounded-full shadow-[0_0_10px_4px_rgba(255,200,200,0.8)]"
                    animate={{
                        scale: isHovered ? [1, 0.5, 1.5, 1] : [1, 1.2, 1],
                        opacity: isHovered ? [1, 0.7, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
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
                                Our website is currently in development, but soon there will be something <br />
                                <span className="italic text-gray-400">beautiful, stylish, and tasteful.</span>
                            </p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="relative z-10 px-10 py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full font-bold uppercase tracking-widest text-xs transition-colors duration-300"
                            >
                                GO BACK
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GalaxyLink;
