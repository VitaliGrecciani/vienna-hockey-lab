import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Precision. <span className="text-lab-red">Power.</span> Intelligence.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
            Vienna Hockey Lab stands as the only specialized skills training facility in Vienna. We operate as a high-performance center dedicated to the total deconstruction and reconstruction of your game. Our staff provides elite coaching for kids, teens, and adults with a surgical focus on skating mechanics, stickhandling precision, and the intricate physics of shooting. We bridge the gap between effort and results by developing the crucial element of Hockey IQ in every athlete.
          </p>
          <div className="h-1 w-24 bg-lab-red shadow-glow" />
        </motion.div>

        {/* 3D Container for "Smartphone/Device" feel */}
        <div className="relative group" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, rotateY: 15, rotateX: 5, z: -50 }}
            whileInView={{ 
              opacity: 1, 
              rotateY: 0, 
              rotateX: 0, 
              z: 0 
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            
            // "Living" idle animation (Floating in zero-g)
            animate={{
              y: [0, -8, 0],
              rotateX: [0, 2, 0],
              rotateY: [0, -2, 0]
            }}
            // @ts-ignore - Framer motion transition types work but TS can be strict here
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              default: { duration: 0.5 }
            }}

            // Interaction State: Lift up and tilt towards user like a device in hand
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,  // Tilt back slightly
              rotateY: -5, // Turn towards viewer
              y: -15,      // Lift up
              transition: { duration: 0.3, ease: "easeOut" }
            }}

            className="relative aspect-video bg-black border border-gray-800 drop-shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:drop-shadow-[0_0_50px_rgba(255,0,0,0.6)] transition-shadow duration-500"
            style={{
              clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Glare / Reflection Effect */}
            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none z-20" />
            
            {/* Subtle Screen Texture/Noise */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Video Content - Reliable CDN Link */}
            <video 
              width="100%" 
              height="100%" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 relative z-0 w-full h-full"
            >
              <source src="https://videos.pexels.com/video-files/8559263/8559263-hd_1920_1080_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;