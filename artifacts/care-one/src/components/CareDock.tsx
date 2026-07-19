import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// WhatsApp icon using simple path
const WhatsAppIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.675-2.066-.187-.305-.076-.472.131-.625.205-.156.511-.41.766-.615.255-.207.34-.344.511-.564.17-.22.085-.413-.042-.578-.127-.165-.1-.304-.219-.468-.118-.164-.635-1.582-.87-2.126-.228-.534-.457-.51-.766-.52-.198-.009-.426-.009-.654-.009-.228 0-.6.086-.914.431-.315.344-1.2 1.175-1.2 2.593 0 1.417.923 3.007 1.05 3.235.127.226 1.789 2.947 4.457 4.008 2.668 1.06 2.668.707 3.15.663.483-.044 1.559-.636 1.778-1.251.22-.614.22-1.142.154-1.251-.065-.109-.198-.172-.426-.301z" />
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
      className="hidden sm:flex fixed bottom-0 left-0 right-0 z-50 justify-center w-full pb-[calc(env(safe-area-inset-bottom,16px)+12px)] pointer-events-none"
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
          href="tel:8826775158"
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
          href="https://wa.me/918826775158?text=Hello%20CARE%20ONE%2C%20I%20would%20like%20to%20enquire%20about%20medicines."
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
