import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
  top: `${10 + (i * 17) % 80}%`,
  left: `${5 + (i * 23) % 90}%`,
  duration: 4 + (i % 6),
  delay: i % 3,
}));

const RINGS = [
  { w: '60vw', h: '60vw', top: '10%', left: '-10%', delay: 0 },
  { w: '80vw', h: '80vw', top: '40%', left: '30%', delay: 2 },
  { w: '50vw', h: '50vw', top: '70%', left: '-5%', delay: 4 },
  { w: '70vw', h: '70vw', top: '-10%', left: '60%', delay: 1 },
  { w: '40vw', h: '40vw', top: '80%', left: '80%', delay: 3 },
];

const GOLDEN_RAYS = [
  { left: '20%', delay: 0 },
  { left: '50%', delay: 2 },
  { left: '75%', delay: 4 },
];

export default function DomeEnvironment() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050816]">
      
      {/* Curved walls */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 0,0 Q 20,50 0,100" stroke="rgba(41,121,255,0.06)" strokeWidth="0.2" fill="none" />
        <path d="M 100,0 Q 80,50 100,100" stroke="rgba(41,121,255,0.06)" strokeWidth="0.2" fill="none" />
      </svg>

      {/* Rotating DNA Ribbon */}
      <motion.div 
        className="absolute top-0 bottom-0 w-32 right-[5%]"
        animate={{ rotateY: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 100 1000" className="w-full h-full opacity-60">
          <path d="M 50,0 Q 100,125 50,250 T 50,500 T 50,750 T 50,1000" stroke="rgba(41,121,255,0.12)" strokeWidth="2" fill="none" />
          <path d="M 50,0 Q 0,125 50,250 T 50,500 T 50,750 T 50,1000" stroke="rgba(41,121,255,0.12)" strokeWidth="2" fill="none" />
          {[...Array(8)].map((_, i) => (
            <line key={`rung-${i}`} x1="20" y1={125 * i + 62.5} x2="80" y2={125 * i + 62.5} stroke="rgba(100,200,255,0.08)" strokeWidth="1.5" />
          ))}
        </svg>
      </motion.div>

      {/* Volumetric light cone */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[60vw] h-[80vh]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(41,121,255,0.08) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating energy rings */}
      {RINGS.map((ring, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-[rgba(41,121,255,0.07)]"
          style={{ width: ring.w, height: ring.h, top: ring.top, left: ring.left }}
          animate={{
            scale: [1, 1.03, 1],
            y: [0, -20, 0]
          }}
          transition={{
            scale: { duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: ring.delay },
            y: { duration: 8 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: ring.delay }
          }}
        />
      ))}

      {/* Grid floor plane */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[40vh] transform-gpu origin-bottom opacity-50"
        style={{
          perspective: '600px',
          transform: 'rotateX(75deg)'
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(41,121,255,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(41,121,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Drifting particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`part-${i}`}
          className="absolute w-[1.5px] h-[1.5px] rounded-full bg-white/10"
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.05, 0.3, 0.05]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}

      {/* Golden light rays */}
      {GOLDEN_RAYS.map((ray, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-[-20%] w-[1px] h-[200vh] origin-top"
          style={{
            left: ray.left,
            transform: 'rotate(-30deg)',
            background: 'linear-gradient(to bottom, transparent, rgba(200,160,60,0.06), transparent)'
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: ray.delay }}
        />
      ))}

    </div>
  );
}
