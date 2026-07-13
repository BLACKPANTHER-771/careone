/**
 * DomeEnvironment — fixed deep-space base layer (z-0).
 * Always covers the viewport regardless of scroll position.
 * Provides the eternal sky: nebula orbs, edge glows, slow vol. cone.
 */
import { motion } from 'framer-motion';

// Pre-computed — no Math.random() in render
const NEBULA_ORBS = [
  { cx: '18%',  cy: '22%', rx: '55vw', ry: '45vh', color: 'rgba(41,121,255,0.11)',  dur: 22, delay: 0  },
  { cx: '75%',  cy: '60%', rx: '60vw', ry: '50vh', color: 'rgba(100,60,220,0.07)',  dur: 28, delay: 7  },
  { cx: '40%',  cy: '80%', rx: '50vw', ry: '40vh', color: 'rgba(0,200,220,0.06)',   dur: 19, delay: 4  },
  { cx: '-10%', cy: '45%', rx: '45vw', ry: '35vh', color: 'rgba(41,121,255,0.06)',  dur: 33, delay: 12 },
  { cx: '90%',  cy: '15%', rx: '40vw', ry: '30vh', color: 'rgba(60,180,255,0.05)',  dur: 25, delay: 9  },
];

const STARS = Array.from({ length: 55 }, (_, i) => ({
  top:  `${2  + (i * 19) % 96}%`,
  left: `${1  + (i * 37) % 98}%`,
  size: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
  dur:  3 + (i % 6),
  del:  (i % 8) * 0.6,
  op:   0.08 + (i % 5) * 0.05,
}));

export default function DomeEnvironment() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#050816' }}>

      {/* ── Nebula orbs: slow drifting radial gradients ─────────────── */}
      {NEBULA_ORBS.map((o, i) => (
        <motion.div
          key={`neb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: o.cx, top: o.cy,
            width: o.rx, height: o.ry,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(ellipse, ${o.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* ── Star field ──────────────────────────────────────────────── */}
      {STARS.map((s, i) => (
        <motion.div
          key={`st-${i}`}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.op }}
          animate={{ opacity: [s.op, s.op * 3.5, s.op] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.del }}
        />
      ))}

      {/* ── Central volumetric light cone ───────────────────────────── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
        style={{
          width: '70vw', height: '90vh',
          background: 'radial-gradient(ellipse at top, rgba(41,121,255,0.09) 0%, rgba(41,121,255,0.03) 40%, transparent 75%)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scaleX: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Edge glow strips ────────────────────────────────────────── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(41,121,255,0.45) 30%, rgba(0,229,255,0.65) 50%, rgba(41,121,255,0.45) 70%, transparent)' }}
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[2px]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(41,121,255,0.45) 30%, rgba(0,229,255,0.65) 50%, rgba(41,121,255,0.45) 70%, transparent)' }}
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />

      {/* ── Bottom floor fog ────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.7) 0%, transparent 100%)' }}
      />

    </div>
  );
}
