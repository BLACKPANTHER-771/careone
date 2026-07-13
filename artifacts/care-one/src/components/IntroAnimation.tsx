/**
 * IntroAnimation — cinematic 3-second opening sequence.
 * Plays once per browser session (sessionStorage gated).
 *
 * Timeline
 *  0.00 – 0.30s  Dark void
 *  0.30 – 0.70s  Origin particle pulses to life
 *  0.70 – 1.20s  Particle energy field explodes outward
 *  1.20 – 1.40s  "C" crystallises from converging particles
 *  1.40 – 1.60s  "A" crystallises
 *  1.60 – 1.80s  "R" crystallises
 *  1.80 – 2.00s  "E" crystallises → full "CARE"
 *  2.00 – 2.40s  " ONE" assembles in gold/cyan
 *  2.40 – 3.10s  Golden shockwave sweeps entire screen
 *  3.10s         onComplete fires; component fades out
 */

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ─── Pre-computed constants (zero Math.random() in render) ───────────────────

// Field particles — burst from origin then orbit
const FIELD_PARTICLES = Array.from({ length: 72 }, (_, i) => {
  const angle = (i / 72) * Math.PI * 2;
  const r = 70 + (i * 23) % 140;
  return {
    id: i,
    tx: Math.cos(angle) * r,
    ty: Math.sin(angle) * r,
    color:
      i % 7 === 0 ? '#FFD700'
      : i % 3 === 0 ? '#00E5FF'
      : '#3D8EFF',
    size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2.5 : 1.8,
    delay: (i % 12) * 0.025,
    orbitDur: 6 + (i % 6),
    pulseDelay: (i % 8) * 0.15,
  };
});

// Gathering particles per letter — converge toward each letter's center
// offsets relative to text container center (px, ~80px font)
const LETTER_CENTERS = [
  { ch: 'C', x: -244 },
  { ch: 'A', x: -170 },
  { ch: 'R', x:  -94 },
  { ch: 'E', x:  -18 },
  { ch: 'O', x:   72 },
  { ch: 'N', x:  152 },
  { ch: 'E', x:  228 },
];

// 10 gathering particles per letter, with pre-computed start offsets
const GATHERERS = LETTER_CENTERS.map(({ ch, x }) =>
  Array.from({ length: 10 }, (_, j) => {
    const angle = (j / 10) * Math.PI * 2 + j * 0.4;
    const dist = 80 + (j * 31) % 100;
    return {
      ch,
      cx: x,
      sx: Math.cos(angle) * dist,
      sy: Math.sin(angle) * dist,
      color: (ch === 'O' || ch === 'N') ? '#FFD700' : '#00E5FF',
      delay: j * 0.04,
      size: j % 3 === 0 ? 3 : 2,
    };
  })
);

// Letter phase index: when does each letter start appearing?
const LETTER_PHASE: Record<string, number> = {
  // CARE group — phases 3-6
  C: 3, A: 4, R: 5, E: 6,
  // ONE group — phase 7
  O: 7, N: 7,
};
// The second "E" (in ONE) uses phase 7 also — we handle by letter index

// Phase colours
const isGoldGroup = (ch: string, idx: number) =>
  ch === 'O' || ch === 'N' || (ch === 'E' && idx === 6);

