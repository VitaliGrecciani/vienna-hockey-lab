import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coach } from '../types';

const coaches: Coach[] = [
  {
    name: "Dmitry Tabatadze",
    role: "Head Coach",
    experience: ["CSKA Moscow", "VHL Professional", "MHL", "KHL Experience"],
    image: "/coach-dmitry.jpg" // Ждет файл в public
  },
  {
    name: "Kirill Kurochkin",
    role: "Skills Specialist",
    experience: ["Avangard Omsk School", "Vienna Capitals Coach"],
    image: "/coach-kirill.jpg" // Ждет файл в public
  },
  {
    name: "Vladimir Bondorenko",
    role: "Development Coach",
    experience: ["USA Leagues", "Czech Republic Pro Experience"],
    image: "/coach-vladimir.jpg" // Ждет файл в public
  }
];

const CoachCard: React.FC<{ coach: Coach, index: number }> = ({ coach, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const helmetImages = ["/helmet-1.png", "/helmet-2.png", "/helmet-3.png"];

  return (
    <motion.div
      className="relative p-6 flex flex-col items-center text-center group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-glow transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-40 h-40 mb-6 perspective-1000">
        <motion.div 
          className="w-full h-full relative"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front: Helmet */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-transparent" style={{ backfaceVisibility: "hidden" }}>
            <img src={helmetImages[index]} alt="Helmet" className="w-full h-full rounded-full object-cover scale-110" />
          </div>

          {/* Back: Coach */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-red-600 p-1 bg-black" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <img src={coach.image} alt={coach.name} className="w-full h-full rounded-full object-cover filter grayscale" />
          </div>
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 z-10">{coach.name}</h3>
      <p className="text-red-600 font-mono text-sm mb-4 uppercase tracking-widest z-10">{coach.role}</p>
      <ul className="text-gray-400 space-y-2 text-sm z-10">
        {coach.experience.map((exp, i) => (
          <li key={i} className="border-b border-white/5 pb-1">{exp}</li>
        ))}
      </ul>
      
      {/* Background flare effect */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/10 blur-3xl rounded-full group-hover:bg-red-600/20 transition-all duration-700" />
    </motion.div>
  );
};

const Coaches: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase italic font-black text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          The <span className="text-red-600">Architects</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <CoachCard key={index} coach={coach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaches;
