import { motion } from 'framer-motion';
import { useScrollParallax } from '../hooks/useScrollParallax';

export default function HealthCheckSection() {
  const { ref, y } = useScrollParallax(0.1);

  return (
    <section ref={ref} className="py-24 w-full relative">
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-white/40 tracking-[0.3em] uppercase mb-16"
      >
        Diagnostic Scanners
      </motion.p>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          
          {/* Scanner Pod 1: BP / Heartbeat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(41,121,255,0.15)' }}
          >
            <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Blood Pressure</p>
            
            <div className="relative w-full h-32 flex items-center justify-center mb-8">
              {/* SVG ECG Waveform */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-[80%] h-full opacity-80">
                <defs>
                  <linearGradient id="glowCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {/* Glow below path */}
                <polygon points="0,100 0,50 30,50 40,20 50,80 60,10 70,50 100,50 100,100" fill="url(#glowCyan)" />
                {/* The ECG line */}
                <path d="M 0,50 L 30,50 L 40,20 L 50,80 L 60,10 L 70,50 L 100,50" fill="none" stroke="#00E5FF" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* Traveling Scan Line */}
              <motion.div 
                className="absolute top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                animate={{ left: ['10%', '90%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
              <motion.svg viewBox="0 0 24 24" className="w-12 h-12" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#00E5FF" style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.6))' }} />
              </motion.svg>
              
              <div className="text-center">
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-1 tracking-widest">FREE CHECK</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-white/50">Every Sunday</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/30">Worth ₹20</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scanner Pod 2: Glucose */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(41,121,255,0.15)' }}
          >
            <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Blood Glucose</p>
            
            <div className="relative w-full h-32 flex items-center justify-center mb-8">
              {/* Circular Gauge */}
              <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" strokeDasharray="188 251" strokeLinecap="round" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="none" stroke="#00E5FF" strokeWidth="6" 
                  strokeLinecap="round"
                  animate={{ strokeDasharray: ['113 251', '140 251', '113 251'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: 'drop-shadow(0 0 5px rgba(0,229,255,0.5))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-mono text-cyan-400 font-bold">--</span>
                <span className="text-[8px] text-cyan-400/60 uppercase tracking-widest">mg/dL</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
              {/* Wave pattern — uses stroke-dashoffset shimmer instead of path morphing */}
              <svg viewBox="0 0 100 20" className="w-24 h-6" overflow="visible">
                <path 
                  d="M 0,10 Q 16.6,-10 33.3,10 T 66.6,10 T 100,10" 
                  fill="none" stroke="#10B981" strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(16,185,129,0.5))' }}
                />
                <motion.path 
                  d="M 0,10 Q 16.6,-10 33.3,10 T 66.6,10 T 100,10" 
                  fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"
                  strokeDasharray="30 200"
                  animate={{ strokeDashoffset: [0, -230] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              
              <div className="text-center">
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-1 tracking-widest">FREE CHECK</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-white/50">Every Sunday</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/30">Worth ₹30</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
