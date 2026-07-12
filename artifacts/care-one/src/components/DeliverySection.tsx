import { motion } from 'framer-motion';

export default function DeliverySection() {
  return (
    <section className="py-24 w-full relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center">
        
        {/* The Energy Beam Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-64 overflow-hidden rounded-3xl border border-white/5 bg-black/20 mb-12 shadow-[0_0_40px_rgba(41,121,255,0.1)] flex items-center justify-center"
        >
          {/* Perspective City Grid */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div 
              className="w-[200%] h-[200%] transform-gpu"
              style={{
                perspective: '400px',
                transform: 'rotateX(30deg) translateY(-20%)',
                backgroundImage: `
                  linear-gradient(rgba(41,121,255,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(41,121,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: 'center center'
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-2xl px-8 md:px-16 flex items-center justify-between h-full">
            
            {/* The Beam Line SVG */}
            <svg className="absolute left-[80px] right-[80px] top-1/2 -translate-y-1/2 h-4 w-[calc(100%-160px)] md:left-[120px] md:right-[120px] md:w-[calc(100%-240px)] z-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2979FF" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <motion.line 
                x1="0" y1="2" x2="100%" y2="2" 
                stroke="url(#beamGrad)" strokeWidth="2" filter="url(#glow)"
                strokeDasharray="100% 100%"
                animate={{ strokeDashoffset: ['100%', '0%'] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              />
            </svg>

            {/* Traveling Light Dot */}
            <div className="absolute left-[80px] right-[80px] md:left-[120px] md:right-[120px] top-1/2 -translate-y-1/2 z-10 pointer-events-none overflow-visible">
              <motion.div
                className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_5px_rgba(0,229,255,0.8)] absolute top-1/2 -translate-y-1/2"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              />
            </div>

            {/* Pharmacy Icon */}
            <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-blue-900/40 backdrop-blur-md rounded-2xl border border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(41,121,255,0.4)] shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(41,121,255,0.8))' }}>
                <path d="M3 21h18"></path>
                <path d="M5 21V7l7-4 7 4v14"></path>
                <path d="M9 14h6"></path>
                <path d="M12 11v6"></path>
              </svg>
            </div>

            {/* House Icon */}
            <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-cyan-900/40 backdrop-blur-md rounded-2xl border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(0,229,255,0.8))' }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
            FREE HOME DELIVERY
          </h2>
          <p className="text-lg md:text-xl text-white/50 tracking-wide font-light">
            Medicine delivered to your door
          </p>
        </motion.div>

      </div>
    </section>
  );
}
