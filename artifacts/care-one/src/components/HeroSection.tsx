import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

// Stable particle positions computed once — not on each render
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  top: `${(i * 37 + 11) % 100}%`,
  left: `${(i * 53 + 7) % 100}%`,
  duration: 3 + (i % 5),
  delay: (i % 4) * 0.5,
}));

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic volumetric light background */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 200, mass: 1 }}
      />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] rounded-full bg-cyan/10 blur-[150px] pointer-events-none" />

      {/* Floating particles — positions are stable (computed once outside component) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full pt-20">
        
        {/* Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full border-white/5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-white/80">
            OPEN NOW — 8:00 AM – 11:00 PM
          </span>
        </motion.div>

        {/* Wordmark */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-bold font-display tracking-tighter text-white drop-shadow-2xl mb-6"
        >
          CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ONE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-2xl md:text-4xl text-white/60 font-light tracking-wide mb-16 space-y-2"
        >
          <p>Trusted Care.</p>
          <p className="text-white">One Destination.</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4"
        >
          <a 
            href="tel:8826775758"
            className="group relative inline-flex items-center justify-center gap-3 bg-cyan-400 text-black px-8 py-5 rounded-2xl font-bold text-lg tracking-wide overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.6)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
            <Phone className="w-6 h-6" />
            <span>CALL NOW</span>
          </a>

          <a 
            href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 glass-button px-8 py-5 rounded-2xl font-medium text-lg tracking-wide text-white hover:scale-105"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <span>GET DIRECTIONS</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