// ─── Component ────────────────────────────────────────────────────────────────

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1),  300),   // origin particle
      setTimeout(() => setPhase(2),  700),   // energy field
      setTimeout(() => setPhase(3), 1200),   // C
      setTimeout(() => setPhase(4), 1400),   // A
      setTimeout(() => setPhase(5), 1600),   // R
      setTimeout(() => setPhase(6), 1800),   // E  → CARE complete
      setTimeout(() => setPhase(7), 2050),   // ONE
      setTimeout(() => setPhase(8), 2500),   // golden pulse
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => onCompleteRef.current(), 600);
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#050816] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >

          {/* ── Radial atmosphere glow ────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,121,255,0.18) 0%, rgba(5,8,22,0) 80%)',
            }}
          />

          {/* ── Field particles (phase 2+) ─────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {FIELD_PARTICLES.map((p) => (
              <motion.div
                key={`fp-${p.id}`}
                className="absolute rounded-full"
                style={{
                  width: p.size, height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={phase >= 2 ? {
                  x: phase >= 3 ? p.tx * 0.6 : p.tx,
                  y: phase >= 3 ? p.ty * 0.6 : p.ty,
                  opacity: phase >= 8 ? 0 : [0, 1, 0.6, 0.9],
                  scale: 1,
                } : { x: 0, y: 0, opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.55,
                  delay: p.delay,
                  ease: 'easeOut',
                  opacity: { duration: 0.4 + p.pulseDelay * 0.2 },
                }}
              />
            ))}
          </div>

          {/* ── Gathering particles (phase 3-7) — converge to each letter ── */}
          {phase >= 3 && phase < 8 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {GATHERERS.flatMap((group, li) =>
                group.map((g, gi) => {
                  const letterPhase = isGoldGroup(g.ch, li * 10 + gi)
                    ? 7 : LETTER_PHASE[g.ch] ?? 3;
                  if (phase < letterPhase) return null;
                  return (
                    <motion.div
                      key={`g-${li}-${gi}`}
                      className="absolute rounded-full"
                      style={{ width: g.size, height: g.size, background: g.color, boxShadow: `0 0 6px ${g.color}` }}
                      initial={{ x: g.cx + g.sx, y: g.sy, opacity: 0 }}
                      animate={{ x: g.cx, y: 0, opacity: [0, 1, 0] }}
                      transition={{ duration: 0.38, delay: g.delay, ease: 'easeIn' }}
                    />
                  );
                })
              )}
            </div>
          )}

          {/* ── Origin particle (phase 1-2) ───────────────────────────── */}
          <AnimatePresence>
            {phase >= 1 && phase < 3 && (
              <motion.div
                key="origin"
                className="absolute rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 1.2, 1.6, 1],
                  opacity: 1,
                  boxShadow: [
                    '0 0 20px 8px rgba(41,121,255,0.6)',
                    '0 0 50px 24px rgba(41,121,255,0.9)',
                    '0 0 30px 14px rgba(41,121,255,0.7)',
                  ],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: 10, height: 10, background: '#3D8EFF' }}
              />
            )}
          </AnimatePresence>

          {/* ── CARE ONE text assembly ────────────────────────────────── */}
          <div className="relative flex items-center gap-0 select-none">
            {/* C A R E */}
            {(['C', 'A', 'R', 'E'] as const).map((ch, i) => {
              const showPhase = i + 3; // C=3, A=4, R=5, E=6
              return (
                <AnimatePresence key={`care-${ch}-${i}`}>
                  {phase >= showPhase && (
                    <motion.span
                      key={`care-letter-${ch}-${i}`}
                      className="font-display font-bold text-white"
                      style={{
                        fontSize: 'clamp(48px, 9vw, 86px)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                        display: 'inline-block',
                        textShadow: '0 0 30px rgba(41,121,255,0.8), 0 0 60px rgba(41,121,255,0.4)',
                        willChange: 'transform, opacity, filter',
                      }}
                      initial={{ opacity: 0, scale: 1.6, filter: 'blur(18px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {ch}
                    </motion.span>
                  )}
                </AnimatePresence>
              );
            })}

            {/* Spacer */}
            {phase >= 7 && <span style={{ display: 'inline-block', width: 'clamp(10px,2vw,20px)' }} />}

            {/* O N E */}
            {(['O', 'N', 'E'] as const).map((ch, i) => (
              <AnimatePresence key={`one-${ch}-${i}`}>
                {phase >= 7 && (
                  <motion.span
                    key={`one-letter-${ch}-${i}`}
                    className="font-display font-bold"
                    style={{
                      fontSize: 'clamp(48px, 9vw, 86px)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #FFD700 0%, #00E5FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))',
                      willChange: 'transform, opacity',
                    }}
                    initial={{ opacity: 0, scale: 1.8, filter: 'blur(22px) drop-shadow(0 0 20px rgba(255,215,0,0.6))' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) drop-shadow(0 0 20px rgba(255,215,0,0.6))' }}
                    transition={{ duration: 0.32, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ch}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* ── Tagline (appears with ONE) ────────────────────────────── */}
          <AnimatePresence>
            {phase >= 7 && (
              <motion.p
                key="tagline"
                className="absolute font-display text-white/40 tracking-[0.3em] uppercase"
                style={{ bottom: 'calc(50% - 80px)', fontSize: 'clamp(10px, 1.2vw, 13px)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                Your Health. Our Mission.
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Golden shockwave (phase 8) ────────────────────────────── */}
          <AnimatePresence>
            {phase >= 8 && (
              <>
                {/* Inner hard flash */}
                <motion.div
                  key="flash-inner"
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 4, height: 4, background: '#FFD700' }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 600, opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Outer gold ring */}
                <motion.div
                  key="flash-ring"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 60, height: 60,
                    border: '3px solid rgba(255,215,0,0.9)',
                    boxShadow: '0 0 40px 10px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,215,0,0.3)',
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 50, opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                />
                {/* Screen-wide golden overlay */}
                <motion.div
                  key="flash-overlay"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(41,121,255,0.2) 50%, rgba(5,8,22,0) 100%)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.85, times: [0, 0.15, 1] }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── Scan line (subtle film-noir CRT feel) ─────────────────── */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.15), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
