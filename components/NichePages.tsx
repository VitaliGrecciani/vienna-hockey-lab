import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import SEO from './SEO';
import RegistrationForm from './RegistrationForm';

export const IndividualTraining: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Individual Hockey Coaching Vienna | Elite 1-on-1"
            description="Premium individual hockey training in Vienna. 1-on-1 sessions designed for surgical deconstruction of your mechanics and maximizing your game impact."
            canonical="https://viennahockeylab.com/individual-training"
        />
        <article className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8"
            >
                Individual <span className="text-red-600">Training</span>
            </motion.h1>
            <div className="prose prose-invert prose-lg">
                <p>Welcome to the core of Vienna Hockey Lab's philosophy: surgical precision and 1-on-1 deconstruction of your mechanics.</p>
                <p>In group settings, individual habits often go unnoticed. Our individual training ensures every stride, stickhandle, and shot is analyzed by our elite coaching staff.</p>
                <p>If you're a prospect looking to refine your biomechanical advantage or an amateur aiming to break bad habits, this is your laboratory.</p>
            </div>
            <div className="mt-16">
                <RegistrationForm />
            </div>
        </article>
        <Footer onShowLegal={onShowLegal} />
    </main>
);

export const HockeyIQ: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Hockey IQ & Video Analysis Training | Vienna"
            description="Sharpen your Hockey IQ in Vienna. Strategic hockey intelligence training, video analysis, and situational awareness."
            canonical="https://viennahockeylab.com/hockey-iq"
        />
        <article className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8"
            >
                Hockey <span className="text-red-600">IQ</span>
            </motion.h1>
            <div className="prose prose-invert prose-lg">
                <p>Game intelligence is what separates the elite from the average. Speed and shooting can only take you so far if you lack positional awareness.</p>
                <p>Our Hockey IQ program is an entirely unique niche in Vienna. We focus on reading plays before they happen, recognizing defensive gaps, and offensive positioning.</p>
                <p>We employ off-ice video analysis and on-ice situational drills to force split-second decision making under pressure.</p>
            </div>
            <div className="mt-16">
                <RegistrationForm />
            </div>
        </article>
        <Footer onShowLegal={onShowLegal} />
    </main>
);

export const SkatingMechanics: React.FC<{ onShowLegal: () => void }> = ({ onShowLegal }) => (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
        <SEO 
            title="Power Skating Mechanics Vienna | Hockey Training"
            description="Deep dive into power skating, edge control, and explosive starts in Vienna. Maximize your hockey speed and agility."
            canonical="https://viennahockeylab.com/skating-mechanics"
        />
        <article className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8"
            >
                Skating <span className="text-red-600">Mechanics</span>
            </motion.h1>
            <div className="prose prose-invert prose-lg">
                <p>The foundation of elite hockey performance is skating. We engineer maximum speed through advanced edge control, explosive starts, and biomechanical efficiency.</p>
                <p>We conduct a total breakdown of your stride to eliminate energy waste, focusing on knee bend, ankle flexion, and optimal weight transfer.</p>
                <p>Whether it's tight turns, forward-to-backward transitions, or lateral agility, we rebuild your foundation from the ice up.</p>
            </div>
            <div className="mt-16">
                <RegistrationForm />
            </div>
        </article>
        <Footer onShowLegal={onShowLegal} />
    </main>
);
