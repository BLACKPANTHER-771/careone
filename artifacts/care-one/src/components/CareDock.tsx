import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// WhatsApp icon using simple path
const WhatsAppIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .104 5.383.101 11.936c0 2.098.546 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.947-5.383 11.949-11.936a11.822 11.822 0 0 0-3.535-8.455"/>
  </svg>
)

export default function CareDock() {
  const { scrollY } = useScroll();
  const [dockState, setDockState] = useState<'normal' | 'scrolling_up'>('normal');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const [shimmer, setShimmer] = useState(false);
  const [iconGlow, setIconGlow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current + 5) {
      // scrolling down
      setDockState('normal');
      resetTimeout();
    } else if (latest < lastScrollY.current - 5) {
      // scrolling up
      setDockState('scrolling_up');
      resetTimeout();
    }
    lastScrollY.current = latest;
  });

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDockState('normal');
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(true);
      setIconGlow(true);
      setTimeout(() => setIconGlow(false), 1000);
      setTimeout(() => setShimmer(false), 2000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full pb-[calc(env(safe-area-inset-bottom,16px)+12px)] pointer-events-none"
    >
      <motion.div
        animate={{ 
          scale: dockState === 'scrolling_up' ? 0.95 : 1,
          opacity: dockState === 'scrolling_up' ? 0.85 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="pointer-events-auto w-[92%] h-[68px] rounded-[36px] flex items-center justify-between px-2 overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]"
        style={{
          background: 'rgba(8, 12, 35, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(41,121,255,0.08)'
        }}
      >
        {/* Shimmer effect */}
        <AnimatePresence>
          {shimmer && (
            <motion.div 
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent skew-x-12"
            />
          )}
        </AnimatePresence>

        {/* Button 1 - Call */}
        <DockButton 
          href="tel:8826775758"
          icon={<Phone className="w-7 h-7" style={{ color: '#00C880', filter: iconGlow ? 'drop-shadow(0 0 8px rgba(0,200,128,0.8))' : 'none', transition: 'filter 0.3s' }} />}
          label="CALL NOW"
        />

        <div className="w-[1px] h-8 bg-white/10 shrink-0" />

        {/* Button 2 - Directions */}
        <DockButton 
          href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
          icon={<MapPin className="w-7 h-7" style={{ color: '#FF8C00' }} />}
          label="DIRECTIONS"
          target="_blank"
        />

        <div className="w-[1px] h-8 bg-white/10 shrink-0" />

        {/* Button 3 - WhatsApp */}
        <DockButton 
          href="https://wa.me/918826775758?text=Hello%20CARE%20ONE%2C%20I%20would%20like%20to%20enquire%20about%20medicines."
          icon={<WhatsAppIcon className="w-7 h-7" style={{ color: '#25D366' }} />}
          label="WHATSAPP"
          target="_blank"
        />
      </motion.div>
    </motion.div>
  );
}

function DockButton({ href, icon, label, target }: { href: string, icon: React.ReactNode, label: string, target?: string }) {
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  return (
    <motion.a 
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onPointerDown={handlePointerDown}
      className="relative flex-1 h-full flex flex-col items-center justify-center gap-1 overflow-hidden"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="z-10">{icon}</div>
      <span className="text-[10px] font-medium text-white/70 tracking-wider z-10">{label}</span>
      
      {/* Ripple overlay */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{ width: 40, height: 40, left: r.x - 20, top: r.y - 20 }}
          />
        ))}
      </AnimatePresence>
    </motion.a>
  );
}
