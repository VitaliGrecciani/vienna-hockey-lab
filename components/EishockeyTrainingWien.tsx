import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FractalBackground from './FractalBackground';
import Footer from './Footer';
import SEO from './SEO';
import RegistrationForm from './RegistrationForm';

interface Props {
  onShowLegal: () => void;
}

const EishockeyTrainingWien: React.FC<Props> = ({ onShowLegal }) => {
    return (
        <main className="relative min-h-screen text-white overflow-hidden bg-transparent pb-0">
            <SEO 
                title="Eishockey Einzeltraining Wien | Vienna Hockey Lab"
                description="Professionelles Eishockey-Einzeltraining in Wien. Skating, Shooting, Stickhandling & Hockey IQ. Trainiere mit lizenzierten Coaches im EisRing Süd. Jetzt buchen!"
                canonical="https://www.viennahockeylab.com/de"
            />

            {/* Navigation Back */}
            <div className="absolute top-0 left-0 z-50 p-6 md:p-8 hover:scale-105 transition-transform origin-left">
                <Link to="/" className="group flex items-center gap-2 text-gray-500 hover:text-red-600 uppercase tracking-widest text-xs font-bold transition-colors duration-300 cursor-pointer">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                </Link>
            </div>

            <article className="relative z-10 pt-32 pb-12 px-4 max-w-3xl mx-auto">

                {/* ── HERO ── */}
                <motion.header 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-5 leading-tight text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]">
                        Eishockey Einzeltraining <span className="text-red-600">Wien</span> – Vienna Hockey Lab
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
                        Individuelles Eishockey Training in Wien und ganz Österreich. Wir entwickeln dein volles Potenzial durch biomechanische Analysen und professionelles Skills-Training.
                    </p>
                </motion.header>

                {/* ── INTRO ── */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <p className="text-base text-gray-300 leading-relaxed">
                        Suchst du nach professionellem <strong className="text-white">Eishockey Privattraining in Wien</strong>? Das Vienna Hockey Lab ist deine erste Adresse für hochqualifiziertes, individuelles Skills-Training auf und abseits des Eises. Trainiere bei uns wie ein Profi! Unser Standort ist der traditionsreiche <strong className="text-white">EisRing Süd im 10. Bezirk (1100 Wien – Favoriten)</strong>. Hier bieten wir modernste Trainingsmethoden für Kinder, Jugendliche, Amateure und angehende Profiligisten.
                    </p>
                </motion.section>

                {/* ── SKILLS ── */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-wide mb-8 border-l-4 border-red-600 pl-4">
                        Unsere Schwerpunkte
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-red-600/40 transition-colors duration-300">
                            <h3 className="text-base font-bold text-red-500 uppercase mb-3">Power Skating & Schlittschuhtechnik</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Effizientes Edge-Control, explosive Starts und maximale Geschwindigkeit bei minimalem Energieverlust. Wir brechen deinen Laufstil biomechanisch herunter und korrigieren Fehler im Detail.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-red-600/40 transition-colors duration-300">
                            <h3 className="text-base font-bold text-red-500 uppercase mb-3">Elite Shooting & Stickhandling</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Präzises Stickhandling in engen Räumen, harte und platzierte Schüsse – Handgelenkschuss, Schlagschuss, Onetimer. Wir trainieren die gesamte Körperrotation für maximale Schusskraft.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* ── HOCKEY IQ ── */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-wide mb-8 border-l-4 border-red-600 pl-4">
                        Game Intelligence: Der Hockey IQ
                    </h2>
                    <p className="text-base text-gray-300 leading-relaxed">
                        Ein herausragender Spieler muss das Spiel lesen können. In unseren Einzeltrainings und dem <strong className="text-white">Kleingruppentraining</strong> arbeiten wir intensiv an deinem <strong className="text-white">Hockey IQ</strong> – Spielsituationen, Positionsspiel und Entscheidungsprozesse unter Druck. Diese Art des Trainings verschafft dir einen entscheidenden Vorteil auf dem Eis.
                    </p>
                </motion.section>

                {/* ── COACHES (E-E-A-T) ── */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <Link to="/" className="block group bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-red-600/40 transition-all duration-300 cursor-pointer">
                        <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-wide mb-4 border-l-4 border-red-600 pl-4">
                            Training auf Profi-Niveau
                        </h2>
                        <p className="text-base text-gray-300 leading-relaxed mb-4">
                            Professionelles Training unter der Leitung von Ex-Profis aus der KHL und nordamerikanischen Ligen. Unsere Head Coaches <strong className="text-white">Dmitry Tabatadze</strong> und <strong className="text-white">Kirill Kurochkin</strong> vereinen modernste internationale Trainingskonzepte mit jahrelanger Spielerfahrung auf allerhöchstem Level.
                        </p>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold group-hover:text-red-600 transition-colors duration-300">
                            Mehr über unsere Coaches →
                        </span>
                    </Link>
                </motion.section>

                {/* ── PRICING ── */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-wide mb-4 border-l-4 border-red-600 pl-4">
                        Preise & Trainingspakete
                    </h2>
                    <p className="text-base text-gray-300 leading-relaxed mb-10">
                        Jedes Training wird individuell auf dich abgestimmt. Unsere Coaches garantieren dir die höchste Betreuungsqualität beim Eishockey Training in Wien.
                    </p>

                    <div className="grid md:grid-cols-3 gap-5 text-center">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-between">
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-white">Individual 1-on-1</h3>
                            <p className="text-xs text-gray-500 mb-4">60 Min chirurgische Fehleranalyse auf dem Eis.</p>
                            <span className="text-2xl font-black text-red-600">ab 70€</span>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-red-600/60 relative shadow-[0_0_25px_rgba(200,0,0,0.15)] flex flex-col items-center justify-between">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] px-3 py-1 font-bold uppercase rounded-full tracking-wider">Beliebt</div>
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-white">Gruppentraining</h3>
                            <p className="text-xs text-gray-500 mb-4">Intensive Drills in Kleingruppen (Skills & Situations).</p>
                            <span className="text-2xl font-black text-red-600">ab 23€</span>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-between">
                            <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-white">Off-Ice / Athletik</h3>
                            <p className="text-xs text-gray-500 mb-4">Physische Vorbereitung und Videoanalyse.</p>
                            <span className="text-2xl font-black text-red-600">ab 30€</span>
                        </div>
                    </div>
                </motion.section>

                {/* ── FORM ── */}
                <div id="booking" className="scroll-mt-32">
                    <RegistrationForm lang="de" />
                </div>
            </article>

            <Footer onShowLegal={onShowLegal} />
        </main>
    );
};

export default EishockeyTrainingWien;
