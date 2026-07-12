import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function RippleButton({ 
  href, 
  target, 
  className, 
  children,
  onClick
}: { 
  href?: string, 
  target?: string, 
  className?: string, 
  children: React.ReactNode,
  onClick?: (e: React.MouseEvent) => void
}) {
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

  const content = (
    <>
      {children}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/30 pointer-events-none z-[1]"
            style={{ width: 100, height: 100, left: r.x - 50, top: r.y - 50 }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        className={`relative overflow-hidden ${className || ''}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={`relative overflow-hidden ${className || ''}`}
    >
      {content}
    </button>
  );
}
