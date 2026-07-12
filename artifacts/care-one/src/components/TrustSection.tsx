import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const tiles = [
  {
    title: "20% OFF Medicines",
    accent: "shadow-blue-500/20 border-blue-500/30",
    iconColor: "text-blue-500",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  },
  {
    title: "FREE Sunday BP Check",
    subtitle: "Worth ₹20",
    accent: "shadow-emerald-500/20 border-emerald-500/30",
    iconColor: "text-emerald-500",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    )
  },
  {
    title: "FREE Sunday Sugar Check",
    subtitle: "Worth ₹30",
    accent: "shadow-cyan-500/20 border-cyan-500/30",
    iconColor: "text-cyan-500",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-2.485 0-4.5 2.985-4.5 6.75s2.015 6.75 4.5 6.75 4.5-2.985 4.5-6.75-2.015-6.75-4.5-6.75ZM12 18a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a4.5 4.5 0 0 0 3-8" />
      </svg>
    )
  },
  {
    title: "FREE Home Delivery",
    accent: "shadow-yellow-500/20 border-yellow-500/30",
    iconColor: "text-yellow-500",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    )
  },
  {
    title: "Open Daily",
    subtitle: "8 AM – 11 PM",
    accent: "shadow-white/10 border-white/20",
    iconColor: "text-white",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )
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
    <section className="py-20 w-full relative z-10">
      <div className="max-w-7xl mx-auto md:px-8">
        
        {/* Mobile Horizontal Carousel */}
        <div 
          ref={scrollRef}
          className="md:hidden flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 gap-4 px-[7.5vw]"
        >
          {tiles.map((tile, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[85vw] max-w-[320px]"
            >
              <div
                className={`glass-panel p-8 rounded-3xl flex flex-col items-center text-center h-full min-h-[240px] justify-center transition-all duration-300 ${tile.accent} ${activeIndex === i ? 'shadow-[0_8px_32px_rgba(0,0,0,0.4)] scale-100 opacity-100' : 'opacity-60 scale-95'}`}
              >
                <div className={`mb-6 p-4 rounded-2xl bg-white/5 ${tile.iconColor}`}>
                  {tile.icon}
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-2 leading-tight">
                  {tile.title}
                </h3>
                {tile.subtitle && (
                  <p className="text-lg text-white/60 font-medium">
                    {tile.subtitle}
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
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-primary w-6' : 'bg-white/20 w-2'}`}
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
              className={`glass-panel p-8 rounded-3xl flex flex-col items-center text-center w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-h-[240px] justify-center transition-all duration-300 ${tile.accent}`}
            >
              <div className={`mb-6 p-4 rounded-2xl bg-white/5 ${tile.iconColor}`}>
                {tile.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-2 leading-tight">
                {tile.title}
              </h3>
              {tile.subtitle && (
                <p className="text-lg text-white/60 font-medium">
                  {tile.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
