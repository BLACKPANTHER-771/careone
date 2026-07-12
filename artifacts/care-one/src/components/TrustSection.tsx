import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const tiles = [
  {
    icon: (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(200,160,60,0.5)]">
          20%
        </span>
        <span className="text-xl font-bold text-white/90">OFF</span>
      </div>
    ),
    label: "On All Medicines"
  },
  {
    icon: (
      <svg className="w-12 h-12 overflow-visible" viewBox="0 0 24 24">
        <motion.path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="none" stroke="#FF6B6B" strokeWidth="1.5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 8px rgba(255,107,107,0.6))" }}
        />
      </svg>
    ),
    label: "FREE BP Check · Sundays · Worth ₹20"
  },
  {
    icon: (
      <svg className="w-12 h-12 overflow-visible" viewBox="0 0 24 24">
        <motion.path 
          d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
          fill="none" stroke="#00E5FF" strokeWidth="1.5"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.6))" }}
        />
      </svg>
    ),
    label: "FREE Sugar Check · Sundays · Worth ₹30"
  },
  {
    icon: (
      <div className="relative w-12 h-12">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(255,255,255,0.8)" }}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <motion.div
          className="absolute left-1/2 bottom-0 w-1 rounded-full bg-cyan-400"
          style={{ transform: "translateX(-50%)", filter: "drop-shadow(0 0 5px rgba(0,229,255,0.8))" }}
          animate={{ height: [0, 20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    ),
    label: "FREE Home Delivery"
  },
  {
    icon: (
      <svg className="w-12 h-12 overflow-visible" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#FFD700" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 8px rgba(255,215,0,0.5))" }}/>
        <motion.path 
          d="M12 6v6l4 2" 
          fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "12px 12px" }}
        />
      </svg>
    ),
    label: "Open Daily · 8 AM – 11 PM"
  }
];

export default function TrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // init
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  return (
    <section className="py-24 w-full relative">
      <div className="max-w-7xl mx-auto md:px-8 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-light tracking-[0.2em] text-white/50 mb-12 uppercase"
        >
          Why CARE ONE?
        </motion.h2>
        
        {/* Mobile Horizontal Carousel */}
        <div 
          ref={scrollRef}
          className="md:hidden flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 gap-4 px-[7.5vw]"
        >
          {tiles.map((tile, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[85vw] max-w-[300px] h-[220px]"
            >
              <div
                className={`w-full h-full rounded-3xl p-6 flex flex-col items-center text-center justify-center transition-all duration-500`}
                style={{
                  background: 'linear-gradient(135deg, rgba(41,121,255,0.08), rgba(0,229,255,0.04))',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: activeIndex === i 
                    ? '0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(41,121,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 0 0 1px rgba(41,121,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                  transform: activeIndex === i ? 'scale(1)' : 'scale(0.95)',
                  opacity: activeIndex === i ? 1 : 0.6
                }}
              >
                <div className="h-[60px] flex items-center justify-center mb-6">
                  {tile.icon}
                </div>
                <p className="text-lg font-medium text-white/90">
                  {tile.label.split('·')[0]}
                </p>
                {tile.label.includes('·') && (
                  <p className="text-sm text-white/50 mt-2">
                    {tile.label.split('·').slice(1).join('·')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators (Mobile) */}
        <div className="md:hidden flex justify-center gap-2 pb-4">
          {tiles.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-cyan-400 w-6 shadow-[0_0_8px_rgba(0,229,255,0.5)]' : 'bg-white/20 w-2'}`}
            />
          ))}
        </div>

        {/* Desktop Grid (md+) */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 lg:gap-8 px-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-3xl p-6 flex flex-col items-center text-center justify-center w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-h-[220px]"
              style={{
                background: 'linear-gradient(135deg, rgba(41,121,255,0.08), rgba(0,229,255,0.04))',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(41,121,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="h-[60px] flex items-center justify-center mb-6">
                {tile.icon}
              </div>
              <p className="text-xl font-medium text-white/90">
                {tile.label.split('·')[0]}
              </p>
              {tile.label.includes('·') && (
                <p className="text-sm text-white/50 mt-2">
                  {tile.label.split('·').slice(1).join('·')}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
