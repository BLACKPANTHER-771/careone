import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import RippleButton from './RippleButton';
import { useScrollParallax } from '../hooks/useScrollParallax';

// ─── Pre-computed constants (never inside render) ────────────────────────────

const CORE_PARTICLES = [
  { rx: 90, ry: 36, phase: 0,              duration: 3.2, color: '#FFD700' },
  { rx: 90, ry: 36, phase: Math.PI * 0.5,  duration: 3.2, color: '#FFD700' },
  { rx: 72, ry: 28, phase: Math.PI * 0.25, duration: 4.1, color: '#00E5FF' },
  { rx: 72, ry: 28, phase: Math.PI * 1.0,  duration: 4.1, color: '#00E5FF' },
  { rx: 108, ry: 44, phase: Math.PI * 0.6, duration: 5.0, color: '#2979FF' },
  { rx: 108, ry: 44, phase: Math.PI * 1.4, duration: 5.0, color: '#2979FF' },
  { rx: 82, ry: 32, phase: Math.PI * 1.7,  duration: 3.7, color: '#FFD700' },
  { rx: 100, ry: 40, phase: Math.PI * 1.2, duration: 4.6, color: '#00E5FF' },
];

const HERO_PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  top:    `${5  + (i * 19) % 90}%`,
  left:   `${3  + (i * 37) % 94}%`,
  size:   i % 3 === 0 ? '2px' : '1.5px',
  dur:    4 + (i % 8),
  delay:  (i % 5) * 0.7,
  baseOp: 0.05 + (i % 4) * 0.05,
  color:  i % 4 === 0
    ? 'rgba(0,229,255,0.6)'
    : i % 3 === 0
    ? 'rgba(200,160,60,0.5)'
    : 'rgba(255,255,255,0.4)',
}));

const GLASS_PANELS = [
  { w: '28vw', h: '18vh', top: '8%',  left: '3%',        rotate: '-3deg', delay: 0,   op: 0.4 },
  { w: '22vw', h: '25vh', top: '15%', left: undefined, right: '4%', rotate: '2deg',  delay: 1,   op: 0.3 },
  { w: '18vw', h: '14vh', top: '55%', left: '5%',        rotate: '-1deg', delay: 2,   op: 0.25 },
  { w: '20vw', h: '16vh', top: '60%', left: undefined, right: '3%', rotate: '3deg',  delay: 1.5, op: 0.2 },
];

const LIGHT_SHAFTS = [
  { left: '14%', width: '100px', rotate: '-22deg', color: 'rgba(41,121,255,0.07)', delay: 0,   dur: 9 },
  { left: '47%', width: '180px', rotate:   '0deg', color: 'rgba(0,229,255,0.05)',  delay: 3,   dur: 11 },
  { left: '74%', width:  '90px', rotate:  '20deg', color: 'rgba(41,121,255,0.06)', delay: 1.5, dur: 8 },
];

const BG_ORBS = [
  { color: 'rgba(41,121,255,0.13)', size: '80vw', top: '-20%', left: '10%', dur: 12 },
  { color: 'rgba(0,200,220,0.07)',  size: '60vw', top: '30%',  left: '60%', dur: 16 },
  { color: 'rgba(100,60,200,0.06)', size: '70vw', top: '50%',  left: '-20%',dur: 20 },
];

// ─── Real-time store status ───────────────────────────────────────────────────

