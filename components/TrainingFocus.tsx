import React from 'react';
import { motion } from 'framer-motion';
import { TrainingModule } from '../types';

const modules: TrainingModule[] = [
  { title: "Skills Training", description: "Mastery of puck control, rapid stickhandling, and instinctual deking under pressure.", icon: "\u26a1" },
  { title: "Skating Mechanics", description: "Edge control, explosive starts, and efficiency engineering for maximum speed.", icon: "\u26f8" },
  { title: "Stickhandling", description: "Creative puck protection and precision maneuvering in high-traffic zones.", icon: "\ud83c\udf12" },
  { title: "Elite Shooting", description: "Biomechanics of the wrist shot, snap shot, and one-timer accuracy.", icon: "\ud83c\udfaf" },
  { title: "Coordination", description: "Neuromuscular agility and split-second cognitive reaction training.", icon: "\ud83e\udde0" },
  { title: "Hockey IQ", description: "Advanced video analysis and deep positional awareness strategies.", icon: "\ud83d\udc41" }
];

const TrainingFocus: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase tracking-wider italic font-black text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Training <span className="text-red-600">Focus</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-red-600/50 transition-all duration-500 rounded-xl overflow-hidden shadow-2xl"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingFocus;
