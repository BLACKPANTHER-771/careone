import { motion } from 'framer-motion';
import { useScrollParallax } from '../hooks/useScrollParallax';

const ORBIT_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * Math.PI * 2,
  radius: 120 + (i % 3) * 30,
  size: 3 + (i % 3),
  duration: 6 + (i % 4),
  color: i % 2 === 0 ? '#FFD700' : '#FFA500',
}));

export default function OfferSection() {
  const { ref, y } = useScrollParallax(0.15);

  return (
    <section ref={ref} className="min-h-screen w-full relative flex flex-col items-center justify-center py-20 overflow-hidden">
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute top-32 text-xs text-white/40 tracking-[0.3em] uppercase"
      >
        Exclusive for You
      </motion.p>

      {/* Parallax Background Orb */}
      <motion.div 
        className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(200,160,60,0.12) 0%, transparent 70%)',
          y 
        }}
      />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        
        <div className="relative w-80 h-80 flex items-center justify-center mb-16">
          
          {/* Rotating glow behind crystal */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.4) 0%, transparent 60%)' }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 3D CSS Diamond Crystal */}
          <motion.div
            className="relative flex flex-col items-center"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Top Pyramid */}
            <div style={{
              width: 0, height: 0,
              borderLeft: '60px solid transparent',
              borderRight: '60px solid transparent',
              borderBottom: '80px solid rgba(41,121,255,0.3)',
              filter: 'drop-shadow(0 0 10px rgba(41,121,255,0.5))'
            }} />
            {/* Bottom Pyramid */}
            <div style={{
              width: 0, height: 0,
              borderLeft: '60px solid transparent',
              borderRight: '60px solid transparent',
              borderTop: '60px solid rgba(41,121,255,0.2)',
              filter: 'drop-shadow(0 0 10px rgba(41,121,255,0.5))'
            }} />
          </motion.div>

          {/* Holographic Text Overlay (fixed rotation, just floats) */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 drop-shadow-[0_0_20px_rgba(200,160,60,0.8)] tracking-tighter">
              20% OFF
            </span>
            <span className="text-[10px] tracking-[0.3em] text-white/80 mt-1 drop-shadow-md">
              ON MEDICINES
            </span>
          </motion.div>

          {/* Orbiting Golden Particles */}
          <div className="absolute inset-0">
            {ORBIT_PARTICLES.map((p, i) => (
              <motion.div
                key={`op-${i}`}
                className="absolute"
                style={{ 
                  width: p.size, height: p.size, borderRadius: '50%', 
                  background: p.color, boxShadow: `0 0 6px ${p.color}`, 
                  left: '50%', top: '50%', 
                  marginLeft: -p.size/2, marginTop: -p.size/2, 
                  transformOrigin: `${-p.radius}px 0px` 
                }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  ease: 'linear', 
                  delay: -(p.angle / (Math.PI * 2)) * p.duration 
                }}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
