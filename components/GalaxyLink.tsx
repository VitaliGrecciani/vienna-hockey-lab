import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
            {typeof document !== 'undefined' && createPortal(
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
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl max-w-[600px] w-full text-left relative overflow-hidden shadow-2xl flex flex-col font-mono text-sm max-h-[90vh]"
                            >
                                {/* VS Code Editor UI Header */}
                                <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                                    <div className="flex space-x-2 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="bg-[#1e1e1e] px-4 py-1.5 border-t border-l border-r border-[#3c3c3c] rounded-t-sm text-[11px] text-[#d4d4d4] flex items-center gap-2">
                                        <span className="text-blue-400 font-bold">TS</span> vito-viki.ts
                                    </div>
                                    <div className="flex-1"></div>
                                    <button onClick={() => setShowModal(false)} className="text-[#969696] hover:text-white">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                {/* Editor Body Content */}
                                <div className="flex p-4 md:p-6 bg-[#1e1e1e] overflow-auto relative z-10 min-h-[300px]">
                                    {/* Line Numbers */}
                                    <div className="flex flex-col text-right text-[#858585] select-none pr-4 mr-4 border-r border-[#404040] text-[10px] md:text-xs">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="leading-relaxed whitespace-pre h-[1.5rem]">{i + 1}</div>
                                        ))}
                                    </div>

                                    {/* Code View */}
                                    <div className="flex-1 font-mono text-[11px] md:text-[13px] leading-relaxed tracking-tight">
                                        <div className="h-[1.5rem] text-[#6a9955]">// vito @ viki make this</div>
                                        <div className="h-[1.5rem]"></div>
                                        <div className="h-[1.5rem]"><span className="text-[#c586c0]">export const</span> <span className="text-[#4fc1ff]">agentCentricOrganizations</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#d4d4d4]">{`{`}</span></div>
                                        <div className="h-[1.5rem] pl-4"><span className="text-[#9cdcfe]">description</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#ce9178]">"AI stack to company infrastructure"</span><span className="text-[#d4d4d4]">,</span></div>
                                        <div className="h-[1.5rem] pl-4"><span className="text-[#9cdcfe]">problem</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#ce9178]">"AI mapping for 10x yields"</span><span className="text-[#d4d4d4]">,</span></div>
                                        <div className="h-[1.5rem] pl-4"><span className="text-[#9cdcfe]">capabilities</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#d4d4d4]">[</span></div>
                                        <div className="h-[1.5rem] pl-8"><span className="text-[#ce9178]">"expert web development"</span><span className="text-[#d4d4d4]">,</span></div>
                                        <div className="h-[1.5rem] pl-8"><span className="text-[#ce9178]">"full-scale AI transformation"</span></div>
                                        <div className="h-[1.5rem] pl-4"><span className="text-[#d4d4d4]">]</span><span className="text-[#d4d4d4]">,</span></div>
                                        <div className="h-[1.5rem] pl-4"><span className="text-[#9cdcfe]">engineering</span><span className="text-[#d4d4d4]">:</span> <span className="text-[#ce9178]">"agentic systems & data ontology"</span></div>
                                        <div className="h-[1.5rem]"><span className="text-[#d4d4d4]">{`}`}</span><span className="text-[#d4d4d4]">;</span></div>
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default GalaxyLink;
