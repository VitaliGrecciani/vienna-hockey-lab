import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Individual Trainings",
    description: "Focus on surgical precision and 1-on-1 deconstruction of mechanics.",
    features: [
      "Shooting training",
      "Hockey off-ice session",
      "Game analytics"
    ]
  },
  {
    title: "Group Sessions",
    description: "High-intensity drills, situational IQ, and game-speed execution.",
    features: [
      "High-intensity skills: 3-coach session"
    ]
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase tracking-wider italic font-black text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our <span className="text-red-600">Services</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-white/10 backdrop-blur-md border border-gray-800 hover:border-red-600/20 transition-all duration-500 rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-black italic mb-4 text-white group-hover:text-red-600 transition-colors uppercase">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-200 transition-colors relative z-10">
                {service.description}
              </p>

              {service.features && (
                <div className="mt-6 flex flex-col gap-3 relative z-10 border-t border-gray-800/60 pt-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-3 shrink-0 flex items-center justify-center"></span>
                      <span className="opacity-90 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

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

export default Services;
