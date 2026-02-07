import React, { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

const FractalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = { x: -2000, y: -2000 };
    const points: Point[] = [];
    const numPoints = 120;
    const connectionRadius = 250;
    const friction = 0.95; // Вязкость среды
    const ease = 0.05;    // Плавность возврата

    const initPoints = () => {
        points.length = 0;
        for(let i=0; i<numPoints; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            points.push({
                x, y,
                originX: x, originY: y,
                vx: 0, vy: 0
            });
        }
    };

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initPoints();
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      points.forEach((p, i) => {
          // Вычисляем расстояние до мыши
          const dxM = mouse.x - p.x;
          const dyM = mouse.y - p.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);

          // Если мышь близко, точка "притягивается" (или убегает, если изменить знак)
          if (distM < connectionRadius) {
              const force = (connectionRadius - distM) / connectionRadius;
              const angle = Math.atan2(dyM, dxM);
              
              // Добавляем ускорение к мыши с эффектом инерции
              p.vx += Math.cos(angle) * force * 1.5; 
              p.vy += Math.sin(angle) * force * 1.5;
          }

          // Возврат к изначальной позиции (пружина)
          p.vx += (p.originX - p.x) * ease;
          p.vy += (p.originY - p.y) * ease;

          // Применяем физику
          p.vx *= friction;
          p.vy *= friction;
          p.x += p.vx;
          p.y += p.vy;

          // Связь с КУРСОРОМ
          if (distM < connectionRadius) { 
              ctx.beginPath();
              // Усилил яркость и свечение связей
              ctx.strokeStyle = distM < 100 ? 'rgba(255, 64, 129, 0.6)' : 'rgba(255, 255, 255, 0.3)';
              ctx.lineWidth = (1 - distM / connectionRadius) * 2;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
          }

          // Связи между точками - ярче
          for (let j = i + 1; j < points.length; j++) {
              const p2 = points[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 150) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - dist / 150)})`;
                  ctx.lineWidth = 0.8;
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: '#050505' }}
    />
  );
};

export default FractalBackground;
