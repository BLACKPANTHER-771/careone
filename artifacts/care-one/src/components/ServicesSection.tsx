import { motion } from 'framer-motion';
import { useState } from 'react';

const pods = [
  {
    id: 1,
    title: "MEDICINES",
    color: "rgba(41,121,255", // blue
    bgGradient: "rgba(41,121,255,0.06)",
    illustration: (
      <div className="relative flex flex-col items-center justify-center h-48 w-full">
        <div className="w-[80px] h-[120px] border border-blue-500/40 rounded-sm relative flex flex-col items-center py-2 justify-between" style={{ boxShadow: 'inset 0 0 20px rgba(41,121,255,0.2)' }}>
          <div className="w-[60px] h-[1px] bg-blue-500/30" />
          <div className="w-[20px] h-[8px] bg-orange-400 rounded-sm shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
          <div className="w-[60px] h-[1px] bg-blue-500/30" />
          <div className="w-[24px] h-[12px] bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <div className="w-[60px] h-[1px] bg-blue-500/30" />
          <div className="w-[16px] h-[10px] bg-emerald-400 rounded-sm shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          {/* Vertical door line */}
          <div className="absolute right-2 top-2 bottom-2 w-[1px] bg-blue-400/50" />
        </div>
        <motion.div 
          className="absolute w-[140px] h-[40px] rounded-[50%] border border-blue-500/20"
          animate={{ rotateX: [70, 70], rotateZ: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute w-[160px] h-[50px] rounded-[50%] border border-blue-400/10"
          animate={{ rotateX: [75, 75], rotateZ: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  },
  {
    id: 2,
    title: "COSMETICS",
    color: "rgba(200,100,180", // pink
    bgGradient: "rgba(200,100,180,0.06)",
    illustration: (
      <div className="relative flex flex-col items-center justify-center h-48 w-full">
        <div className="relative flex items-end gap-2 mb-2">
          {/* Tall bottle */}
          <div className="w-4 h-16 border border-pink-400/50 rounded-t-full shadow-[0_0_10px_rgba(200,100,180,0.3)] bg-gradient-to-t from-pink-500/20 to-transparent" />
          {/* Round bottle */}
          <div className="w-10 h-10 border border-amber-400/50 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)] bg-gradient-to-t from-amber-500/20 to-transparent relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 border border-amber-400/50 rounded-sm" />
          </div>
          {/* Medium bottle */}
          <div className="w-6 h-12 border border-white/50 rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-gradient-to-t from-white/20 to-transparent" />
        </div>
        {/* Shelf */}
        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-400/80 to-transparent shadow-[0_5px_15px_rgba(200,100,180,0.6)]" />
        
        <motion.div 
          className="absolute w-[140px] h-[40px] rounded-[50%] border border-pink-500/20"
          animate={{ rotateX: [70, 70], rotateZ: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  },
  {
    id: 3,
    title: "SUPPLEMENTS",
    color: "rgba(16,185,129", // emerald
    bgGradient: "rgba(16,185,129,0.06)",
    illustration: (
      <div className="relative flex flex-col items-center justify-center h-48 w-full">
        {/* Container */}
        <div className="w-[60px] h-[80px] border border-emerald-400/50 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10 relative z-10 mb-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[64px] h-[10px] border border-emerald-400/50 rounded-t-md bg-emerald-500/20" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[20px] bg-emerald-400/20 flex items-center justify-center border-y border-emerald-400/30">
            <div className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_5px_rgba(110,231,183,0.8)]" />
          </div>
        </div>
        {/* Pedestal */}
        <div className="absolute bottom-[20%] w-[80px] h-[20px] rounded-[50%] bg-emerald-500/20 border border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
        
        <motion.div 
          className="absolute w-[150px] h-[45px] rounded-[50%] border border-emerald-500/20"
          animate={{ rotateX: [75, 75], rotateZ: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  },
  {
    id: 4,
    title: "CLINICAL CARE",
    color: "rgba(0,229,255", // cyan
    bgGradient: "rgba(0,229,255,0.06)",
    illustration: (
      <div className="relative flex flex-col items-center justify-center h-48 w-full">
        <div className="relative w-full h-full flex items-center justify-center rotate-45 z-10">
          {/* Hexagon outline */}
          <svg viewBox="0 0 100 100" className="absolute w-[120px] h-[120px] opacity-40">
            <motion.polygon 
              points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5" 
              fill="none" stroke="#00E5FF" strokeWidth="1"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Syringe */}
          <div className="w-[8px] h-[30px] border border-white/50 border-b-0 absolute top-[30%]" />
          <div className="w-[2px] h-[15px] bg-white/50 absolute top-[20%]" />
          <div className="w-[16px] h-[40px] border border-cyan-400/60 rounded-sm bg-cyan-500/10 shadow-[0_0_15px_rgba(0,229,255,0.4)] absolute" />
          <div className="w-[4px] h-[15px] bg-cyan-400 absolute bottom-[30%] shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
          <div className="w-[1px] h-[15px] bg-white/70 absolute bottom-[15%]" />
        </div>
        
        <motion.div 
          className="absolute w-[140px] h-[40px] rounded-[50%] border border-cyan-400/20"
          animate={{ rotateX: [70, 70], rotateZ: 360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }
];

export default function ServicesSection() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <section className="py-24 w-full relative">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4"
          >
            The Pod Bay
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 tracking-widest font-light uppercase"
          >
            Tap a pod to explore
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pods.map((pod, i) => (
            <motion.div
              key={pod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group cursor-pointer w-full"
              style={{ perspective: '1200px' }}
              onClick={() => setFlipped(prev => ({ ...prev, [pod.id]: !prev[pod.id] }))}
            >
              <motion.div
                animate={{ 
                  rotateY: flipped[pod.id] ? 180 : 0,
                  y: [0, -8, 0]
                }}
                transition={{ 
                  rotateY: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
                  y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-[420px] md:h-[380px]"
              >
                
                {/* FRONT FACE */}
                <div 
                  style={{ backfaceVisibility: 'hidden' }} 
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
                  {/* Glowing gradient top */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1/2" 
                    style={{ background: `linear-gradient(to bottom, ${pod.color},0.2), transparent)` }} 
                  />
                  <div className="absolute inset-0" style={{ background: pod.bgGradient }} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col p-8">
                    <div className="flex-1 flex items-center justify-center">
                      {pod.illustration}
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <h3 className="text-2xl font-display font-bold text-white tracking-widest">{pod.title}</h3>
                      <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase text-right w-24 leading-tight">
                        Turn for<br/>more info
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div 
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} 
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0f25] shadow-2xl flex flex-col p-8"
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ background: `linear-gradient(90deg, transparent, ${pod.color},1), transparent)` }}
                  />
                  
                  <h3 className="text-2xl font-display font-bold text-white tracking-widest mb-8">{pod.title}</h3>
                  
                  <div className="flex-1 space-y-4">
                    <p className="flex items-center gap-3 text-white/70 font-light">
                      <span style={{ color: `${pod.color},1)` }}>✦</span> Available in store
                    </p>
                    <p className="flex items-center gap-3 text-white/70 font-light">
                      <span style={{ color: `${pod.color},1)` }}>✦</span> Premium Quality
                    </p>
                    <p className="flex items-center gap-3 text-white/70 font-light">
                      <span style={{ color: `${pod.color},1)` }}>✦</span> Trusted Products
                    </p>
                    <p className="flex items-center gap-3 text-white/70 font-light">
                      <span style={{ color: `${pod.color},1)` }}>✦</span> 20% OFF Daily
                    </p>
                  </div>

                  <p className="text-xs text-center text-white/30 tracking-widest mt-auto">
                    TAP TO FLIP BACK
                  </p>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
