/**
 * IntroAnimation — cinematic 3-second particle-assembly opening.
 * Session key: care_one_intro_v2 (bumped to reset stale keys).
 *
 * Phase timeline
 *  0      Dark void
 *  1 0.3s Single blue origin particle pulses
 *  2 0.7s 64 particles explode outward — energy field
 *  3 1.2s "C" crystallises (particles converge, letter blurs in)
 *  4 1.45s "A" crystallises
 *  5 1.70s "R" crystallises
 *  6 1.95s "E" crystallises → full CARE
 *  7 2.25s "ONE" assembles in gold-cyan
 *  8 2.65s Golden shockwave detonates across entire screen
 *  —  3.4s fade-out → onComplete
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ─── Pre-computed particle data (NO Math.random inside render) ────────────────

const FIELD = Array.from({ length: 64 }, (_, i) => {
  const a = (i / 64) * Math.PI * 2;
  const r = 80 + (i * 29) % 130;
  return {
    id:    i,
    tx:    Math.cos(a) * r,
    ty:    Math.sin(a) * r,
    color: i % 7 === 0 ? '#FFD700' : i % 3 === 0 ? '#00E5FF' : '#4A9EFF',
    size:  i % 5 === 0 ? 3 : 2,
    delay: (i % 10) * 0.022,
    pdel:  (i % 6) * 0.18,
  };
});

// Letter horizontal centres (px from text-group centre, ~86px font)
const LETTERS = [
  { ch: 'C', x: -252, phase: 3, gold: false },
  { ch: 'A', x: -175, phase: 4, gold: false },
  { ch: 'R', x:  -96, phase: 5, gold: false },
  { ch: 'E', x:  -17, phase: 6, gold: false },
  { ch: 'O', x:   72, phase: 7, gold: true  },
  { ch: 'N', x:  154, phase: 7, gold: true  },
  { ch: 'E', x:  232, phase: 7, gold: true  },
];

// 8 gathering dots per letter, scattered around that letter's centre
const GATHERERS = LETTERS.flatMap(({ ch, x, phase, gold }) =>
  Array.from({ length: 8 }, (_, j) => {
    const a = (j / 8) * Math.PI * 2 + j * 0.5;
    const d = 70 + (j * 37) % 90;
    return {
      key:   `${ch}-${x}-${j}`,
      cx:    x,
      sx:    Math.cos(a) * d,
      sy:    Math.sin(a) * d,
      color: gold ? '#FFD700' : '#00E5FF',
      phase,
      delay: j * 0.035,
      size:  j % 3 === 0 ? 3 : 2,
    };
  })
);

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { onComplete: () => void; }

export default function IntroAnimation({ onComplete }: Props) {
  const [phase, setPhase]     = useState(0);
  const [exiting, setExiting] = useState(false);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    const T = [
      setTimeout(() => setPhase(1),  300),
      setTimeout(() => setPhase(2),  700),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1450),
      setTimeout(() => setPhase(5), 1700),
      setTimeout(() => setPhase(6), 1950),
      setTimeout(() => setPhase(7), 2250),
      setTimeout(() => setPhase(8), 2650),
      setTimeout(() => setExiting(true), 3400),
      setTimeout(() => cbRef.current(),  3950),
    ];
    return () => T.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#050816' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >

          {/* ── Atmosphere bloom ────────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            style={{
              background:
                'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(41,121,255,0.20) 0%, transparent 75%)',
            }}
          />

          {/* ── Field particles (phase 2 → 7) ───────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {FIELD.map((p) => (
              <motion.div
                key={`f${p.id}`}
                className="absolute rounded-full"
                style={{
                  width:  p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={
                  phase >= 2
                    ? {
                        x:       phase >= 3 ? p.tx * 0.55 : p.tx,
                        y:       phase >= 3 ? p.ty * 0.55 : p.ty,
                        opacity: phase >= 8 ? 0 : 1,
                        scale:   1,
                      }
                    : { x: 0, y: 0, opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay:    p.delay,
                  ease:     'easeOut',
                }}
              />
            ))}
          </div>

          {/* ── Gathering dots → each letter's centre ───────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {GATHERERS.map((g) =>
              phase >= g.phase ? (
                <motion.div
                  key={g.key}
                  className="absolute rounded-full"
                  style={{
                    width:  g.size,
                    height: g.size,
                    background: g.color,
                    boxShadow: `0 0 5px ${g.color}`,
                  }}
                  initial={{ x: g.cx + g.sx, y: g.sy, opacity: 0 }}
                  animate={{ x: g.cx, y: 0, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.35, delay: g.delay, ease: 'easeIn' }}
                />
              ) : null
            )}
          </div>

          {/* ── Origin particle (phase 1 → 2) ───────────────────────── */}
          <AnimatePresence>
            {phase >= 1 && phase < 3 && (
              <motion.div
                key="origin"
                className="absolute rounded-full"
                style={{
                  width: 10, height: 10,
                  background: '#4A9EFF',
                  boxShadow: '0 0 30px 12px rgba(41,121,255,0.8)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale:   [0, 2, 1.3, 1.7, 1],
                  opacity: 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* ── CARE ONE letter assembly ─────────────────────────────── */}
          <div className="relative flex items-center select-none">
            {/* C A R E */}
            {LETTERS.filter(l => !l.gold).map((l, i) => (
              <AnimatePresence key={`care-${l.ch}-${i}`}>
                {phase >= l.phase && (
                  <motion.span
                    className="font-display font-bold text-white"
                    style={{
                      fontSize: 'clamp(52px, 10vw, 90px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      display: 'inline-block',
                      textShadow:
                        '0 0 25px rgba(41,121,255,0.9), 0 0 55px rgba(41,121,255,0.4)',
                    }}
                    initial={{ opacity: 0, scale: 1.8, filter: 'blur(22px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {l.ch}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}

            {/* Gap before ONE */}
            <span style={{ display: 'inline-block', width: phase >= 7 ? 'clamp(12px,2vw,22px)' : 0 }} />

            {/* O N E */}
            {LETTERS.filter(l => l.gold).map((l, i) => (
              <AnimatePresence key={`one-${l.ch}-${i}`}>
                {phase >= 7 && (
                  <motion.span
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(52px, 10vw, 90px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      display: 'inline-block',
                      background:
                        'linear-gradient(135deg, #FFD700 0%, #00E5FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter:
                        'drop-shadow(0 0 18px rgba(255,215,0,0.7))',
                    }}
                    initial={{ opacity: 0, scale: 1.9, filter: 'blur(24px) drop-shadow(0 0 18px rgba(255,215,0,0.7))' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) drop-shadow(0 0 18px rgba(255,215,0,0.7))' }}
                    transition={{
                      duration: 0.28,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {l.ch}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* ── Tagline beneath CARE ONE ─────────────────────────────── */}
          <AnimatePresence>
            {phase >= 7 && (
              <motion.p
                key="tagline"
                className="absolute font-display text-white/35 tracking-[0.35em] uppercase"
                style={{
                  top: 'calc(50% + clamp(40px, 7vw, 70px))',
                  fontSize: 'clamp(9px, 1.1vw, 12px)',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Your Health. Our Mission.
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Golden shockwave (phase 8) ───────────────────────────── */}
          {phase >= 8 && (
            <>
              {/* Hard inner flash */}
              <motion.div
                key="flash-core"
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 6, height: 6,
                  background: '#FFD700',
                  boxShadow: '0 0 30px 15px rgba(255,215,0,0.9)',
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 700, opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Expanding ring */}
              <motion.div
                key="flash-ring"
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 50, height: 50,
                  border: '3px solid rgba(255,215,0,0.95)',
                  boxShadow:
                    '0 0 40px 10px rgba(255,215,0,0.55), inset 0 0 20px rgba(255,215,0,0.3)',
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 55, opacity: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              />
              {/* Screen radial overlay */}
              <motion.div
                key="flash-bg"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,215,0,0.38) 0%, rgba(41,121,255,0.22) 45%, transparent 80%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, times: [0, 0.12, 1] }}
              />
            </>
          )}

          {/* ── Subtle CRT scan line ─────────────────────────────────── */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(0,229,255,0.12), transparent)',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
