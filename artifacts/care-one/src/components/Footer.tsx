import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full pb-16 pt-8 z-10 flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center z-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-2">
          CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ONE</span>
        </h2>
        
        <p className="text-sm text-white/50 tracking-widest font-light mb-8 uppercase">
          Your Health. Our Mission.
        </p>

        {/* Pulse reconnecting line */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent relative mb-8">
          <motion.div 
            className="absolute top-0 bottom-0 w-4 bg-cyan-400 blur-[2px]"
            animate={{ left: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        <p className="text-[10px] text-white/20 tracking-wider font-light uppercase">
          © 2025 CARE ONE Pharmacy. Paramount GolfMart, Greater Noida.
        </p>
      </motion.div>

    </footer>
  );
}
