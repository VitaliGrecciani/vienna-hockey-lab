import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrainingModule } from '../types';

const modules: TrainingModule[] = [
  { title: "Skills Training", description: "Mastery of puck control, rapid stickhandling, and instinctual deking under pressure.", icon: "⚡", link: "/skills#skills-lab" },
  { title: "Skating Mechanics", description: "Edge control, explosive starts, and efficiency engineering for maximum speed.", icon: "⛸", link: "/skills#skating-mechanics" },
  { title: "Stickhandling", description: "Creative puck protection and precision maneuvering in high-traffic zones.", icon: "🌒", link: "/skills#stickhandling" },
  { title: "Elite Shooting", description: "Biomechanics of the wrist shot, snap shot, and one-timer accuracy.", icon: "🎯", link: "/skills#shooting-mechanics" },
  { title: "Coordination", description: "Neuromuscular agility and split-second cognitive reaction training.", icon: "🧠", link: "/skills#coordination" },
  { title: "Hockey IQ", description: "Advanced video analysis and deep positional awareness strategies.", icon: "👁", link: "/skills#hockey-iq" }
];

const TrainingFocus: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <Link to="/skills">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase tracking-wider italic font-black text-white hover:text-red-500 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Training <span className="text-red-600 hover:text-white transition-colors">Focus</span>
          </motion.h2>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, index) => (
            <Link to={mod.link || '/skills'} key={index} className="block h-full">
              <motion.div
                className="group relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-red-600/50 transition-all duration-500 rounded-xl overflow-hidden shadow-2xl cursor-pointer h-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute top-4 right-4 opacity-10 text-4xl group-hover:opacity-40 transition-all transform group-hover:rotate-12 duration-500 text-red-600 grayscale group-hover:grayscale-0">
                  {mod.icon}
                </div>

                <h3 className="text-2xl font-black italic mb-4 text-white group-hover:text-red-600 transition-colors uppercase">
                  {mod.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-200 transition-colors relative z-10">
                  {mod.description}
                </p>

                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingFocus;
