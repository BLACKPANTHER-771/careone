import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0.0s: Dark screen, one glowing blue particle appears
    const t1 = setTimeout(() => setPhase(1), 400); // 0.4s: More particles arrive
    const t2 = setTimeout(() => setPhase(2), 800); // 0.8s: Orbiting
    const t3 = setTimeout(() => setPhase(3), 1200); // 1.2s: Circular energy field
    const t4 = setTimeout(() => setPhase(4), 1800); // 1.8s: Text forms
    const t5 = setTimeout(() => setPhase(5), 2500); // 2.5s: Golden pulse
    const t6 = setTimeout(() => onComplete(), 3000); // 3.0s: End

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Particle container */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {phase >= 0 && phase < 4 && (
            <motion.div
              key="core-particle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: phase > 0 ? 1.5 : 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_5px_rgba(41,121,255,0.7)]"
            />
          )}

          {phase >= 1 && phase < 4 && (
            <motion.div key="orbit-group" className="absolute w-full h-full flex items-center justify-center">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`orbit-${i}`}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    x: Math.cos((i * Math.PI) / 3) * (phase >= 2 ? 60 : 20),
                    y: Math.sin((i * Math.PI) / 3) * (phase >= 2 ? 60 : 20),
                    rotate: phase >= 2 ? 360 : 0,
                  }}
                  transition={{
                    duration: phase >= 2 ? 2 : 0.4,
                    ease: phase >= 2 ? 'linear' : 'easeOut',
                    repeat: phase >= 2 ? Infinity : 0,
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_3px_rgba(0,229,255,0.6)]"
                />
              ))}
            </motion.div>
          )}

          {phase >= 3 && phase < 5 && (
            <motion.div
              key="energy-ring"
              initial={{ scale: 0, opacity: 0, borderWidth: '0px' }}
              animate={{ scale: 1, opacity: 1, borderWidth: '2px' }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="absolute w-32 h-32 rounded-full border border-blue-500 shadow-[0_0_30px_inset_rgba(41,121,255,0.5)]"
            />
          )}
        </AnimatePresence>

        {phase >= 4 && (
          <motion.div className="relative z-10 flex text-white font-display text-5xl md:text-7xl font-bold tracking-widest overflow-hidden">
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0 }}
            >
              C
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              A
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              R
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              E
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="ml-4 text-cyan-400"
            >
              ONE
            </motion.span>
          </motion.div>
        )}

        {phase >= 5 && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-16 h-16 rounded-full bg-accent mix-blend-screen"
          />
        )}
      </div>
    </motion.div>
  );
}
