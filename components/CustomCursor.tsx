import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    // Animation loop for smooth transform
    const render = () => {
      if (cursorRef.current) {
        // Calculate velocity for rotation
        const vx = pos.current.x - lastPos.current.x;
        // const vy = pos.current.y - lastPos.current.y;
        
        // Physics: stick tilts based on X velocity
        // Limit rotation to avoid spinning wildy
        const rotation = Math.max(-45, Math.min(45, vx * 2));
        
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${rotation}deg)`;
        
        // Update last pos for next frame velocity calc
        lastPos.current = { ...pos.current };
      }
      rafId.current = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      style={{ 
        willChange: 'transform',
        // Offset so the "blade" of the stick feels like the contact point
        marginLeft: '-10px', 
        marginTop: '-10px'
      }}
    >
      <svg width="60" height="60" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,0,0,0.5))' }}>
        <path d="M15 5L22 2L82 62L75 65L15 5Z" fill="#111"/> 
        <path d="M82 62C82 62 98 78 88 88C78 98 62 92 52 82L48 72L82 62Z" fill="#FF0000"/> 
        <path d="M18 7L24 13M21 10L27 16" stroke="#444" strokeWidth="1.5"/> 
      </svg>
    </div>
  );
};

export default CustomCursor;