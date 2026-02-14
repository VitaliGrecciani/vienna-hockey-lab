import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coach } from '../types';

/* 
   Please ensure you have these existing in /public folder:
   - coach-dmitry.jpg
   - coach-kirill.jpg
   - coach-vladimir.jpg
   - helmet-1.png (transparent background)
   - helmet-2.png
   - helmet-3.png
*/

const coaches: Coach[] = [
  {
    name: "Dmitry Tabatadze",
    role: "Head Coach",
    experience: ["CSKA Moscow school", "Played in Russian Professional Leagues MHL/VHL/KHL", "Licensed hockey coach"],
    image: "/coach-dmitry.jpg"
  },
  {
    name: "Kirill Kurochkin",
    role: "Skills Specialist",
    experience: ["Avangard Omsk School", "Vienna Capitals u18-20 pro-coach", "Licensed hockey coach"],
    image: "/coach-kirill.jpg"
  },
  {
    name: "Vladimir Borodenko",
    role: "Development Coach",
    experience: ["Played in USA Leagues", "Czech Republic League pro experienced"],
    image: "/coach-vladimir.jpg"
  }
];

const CoachCard: React.FC<{ coach: Coach, index: number }> = ({ coach, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use helmet PNGs if available, otherwise just keep area clean or use placeholder
  const helmetImageSrc = `/helmet-${index + 1}.png`;

  return (
    <div
      className="relative w-full h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full perspective-1000">

        {/* === FRONT SIDE (Default Visible) === */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden z-10"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* HELMET - Large PNG */}
          <div className="relative w-56 h-56 mb-4 flex items-center justify-center">
            <img
              src={helmetImageSrc}
              alt={`${coach.name} Helmet`}
              className={`w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 object-center mix-blend-screen
                 ${index === 0 ? 'scale-[2.0]' : 'scale-110'}
               `}
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x200/222222/FFFFFF?text=NO+HELMET+PNG";
                (e.target as HTMLImageElement).style.opacity = "0.5";
              }}
            />
            {/* Red ambient glow */}
            <div className="absolute inset-0 bg-red-600/20 blur-3xl -z-10 rounded-full scale-75 pointer-events-none"></div>
          </div>

          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide font-orbitron">
            {coach.name}
          </h3>

          <p className="text-red-500 font-mono text-xs mb-6 uppercase tracking-widest font-bold border-b border-red-600/30 pb-2">
            {coach.role}
          </p>

          {/* Experience List - Transparent text */}
          <ul className="text-gray-300 space-y-2 text-sm font-medium w-full text-left pl-4 pb-4">
            {coach.experience.map((exp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-600 text-xs mt-1">●</span>
                <span className="leading-tight opacity-90">{exp}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* === BACK SIDE (Visible on Hover) === */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-red-600/50 shadow-[0_0_50px_rgba(255,0,0,0.4)] bg-black z-10"
          initial={{ rotateY: -180 }}
          animate={{ rotateY: isHovered ? 0 : -180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500/111111/FFFFFF?text=COACH+PHOTO";
            }}
          />
        </motion.div>

      </div>
    </div>
  );
};

const Coaches: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 uppercase italic font-black text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
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
