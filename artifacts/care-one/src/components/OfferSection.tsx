import { motion } from 'framer-motion';

export default function OfferSection() {
  return (
    <section className="py-32 w-full relative z-10 overflow-hidden">
      
      {/* Background hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#1a140a] to-[#050816] opacity-50" />
      
      <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Animated Crystal Shape */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(201,168,76,0.8)]" 
                style={{ transform: `translate(${32 + i * 16}px, 0)` }}
              />
            </motion.div>
          ))}

          {/* Central Crystal using CSS shapes */}
          <motion.div 
            className="absolute w-32 h-32 bg-accent/20 backdrop-blur-md border border-accent/50 shadow-[0_0_40px_rgba(201,168,76,0.3)]"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-tr from-accent/0 to-white/40" />
          </motion.div>
          
          <motion.div 
            className="absolute w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/30"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            animate={{ rotate: [360, 270, 180, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

        </div>

        {/* Massive Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-baseline gap-2 mb-2 text-accent">
            <span className="text-8xl md:text-[10rem] font-bold font-display tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]">
              20<span className="text-6xl md:text-8xl">%</span>
            </span>
          </div>
          <span className="text-4xl md:text-6xl font-display font-medium text-white tracking-widest mb-4">
            OFF
          </span>
          <span className="text-xl md:text-2xl text-white/60 tracking-[0.2em] font-light">
            ON MEDICINES
          </span>
        </motion.div>

      </div>
    </section>
  );
}
