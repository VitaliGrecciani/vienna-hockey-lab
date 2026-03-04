import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GalaxyLink: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Fractal-like distribution: clusters of stars instead of a single core
    const starCount = 80;
    const stars = useMemo(() => Array.from({ length: starCount }).map((_, i) => {
        // Create fractal-like clustering
        const clusterSelection = Math.random();
        let baseX = 0, baseY = 0, spread = 60;

        if (clusterSelection > 0.7) { // Cluster A
            baseX = 15; baseY = -10; spread = 30;
        } else if (clusterSelection > 0.4) { // Cluster B
            baseX = -20; baseY = 15; spread = 40;
        }

        return {
            id: i,
            size: Math.random() * 2 + 0.2,
            x: baseX + (Math.random() - 0.5) * spread,
            y: baseY + (Math.random() - 0.5) * spread,
            driftX: (Math.random() - 0.5) * 20,
            driftY: (Math.random() - 0.5) * 20,
            scatterX: (Math.random() - 0.5) * 600,
            scatterY: (Math.random() - 0.5) * 600,
            duration: 4 + Math.random() * 6,
            delay: Math.random() * 4,
        };
    }), []);

    // Fractal gas clouds (irregular, nested-like layers)
    const nebulaLayers = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        color: i % 3 === 0 ? 'rgba(220,38,38,0.25)' : (i % 3 === 1 ? 'rgba(34,211,238,0.2)' : 'rgba(147,51,234,0.15)'),
        borderRadius: `${30 + Math.random() * 60}% ${30 + Math.random() * 60}% ${30 + Math.random() * 60}% ${30 + Math.random() * 60}% / ${30 + Math.random() * 60}% ${30 + Math.random() * 60}% ${30 + Math.random() * 60}% ${30 + Math.random() * 60}%`,
        scale: 0.8 + Math.random() * 1.5,
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        rotate: Math.random() * 360,
        speed: 20 + Math.random() * 30
    })), []);

    return (
        <>
            <motion.button
                className="relative w-16 h-16 flex items-center justify-center cursor-pointer group outline-none shrink-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowModal(true)}
                whileTap={{ scale: 0.9 }}
                aria-label="Who made this?"
            >
                {/* Prevent clipping on mobile - absolute container that is larger than the button */}
                <div className="absolute inset-[-400%] pointer-events-none flex items-center justify-center overflow-visible z-[-1]">

                    {/* Background Ambient Glow */}
                    <div className="absolute w-[200px] h-[200px] bg-blue-900/5 blur-[80px] rounded-full" />

                    {/* Fractal Nebula Clouds */}
                    {nebulaLayers.map((layer) => (
                        <motion.div
                            key={`layer-${layer.id}`}
                            className="absolute w-40 h-40 mix-blend-screen overflow-visible"
                            style={{
                                background: `radial-gradient(circle at center, ${layer.color} 0%, transparent 75%)`,
                                borderRadius: layer.borderRadius,
                                filter: 'blur(12px)',
                                left: `calc(50% + ${layer.x}px)`,
                                top: `calc(50% + ${layer.y}px)`,
                            }}
                            animate={{
                                rotate: isHovered ? layer.rotate + 270 : layer.rotate,
                                scale: isHovered ? [layer.scale, layer.scale * 4, layer.scale * 8] : [layer.scale, layer.scale * 1.1, layer.scale],
                                opacity: isHovered ? [0.6, 0.4, 0] : 0.45,
                                x: isHovered ? (Math.random() - 0.5) * 200 : 0,
                                y: isHovered ? (Math.random() - 0.5) * 200 : 0,
                            }}
                            transition={{
                                rotate: { duration: layer.speed, repeat: Infinity, ease: "linear" },
                                scale: { duration: isHovered ? 4 : 8, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" },
                                opacity: { duration: isHovered ? 4 : 3 },
                                x: { duration: 4, ease: "easeOut" },
                                y: { duration: 4, ease: "easeOut" }
                            }}
                        />
                    ))}

                    {/* Wispy Scattering Filaments */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`filament-${i}`}
                            className="absolute w-24 h-1 mix-blend-screen blur-[15px] rounded-full"
                            style={{
                                background: i % 2 === 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(6, 182, 212, 0.2)',
                                top: '50%', left: '50%',
                                transformOrigin: '0% 0%',
                                rotate: `${i * 30}deg`
                            }}
                            animate={{
                                rotate: isHovered ? i * 30 + (Math.random() - 0.5) * 180 : i * 30,
                                scaleX: isHovered ? [1, 8, 12] : [1, 1.4, 1],
                                opacity: isHovered ? [0.8, 0.4, 0] : 0.35,
                                x: isHovered ? (Math.random() - 0.5) * 400 : 0,
                                y: isHovered ? (Math.random() - 0.5) * 400 : 0,
                            }}
                            transition={{
                                duration: isHovered ? 4 : 12 + i * 2,
                                repeat: isHovered ? 0 : Infinity,
                                ease: "easeOut"
                            }}
                        />
                    ))}

                    {/* Stars following fractal distribution */}
                    {stars.map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute bg-white rounded-full mix-blend-screen"
                            style={{
                                width: star.size,
                                height: star.size,
                                boxShadow: `0 0 ${star.size * 3}px white`,
                                left: `calc(50% + ${star.x}px)`,
                                top: `calc(50% + ${star.y}px)`,
                            }}
                            animate={{
                                x: isHovered ? star.scatterX : [0, star.driftX, 0],
                                y: isHovered ? star.scatterY : [0, star.driftY, 0],
                                opacity: isHovered ? 0 : [0.3, 1, 0.3],
                                scale: isHovered ? 0 : [1, 1.4, 1],
                            }}
                            transition={{
                                x: { duration: isHovered ? 4 + Math.random() * 2 : star.duration, repeat: isHovered ? 0 : Infinity, ease: "easeOut" },
                                y: { duration: isHovered ? 4 + Math.random() * 2 : star.duration, repeat: isHovered ? 0 : Infinity, ease: "easeOut" },
                                opacity: { duration: isHovered ? 4 : star.duration, repeat: Infinity, delay: star.delay },
                                scale: { duration: isHovered ? 4 : star.duration, repeat: Infinity, delay: star.delay }
                            }}
                        />
                    ))}
                </div>
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
