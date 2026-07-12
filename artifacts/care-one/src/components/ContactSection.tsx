import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-32 w-full relative z-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="w-32 h-32 rounded-full border border-cyan-400/30"
              animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute w-32 h-32 rounded-full border border-cyan-400/20"
              animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0, 0] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
            />
          </div>

          <div className="w-24 h-24 bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-md border border-cyan-400/50 shadow-[0_0_30px_rgba(0,229,255,0.3)] relative z-10">
            <Phone className="w-10 h-10 text-cyan-400 fill-cyan-400/20" />
          </div>
        </motion.div>

        <motion.a
          href="tel:8826775758"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block hover:scale-[1.02] transition-transform cursor-pointer"
        >
          <h2 className="text-6xl md:text-[7rem] font-display font-bold text-white tracking-tighter mb-8 drop-shadow-lg">
            88267 75758
          </h2>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="tel:8826775758"
            className="inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-full font-bold text-xl tracking-widest hover:bg-cyan-400 transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]"
          >
            CALL NOW
          </a>
        </motion.div>

      </div>
    </section>
  );
}
