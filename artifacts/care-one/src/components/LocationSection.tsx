import { motion } from 'framer-motion';
import { Map, Phone } from 'lucide-react';
import RippleButton from './RippleButton';

export default function LocationSection() {
  return (
    <section className="py-24 w-full relative">
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-white/40 tracking-[0.3em] uppercase mb-16"
      >
        Find Us
      </motion.p>

      <div className="max-w-4xl mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl relative overflow-hidden flex flex-col bg-black/40"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          {/* Top Bar */}
          <div className="px-6 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-cyan-400/60 uppercase font-mono">CARE ONE NAVIGATION SYSTEM</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>
          
          {/* Holographic scanning beam */}
          <motion.div 
            className="absolute top-[41px] bottom-0 w-[10px] bg-cyan-400/10 z-20 pointer-events-none blur-sm"
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />

          <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
            
            {/* Nav Terminal Content */}
            <div className="flex-1 w-full relative">
              
              {/* Map SVG */}
              <div className="w-full h-[180px] mb-8 relative border border-white/5 rounded-lg overflow-hidden bg-white/5">
                <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="w-full h-full opacity-60">
                  {/* Grid Lines */}
                  <path d="M50,0 V200 M100,0 V200 M150,0 V200 M200,0 V200 M250,0 V200" stroke="rgba(41,121,255,0.2)" strokeWidth="1" />
                  <path d="M0,50 H300 M0,100 H300 M0,150 H300" stroke="rgba(41,121,255,0.2)" strokeWidth="1" />
                  
                  {/* Street geometry */}
                  <path d="M-20,120 L80,120 L130,80 L220,80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Glowing Route path */}
                  <motion.path 
                    d="M-20,120 L80,120 L130,80 L220,80" 
                    fill="none" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="400"
                    initial={{ strokeDashoffset: 400 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    style={{ filter: 'drop-shadow(0 0 5px rgba(0,229,255,0.8))' }}
                  />
                  
                  {/* Destination Marker */}
                  <motion.circle 
                    cx="220" cy="80" r="4" fill="#FFD700"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 2.3 }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,1))' }}
                  />
                  <motion.circle
                    cx="220" cy="80" r="12" fill="none" stroke="#FFD700" strokeWidth="1"
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
                  />
                </svg>
              </div>

              {/* Monospaced Address */}
              <div className="font-mono text-sm text-white/70 leading-relaxed uppercase tracking-wider space-y-1">
                <p><span className="text-cyan-400">LOC:</span> SHOP NO. PL-012</p>
                <p><span className="opacity-0">LOC: </span>BGH-A, SITE-C</p>
                <p><span className="opacity-0">LOC: </span>PARAMOUNT GOLFMART</p>
                <p><span className="opacity-0">LOC: </span>BELOW ICICI BANK</p>
                <p><span className="opacity-0">LOC: </span>SURAJPUR, GREATER NOIDA</p>
                <p><span className="opacity-0">LOC: </span>UP 201306</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full md:w-auto shrink-0 pt-4">
              <RippleButton 
                href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
                target="_blank"
                className="group flex items-center justify-center gap-3 bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400/20 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              >
                <Map className="w-5 h-5 text-cyan-400 relative z-10" />
                <span className="relative z-10 text-sm tracking-widest uppercase">Open in Maps</span>
              </RippleButton>

              <RippleButton 
                href="tel:8826775758"
                className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all"
              >
                <Phone className="w-5 h-5 text-white/70 relative z-10" />
                <span className="relative z-10 text-sm tracking-widest uppercase text-white/70">Call Store</span>
              </RippleButton>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
