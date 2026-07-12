import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import RippleButton from './RippleButton';
import { useScrollParallax } from '../hooks/useScrollParallax';

function useStoreStatus() {
  const [status, setStatus] = useState<'open' | 'closed'>('open');
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const totalMin = h * 60 + m;
      // Open: 8:00 AM (480) to 11:00 PM (1380)
      setStatus(totalMin >= 480 && totalMin < 1380 ? 'open' : 'closed');
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return status;
}

const CORE_PARTICLES = [
  { rx: 100, ry: 40, phase: 0, duration: 3, color: '#FFD700' },
  { rx: 100, ry: 40, phase: Math.PI / 4, duration: 3, color: '#FFD700' },
  { rx: 80, ry: 30, phase: Math.PI / 2, duration: 4, color: '#00E5FF' },
  { rx: 80, ry: 30, phase: Math.PI, duration: 4, color: '#00E5FF' },
  { rx: 120, ry: 50, phase: Math.PI / 6, duration: 5, color: '#2979FF' },
  { rx: 120, ry: 50, phase: Math.PI * 0.8, duration: 5, color: '#2979FF' },
  { rx: 90, ry: 35, phase: Math.PI * 1.3, duration: 3.5, color: '#FFD700' },
  { rx: 110, ry: 45, phase: Math.PI * 1.7, duration: 4.5, color: '#00E5FF' },
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const status = useStoreStatus();
  const { ref, y } = useScrollParallax(0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma ?? 0) / 30; // normalize to ~-1 to 1
      const y = ((e.beta ?? 0) - 45) / 30; // offset by 45 for natural phone hold
      setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (typeof window.DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typeof window.DeviceOrientationEvent !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-16 pb-4 px-4">
      {/* Background layer mapped to parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        {/* Glow behind core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary/10 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        
        {/* Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-8 inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/5 ${status === 'closed' ? 'bg-destructive/10 border-destructive/30' : ''}`}
        >
          {status === 'open' ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-white/80">
                OPEN NOW — 8:00 AM – 11:00 PM
              </span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-white/80">
                CLOSED · Opens Tomorrow at 8:00 AM
              </span>
            </>
          )}
        </motion.div>

        {/* The Living Health Core */}
        <motion.div 
          className="relative w-44 h-44 md:w-72 md:h-72 flex items-center justify-center mx-auto mb-6 md:mb-12"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
          {/* Outer golden orbit rings */}
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            <div style={{ width: '100%', height: '100%', border: '1.5px solid rgba(200,160,60,0.35)', borderRadius: '50%', transform: 'rotateX(75deg)', boxShadow: '0 0 20px rgba(200,160,60,0.15)' }} />
          </motion.div>
          <motion.div className="absolute inset-4" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
            <div style={{ width: '100%', height: '100%', border: '1px solid rgba(200,160,60,0.2)', borderRadius: '50%', transform: 'rotateX(60deg) rotateZ(30deg)', boxShadow: '0 0 15px rgba(200,160,60,0.1)' }} />
          </motion.div>
          <motion.div className="absolute inset-8" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
            <div style={{ width: '100%', height: '100%', border: '1px solid rgba(41,121,255,0.4)', borderRadius: '50%', transform: 'rotateX(80deg)', boxShadow: '0 0 25px rgba(41,121,255,0.2)' }} />
          </motion.div>

          {/* Core sphere */}
          <motion.div
            animate={{ scale: [1, 1.04, 1], boxShadow: [
              '0 0 40px 20px rgba(41,121,255,0.3), 0 0 80px 40px rgba(41,121,255,0.15), 0 0 120px 60px rgba(41,121,255,0.05)',
              '0 0 60px 30px rgba(41,121,255,0.5), 0 0 120px 60px rgba(41,121,255,0.25), 0 0 180px 90px rgba(41,121,255,0.08)',
              '0 0 40px 20px rgba(41,121,255,0.3), 0 0 80px 40px rgba(41,121,255,0.15), 0 0 120px 60px rgba(41,121,255,0.05)',
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(100,180,255,0.9) 0%, rgba(41,121,255,0.8) 40%, rgba(10,30,100,0.9) 100%)',
            }}
          />

          {/* Orbiting energy particles */}
          {CORE_PARTICLES.map((p, i) => (
            <motion.div
              key={`cp-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
              animate={{
                x: [p.rx * Math.cos(p.phase), p.rx * Math.cos(p.phase + Math.PI), p.rx * Math.cos(p.phase + Math.PI * 2)],
                y: [p.ry * Math.sin(p.phase), p.ry * Math.sin(p.phase + Math.PI), p.ry * Math.sin(p.phase + Math.PI * 2)],
              }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>

        {/* Wordmark */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-white drop-shadow-2xl mb-4 text-center"
        >
          CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ONE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg md:text-xl text-white/50 font-light tracking-wide mb-12"
        >
          Your Health. Our Mission.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <RippleButton 
            href="tel:8826775758"
            className="group inline-flex items-center justify-center gap-3 bg-cyan-400 text-black px-8 py-5 rounded-2xl font-bold text-lg tracking-wide shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.6)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
            <Phone className="w-6 h-6 relative z-10" />
            <span className="relative z-10">CALL NOW</span>
          </RippleButton>

          <RippleButton 
            href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
            target="_blank"
            className="group inline-flex items-center justify-center gap-3 glass-button px-8 py-5 rounded-2xl font-medium text-lg tracking-wide text-white hover:scale-105"
          >
            <MapPin className="w-6 h-6 text-primary relative z-10" />
            <span className="relative z-10">GET DIRECTIONS</span>
          </RippleButton>
        </motion.div>
      </div>
    </section>
  );
}