function useStoreStatus() {
  const [status, setStatus] = useState<'open' | 'closed'>('open');
  useEffect(() => {
    const check = () => {
      const t = new Date();
      const mins = t.getHours() * 60 + t.getMinutes();
      setStatus(mins >= 480 && mins < 1380 ? 'open' : 'closed');
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const status = useStoreStatus();
  const { ref, y: parallaxY } = useScrollParallax(0.2);

  useEffect(() => {
    const onMouse = (e: MouseEvent) =>
      setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    const onGyro = (e: DeviceOrientationEvent) =>
      setMouse({
        x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30)),
        y: Math.max(-1, Math.min(1, ((e.beta ?? 0) - 45) / 30)),
      });
    window.addEventListener('mousemove', onMouse);
    if (typeof window.DeviceOrientationEvent !== 'undefined')
      window.addEventListener('deviceorientation', onGyro);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      if (typeof window.DeviceOrientationEvent !== 'undefined')
        window.removeEventListener('deviceorientation', onGyro);
    };
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: '100dvh' }}>

      {/* ── LAYER 0: Deep atmosphere orbs ─────────────────────────────────── */}
      <motion.div className="absolute inset-0 pointer-events-none z-[0]" style={{ y: parallaxY }}>
        {BG_ORBS.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size, height: orb.size,
              top: orb.top, left: orb.left,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 1: Dome walls SVG ───────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wgL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(41,121,255,0.0)" />
            <stop offset="30%"  stopColor="rgba(41,121,255,0.14)" />
            <stop offset="50%"  stopColor="rgba(0,229,255,0.22)" />
            <stop offset="70%"  stopColor="rgba(41,121,255,0.14)" />
            <stop offset="100%" stopColor="rgba(41,121,255,0.0)" />
          </linearGradient>
          <linearGradient id="wgR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(41,121,255,0.0)" />
            <stop offset="30%"  stopColor="rgba(41,121,255,0.14)" />
            <stop offset="50%"  stopColor="rgba(0,229,255,0.22)" />
            <stop offset="70%"  stopColor="rgba(41,121,255,0.14)" />
            <stop offset="100%" stopColor="rgba(41,121,255,0.0)" />
          </linearGradient>
        </defs>

        {/* Left dome wall — three arcs of decreasing opacity */}
        <path d="M -5,0 Q 25,50 -5,100"  fill="none" stroke="url(#wgL)" strokeWidth="0.35" />
        <path d="M  2,0 Q 28,50  2,100"  fill="none" stroke="url(#wgL)" strokeWidth="0.18" opacity="0.55" />
        <path d="M  9,0 Q 31,50  9,100"  fill="none" stroke="rgba(41,121,255,0.05)" strokeWidth="0.1" />

        {/* Right dome wall */}
        <path d="M 105,0 Q 75,50 105,100" fill="none" stroke="url(#wgR)" strokeWidth="0.35" />
        <path d="M  98,0 Q 72,50  98,100" fill="none" stroke="url(#wgR)" strokeWidth="0.18" opacity="0.55" />
        <path d="M  91,0 Q 69,50  91,100" fill="none" stroke="rgba(41,121,255,0.05)" strokeWidth="0.1" />

        {/* Ceiling arc */}
        <path d="M 0,0 Q 50,-14 100,0" fill="none" stroke="rgba(41,121,255,0.1)" strokeWidth="0.22" />
        <path d="M 5,1.5 Q 50,-7 95,1.5" fill="none" stroke="rgba(41,121,255,0.05)" strokeWidth="0.1" />

        {/* Perspective floor grid — converging lines */}
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <line key={`fg-${i}`} x1={x} y1="100" x2="50" y2="66"
            stroke="rgba(41,121,255,0.04)" strokeWidth="0.1" />
        ))}
        {[72, 80, 88, 96].map((yv, i) => (
          <line key={`fh-${i}`} x1="8" y1={yv} x2="92" y2={yv}
            stroke="rgba(41,121,255,0.03)" strokeWidth="0.08" />
        ))}
      </svg>

      {/* Edge glow strips */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(41,121,255,0.5) 30%, rgba(0,229,255,0.7) 50%, rgba(41,121,255,0.5) 70%, transparent)' }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[2px] pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(41,121,255,0.5) 30%, rgba(0,229,255,0.7) 50%, rgba(41,121,255,0.5) 70%, transparent)' }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── LAYER 2: Floating glass architecture panels (desktop only) ──── */}
      {GLASS_PANELS.map((p, i) => (
        <motion.div
          key={`gp-${i}`}
          className="absolute pointer-events-none z-[2] hidden md:block"
          style={{
            width: p.w, height: p.h,
            top: p.top,
            ...(p.left  ? { left:  p.left  } : {}),
            ...(p.right ? { right: p.right } : {}),
            transform: `rotate(${p.rotate})`,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(41,121,255,0.06) 50%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderTop: '1px solid rgba(255,255,255,0.13)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
            opacity: p.op,
          }}
          animate={{ y: [0, -8, 0], opacity: [p.op, p.op * 1.35, p.op] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          {/* Interior scan lines */}
          <div className="absolute inset-0 overflow-hidden rounded-[16px]"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(41,121,255,0.03) 18px, rgba(41,121,255,0.03) 19px)' }} />
          {/* Corner glow */}
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.18) 0%, transparent 70%)' }} />
        </motion.div>
      ))}

      {/* ── LAYER 3: Volumetric light shafts ──────────────────────────── */}
      {LIGHT_SHAFTS.map((s, i) => (
        <motion.div
          key={`ls-${i}`}
          className="absolute top-0 pointer-events-none z-[3]"
          style={{
            left: s.left, width: s.width, height: '72vh',
            transform: `rotate(${s.rotate})`,
            transformOrigin: 'top center',
            background: `linear-gradient(to bottom, ${s.color} 0%, transparent 100%)`,
          }}
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.12, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}

      {/* ── LAYER 3: Particle field ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {HERO_PARTICLES.map((p, i) => (
          <motion.div
            key={`hp-${i}`}
            className="absolute rounded-full"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [0, -30, 0], opacity: [p.baseOp, p.baseOp * 4, p.baseOp] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* ── LAYER 4: Atmospheric fog ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[32vh] pointer-events-none z-[4]"
        style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.75) 0%, rgba(5,8,22,0.3) 45%, transparent 100%)' }} />
      <motion.div
        className="absolute left-[-10%] top-[20%] pointer-events-none z-[4] rounded-full"
        style={{ width: '50vw', height: '40vh', background: 'radial-gradient(ellipse, rgba(41,121,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, 20, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-[30%] pointer-events-none z-[4] rounded-full"
        style={{ width: '40vw', height: '35vh', background: 'radial-gradient(ellipse, rgba(0,180,220,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ x: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* ── LAYER 5 + 6: Content + Health Core ────────────────────────── */}
      <div className="relative z-[6] flex flex-col items-center justify-center min-h-[100dvh] pt-16 pb-6 px-4">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-8 inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/5 ${status === 'closed' ? 'bg-destructive/10 border-destructive/30' : ''}`}
        >
          {status === 'open' ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium tracking-wide text-white/80">OPEN NOW — 8:00 AM – 11:00 PM</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
              </span>
              <span className="text-sm font-medium tracking-wide text-white/80">CLOSED · Opens Tomorrow at 8:00 AM</span>
            </>
          )}
        </motion.div>

        {/* The Living Health Core */}
        <motion.div
          className="relative w-44 h-44 md:w-72 md:h-72 flex items-center justify-center mx-auto mb-6 md:mb-10"
          animate={{ x: mouse.x * 20, y: mouse.y * 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        >
          {/* Outer golden orbit rings */}
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
            <div style={{ width: '100%', height: '100%', border: '1.5px solid rgba(200,160,60,0.35)', borderRadius: '50%', transform: 'rotateX(75deg)', boxShadow: '0 0 20px rgba(200,160,60,0.15)' }} />
          </motion.div>
          <motion.div className="absolute inset-4" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
            <div style={{ width: '100%', height: '100%', border: '1px solid rgba(200,160,60,0.2)', borderRadius: '50%', transform: 'rotateX(60deg) rotateZ(30deg)', boxShadow: '0 0 15px rgba(200,160,60,0.1)' }} />
          </motion.div>
          <motion.div className="absolute inset-8" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
            <div style={{ width: '100%', height: '100%', border: '1px solid rgba(41,121,255,0.4)', borderRadius: '50%', transform: 'rotateX(80deg)', boxShadow: '0 0 25px rgba(41,121,255,0.2)' }} />
          </motion.div>

          {/* Core sphere */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                '0 0 40px 20px rgba(41,121,255,0.3), 0 0 80px 40px rgba(41,121,255,0.15), 0 0 120px 60px rgba(41,121,255,0.05)',
                '0 0 60px 30px rgba(41,121,255,0.5), 0 0 120px 60px rgba(41,121,255,0.25), 0 0 180px 90px rgba(41,121,255,0.08)',
                '0 0 40px 20px rgba(41,121,255,0.3), 0 0 80px 40px rgba(41,121,255,0.15), 0 0 120px 60px rgba(41,121,255,0.05)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 md:w-32 md:h-32 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 35%, rgba(100,180,255,0.9) 0%, rgba(41,121,255,0.8) 40%, rgba(10,30,100,0.9) 100%)' }}
          />

          {/* Orbiting energy particles */}
          {CORE_PARTICLES.map((p, i) => (
            <motion.div
              key={`cp-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
              animate={{
                x: [p.rx * Math.cos(p.phase), p.rx * Math.cos(p.phase + Math.PI), p.rx * Math.cos(p.phase + 2 * Math.PI)],
                y: [p.ry * Math.sin(p.phase), p.ry * Math.sin(p.phase + Math.PI), p.ry * Math.sin(p.phase + 2 * Math.PI)],
              }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </motion.div>

        {/* CARE ONE wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-white drop-shadow-2xl mb-4 text-center"
        >
          CARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ONE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg md:text-xl text-white/50 font-light tracking-wide mb-10"
        >
          Your Health. Our Mission.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none sm:w-auto"
        >
          <RippleButton
            href="tel:8826775758"
            className="group inline-flex items-center justify-center gap-3 bg-cyan-400 text-black px-8 py-5 rounded-2xl font-bold text-lg tracking-wide shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(0,229,255,0.6)]"
          >
            <Phone className="w-6 h-6 relative z-10" />
            <span className="relative z-10">CALL NOW</span>
          </RippleButton>
          <RippleButton
            href="https://maps.google.com/?q=Paramount+GolfMart+Surajpur+Greater+Noida"
            target="_blank"
            className="group inline-flex items-center justify-center gap-3 glass-button px-8 py-5 rounded-2xl font-medium text-lg tracking-wide text-white hover:scale-105"
          >
            <MapPin className="w-6 h-6 text-primary relative z-10" />
            <span className="relative z-10">GET DIRECTIONS</span>
          </RippleButton>
        </motion.div>

      </div>
    </section>
  );
}
