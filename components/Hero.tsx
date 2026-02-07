import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToForm = () => {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 90, mass: 2.5 };
  const rotateX = useSpring(useTransform(y, [-500, 500], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-500, 500], [-15, 15]), springConfig);
  
  const logoX = useSpring(useTransform(x, [-500, 500], [-15, 15]), springConfig);
  const logoY = useSpring(useTransform(y, [-500, 500], [-15, 15]), springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 py-8 md:py-12 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lab-red/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="z-10 flex flex-col items-center w-full max-w-[90rem]"
      >
        {/* ULTRA GLASSY 3D LOGO - REFINED */}
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d"
          }}
          className="w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center relative cursor-pointer mb-6 md:mb-8 
                     bg-white/5 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_40px_rgba(255,255,255,0.05)] overflow-hidden"
        >
             <motion.img 
               src="/logo.jpg" 
               alt="Vienna Hockey Lab Logo" 
               style={{ 
                 x: logoX, 
                 y: logoY, 
                 scale: 1.65 
               }}
               className="w-full h-full object-cover rounded-full z-10 mix-blend-screen brightness-110 contrast-125"
             />

             {/* Soft Glass Sheen */}
             <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40"></div>
             
             {/* Subtle Inner Rim (No hard border) */}
             <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] z-30 pointer-events-none"></div>
        </motion.div>

        {/* Typography */}
        <motion.div className="flex flex-col items-center mb-6 w-full">
          <h1 className="text-[10vw] md:text-[7rem] lg:text-[9rem] font-black font-orbitron tracking-tighter text-white leading-[0.8] uppercase mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            VIENNA
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-[8vw] md:text-[5rem] lg:text-[7rem] font-black font-orbitron tracking-tighter uppercase leading-[0.8]">
            <span className="text-lab-red drop-shadow-[0_0_40px_rgba(255,0,0,0.5)]">HOCKEY</span>
            <span className="text-gray-400">LAB</span>
          </div>
        </motion.div>

        {/* NEW SLOGAN: ULTIMATE */}
        <motion.p className="text-gray-500 font-mono text-[10px] md:text-lg tracking-[0.5em] uppercase mb-6 md:mb-8 font-black italic">
          Ultimate Performance Engineering
        </motion.p>

        <motion.button
          onClick={scrollToForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)"
          }}
          className="relative px-10 py-4 md:px-14 md:py-5 bg-lab-red text-black font-black font-orbitron text-base md:text-2xl uppercase tracking-widest hover:bg-white transition-colors"
        >
          Book A Session
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
