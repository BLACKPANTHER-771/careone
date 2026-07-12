import { motion } from 'framer-motion';

export default function DeliverySection() {
  return (
    <section className="py-32 w-full relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            FREE HOME DELIVERY
          </h2>
          <p className="text-2xl text-white/60 font-light tracking-wide">
            Your medicines, delivered with care.
          </p>
        </motion.div>

        {/* Visual Metaphor: Light traveling from Pharmacy to House */}
        <div className="w-full max-w-4xl relative h-32 flex items-center justify-between">
          
          {/* Track line */}
          <div className="absolute left-16 right-16 h-[2px] bg-white/10 top-1/2 -translate-y-1/2" />
          
          {/* Animated Light Pulse */}
          <motion.div 
            className="absolute left-16 right-16 h-[2px] top-1/2 -translate-y-1/2 origin-left bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
              x: ["0%", "50%", "100%"]
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Left Node: Pharmacy */}
          <div className="relative z-10 w-24 h-24 rounded-2xl glass-panel flex items-center justify-center bg-white/5 border-primary/30 shrink-0 shadow-[0_0_30px_rgba(41,121,255,0.2)]">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-primary">
              <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Right Node: House */}
          <div className="relative z-10 w-24 h-24 rounded-2xl glass-panel flex items-center justify-center bg-white/5 border-cyan-400/30 shrink-0 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-cyan-400">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
        </div>

      </div>
    </section>
  );
}
