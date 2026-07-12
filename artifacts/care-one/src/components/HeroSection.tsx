import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import RippleButton from './RippleButton';

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

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const status = useStoreStatus();

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

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full pt-20">
        
        {/* Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-12 inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/5 ${status === 'closed' ? 'bg-destructive/10 border-destructive/30' : ''}`}
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
