import { motion } from 'framer-motion';

export default function HealthCheckSection() {
  return (
    <section className="py-24 w-full relative z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Sunday Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50"
          >
            Complimentary health monitoring every weekend.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* BP Check Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-32 h-32 relative shrink-0">
                {/* Abstract Heart Shape SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,107,107,0.5)]">
                  <defs>
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="100%" stopColor="#C92A2A" />
                    </linearGradient>
                  </defs>
                  <motion.path 
                    d="M50 85C50 85 15 60 15 35C15 20 28 10 40 10C46 10 50 15 50 15C50 15 54 10 60 10C72 10 85 20 85 35C85 60 50 85 50 85Z" 
                    fill="url(#heartGrad)"
                    animate={{ scale: [1, 1.05, 1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.45, 1] }}
                  />
                  {/* Subtle grid lines for anatomical/technical feel */}
                  <path d="M10 50 H90 M50 10 V90" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
                </svg>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">FREE BP CHECK</h3>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-xl text-accent font-medium tracking-wide">Worth ₹20</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-lg text-white/60">Every Sunday</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                  Keep your heart health in check. Our staff provides accurate blood pressure readings in minutes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sugar Check Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-32 h-32 relative shrink-0">
                {/* Abstract Blood/Sugar Drop Shape SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                  <defs>
                    <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#0077FF" />
                    </linearGradient>
                  </defs>
                  <motion.path 
                    d="M50 10 C50 10 20 45 20 65 C20 81.568 33.431 95 50 95 C66.568 95 80 81.568 80 65 C80 45 50 10 50 10 Z" 
                    fill="url(#dropGrad)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Inner highlight */}
                  <path d="M35 65 A15 15 0 0 1 50 50" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
                </svg>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">FREE SUGAR CHECK</h3>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-xl text-accent font-medium tracking-wide">Worth ₹30</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-lg text-white/60">Every Sunday</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                  Stay on top of your glucose levels with our quick and safe complimentary testing.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
