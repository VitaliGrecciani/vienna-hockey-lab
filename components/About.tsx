import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

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

        {/* Dynamic Video Container */}
        <VideoPlayer />
      </div>
    </section>
  );
};

const VideoPlayer = () => {
  const [isVertical, setIsVertical] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 200 };

  // Transform mouse position into rotation
  // Adjust output range to control tilt intensity (currently 15 degrees)
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate mouse position relative to center (range: -0.5 to 0.5)
    // Then multiply by a factor (e.g., 200) to feed into transforms
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent affecting the tilt or other interactions
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setIsVertical(videoHeight > videoWidth);
      setVideoLoaded(true);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center py-10 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        viewport={{ once: true }}

        // Use a simpler floating animation that doesn't conflict with tilt
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        } as any}

        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}

        className={`
          relative mx-auto bg-black transition-all duration-500 group cursor-grab active:cursor-grabbing
          ${isVertical
            ? "w-[300px] h-[600px] max-w-full max-h-[80vh] rounded-[3rem] border-[12px] border-gray-900 shadow-[0_25px_60px_-10px_rgba(220,38,38,0.5)] drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            : "w-full aspect-video rounded-xl border border-gray-800 drop-shadow-[0_0_30px_rgba(255,0,0,0.3)]"
          }
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Phone Notch (Only for Vertical) */}
        {isVertical && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-30 flex justify-center items-center pointer-events-none">
            <div className="w-12 h-1 bg-gray-800 rounded-full opacity-50"></div>
          </div>
        )}

        {/* Mute Button Indicator */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-40 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 text-white hover:bg-black/80 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            // Muted Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          ) : (
            // Unmuted Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-lab-red">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </motion.button>

        {/* Dynamic Glare Effect based on Mouse Position */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20 rounded-[inherit]"
          style={{
            x: useTransform(x, [-100, 100], [-20, 20]),
            y: useTransform(y, [-100, 100], [-20, 20]),
            opacity: useTransform(x, [-100, 100], [0.2, 0.4])
          }}
        />

        {/* Subtle Screen Texture/Noise */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-[inherit]"></div>

        {/* Video Content */}
        <video
          ref={videoRef}
          onLoadedMetadata={handleMetadata}
          autoPlay
          loop
          muted={isMuted} // Controlled by React state
          playsInline
          className={`w-full h-full object-cover pointer-events-none ${!videoLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 rounded-[inherit]`}
        >
          <source src="/video-hockey-lab.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default About;