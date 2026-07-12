import { motion } from 'framer-motion';
import { Map, Phone } from 'lucide-react';
import { useState } from 'react';
import RippleButton from './RippleButton';

export default function LocationSection() {
  const [mapLoaded, setMapLoaded] = useState(false);
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
              
              {/* Google Maps Embed */}
              <div className="w-full h-[240px] mb-8 relative rounded-2xl overflow-hidden border border-white/10"
                style={{ background: '#0d1b2a', boxShadow: '0 0 0 1px rgba(41,121,255,0.2), 0 8px 32px rgba(0,0,0,0.5)' }}>
                {/* Loading placeholder — hides the white/blue flash while iframe loads */}
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10"
                    style={{ background: '#0d1b2a' }}>
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className="w-8 h-8 rounded-full border-2 border-cyan-400/40 border-t-cyan-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="text-[10px] text-cyan-400/50 tracking-widest uppercase font-mono">Locating</span>
                    </div>
                  </div>
                )}
                <iframe
                  title="CARE ONE Pharmacy Location"
                  src="https://maps.google.com/maps?q=Paramount+GolfMart+Surajpur+Greater+Noida+Uttar+Pradesh&output=embed&hl=en&z=16"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    outline: 'none',
                    display: 'block',
                    opacity: mapLoaded ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                    filter: 'saturate(1.6) contrast(1.05) brightness(1.05) hue-rotate(5deg)',
                    pointerEvents: mapLoaded ? 'auto' : 'none',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                />
                {/* Holographic overlay frame */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(5,8,22,0.15) 0%, transparent 20%, transparent 80%, rgba(5,8,22,0.3) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                />
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 rounded-tl pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60 rounded-tr pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 rounded-bl pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60 rounded-br pointer-events-none" />
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
