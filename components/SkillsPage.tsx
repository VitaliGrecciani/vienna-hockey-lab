import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Target, Crosshair, Brain, Activity, Shield } from 'lucide-react';
import FractalBackground from './FractalBackground';

const SkillsPage: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    const skills = [
        {
            id: "skills-lab",
            icon: <Zap className="w-10 h-10 text-red-600" aria-label="Skills Training Icon" />,
            title: "SKILLS TRAINING LAB",
            description: "Comprehensive mastery of puck control and rapid reaction. We focus on building instinctual deking abilities under high-pressure scenarios. Our methodology ensures that technical skills become second nature, allowing players to execute complex moves without hesitation during game play."
        },
        {
            id: "skating-mechanics",
            icon: <Activity className="w-10 h-10 text-red-600" aria-label="Skating Mechanics Icon" />,
            title: "SKATING MECHANICS",
            description: "The foundation of elite performance. We engineer maximum speed through advanced edge control, explosive starts, and biomechanical efficiency. Our Architects analyze every stride to eliminate energy waste and build the agility required for professional-level transitions."
        },
        {
            id: "stickhandling",
            icon: <Shield className="w-10 h-10 text-red-600" aria-label="Stickhandling Icon" />,
            title: "STICKHANDLING",
            description: "Creative puck protection and precision maneuvering in high-traffic zones. We teach players how to maintain control in tight spaces using professional techniques. This lab emphasizes 'soft hands' and the ability to shield the puck effectively against aggressive defensive pressure."
        },
        {
            id: "shooting-mechanics",
            icon: <Crosshair className="w-10 h-10 text-red-600" aria-label="Shooting Mechanics Icon" />,
            title: "SHOOTING MECHANICS",
            description: "A scientific breakdown of the wrist shot, snap shot, and one-timer accuracy. We analyze weight transfer and release velocity to transform your shooting into a professional weapon. Repetition under technical correction ensures power and precision in every scoring opportunity."
        },
        {
            id: "coordination",
            icon: <Brain className="w-10 h-10 text-red-600" aria-label="Coordination Icon" />,
            title: "NEUROMUSCULAR COORDINATION",
            description: "Developing split-second cognitive reactions and agility. This lab bridges the gap between physical ability and mental execution. Through specialized drills, we enhance the brain-to-body link, improving balance, reaction time, and overall athletic fluidity on the ice."
        },
        {
            id: "hockey-iq",
            icon: <Target className="w-10 h-10 text-red-600" aria-label="Hockey IQ Icon" />,
            title: "STRATEGIC HOCKEY IQ",
            description: "Deep positional awareness and advanced situational strategies. We utilize video analysis and tactical simulations to develop a player's understanding of the game. Learn to read the play before it happens, optimizing positioning and decision-making in all three zones."
        }
    ];

    return (
        <section className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden bg-black text-white">

            {/* Background Fractals - Brightened */}
            <div className="absolute inset-0 z-0">
                <FractalBackground />
            </div>

            {/* SEO Metadata (Hidden) */}
            <div className="hidden">
                <title>Elite Hockey Skills Training Vienna | 6 Pillars of Performance</title>
                <meta name="description" content="Advanced technical development at EisRing Süd. Six specialized labs: Skills Training, Skating Mechanics, Stickhandling, Shooting Mechanics, Neuromuscular Coordination, and Strategic Hockey IQ. ZVR: 1999424312. Wir sprechen Deutsch, we speak English, мы говорим по-русски." />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Navigation Back - Restored Hover Style & Clickability */}
                <div className="absolute top-0 left-0 z-50 hover:scale-105 transition-transform origin-left">
                    <Link to="/" className="group flex items-center gap-2 text-gray-500 hover:text-red-600 uppercase tracking-widest text-xs font-bold transition-colors duration-300 cursor-pointer">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Lab
                    </Link>
                </div>

                {/* Hero Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center mt-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                        THE SKILLS <span className="text-red-600">LAB</span><br />
                        ENGINEER YOUR GAME
                    </h1>
                </motion.div>

                {/* 6 Skill Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
                    {skills.map((skill, index) => (
                        <motion.div
                            id={skill.id}
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-start h-full scroll-mt-32"
                        >
                            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                                {skill.icon}
                            </div>

                            <h3 className="text-xl md:text-2xl font-black italic uppercase mb-4 text-white group-hover:text-red-500 transition-colors leading-tight">
                                {skill.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors flex-grow font-medium">
                                {skill.description}
                            </p>

                            {/* Decorative Line */}
                            <div className="w-full h-0.5 bg-gradient-to-r from-red-600/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-12 md:p-16 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center overflow-hidden mb-24"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 opacity-50" />

                    <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-8 relative z-10">
                        READY TO ENGINEER <span className="text-red-600">YOUR GAME?</span>
                    </h2>

                    <Link
                        to="/#registration"
                        className="relative z-10 inline-block px-10 py-4 bg-red-600 text-white font-black font-orbitron text-xl uppercase tracking-widest hover:bg-white hover:text-red-600 transition-colors duration-300 clip-path-button"
                        style={{
                            clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)"
                        }}
                    >
                        BOOK A SESSION
                    </Link>
                </motion.div>

                {/* Footer Info */}
                <div className="text-center border-t border-white/10 pt-12 pb-12">
                    <p className="text-white text-sm font-bold tracking-wider uppercase">
                        Vienna Hockey Lab <span className="text-red-600 mx-2">|</span> ZVR: 1999424312 <span className="text-red-600 mx-2">|</span> EisRing Süd, 1100 Vienna
                    </p>
                </div>

            </div>
        </section>
    );
};

export default SkillsPage;
