import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full pb-12 pt-24 z-10 flex flex-col items-center overflow-hidden">
      
      {/* Background gradient fade in */}
      <div className="absolute bottom-0 w-[100vw] h-64 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center z-10"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-white/90 mb-4">
          CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ONE</span>
        </h2>
        
        <p className="text-lg text-white/50 tracking-widest font-light mb-16">
          Trusted Care. One Destination.
        </p>

        <p className="text-xs text-white/20 tracking-[0.3em] font-light uppercase">
          Everything ends where it began.
        </p>
      </motion.div>

    </footer>
  );
}
