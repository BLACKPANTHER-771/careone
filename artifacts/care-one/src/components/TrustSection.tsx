import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// ─── Pre-computed constants ────────────────────────────────────────────────────

// Crystal orbital particles — 3 rings, 4 particles each, pre-computed keyframes
// Ring 0: nearly horizontal  rx=66 ry=18
// Ring 1: mid-tilt           rx=56 ry=28
// Ring 2: steep              rx=44 ry=36
const CRYSTAL_RINGS = [
  { rx: 66, ry: 18, color: '#FFE566', size: 3.5, particles: 4, durBase: 5.2  },
  { rx: 56, ry: 28, color: '#FFAA00', size: 2.8, particles: 4, durBase: 7.0  },
  { rx: 44, ry: 36, color: '#FF8C00', size: 2.2, particles: 4, durBase: 9.5  },
];

const CRYSTAL_ORBITERS = CRYSTAL_RINGS.flatMap((ring, ri) =>
  Array.from({ length: ring.particles }, (_, pi) => {
    const phase = (pi / ring.particles) * Math.PI * 2;
    // 5-point keyframe approximation of a full ellipse orbit
    const steps = 5;
    const xs = Array.from({ length: steps + 1 }, (_, s) => {
      const a = phase + (s / steps) * Math.PI * 2;
      return parseFloat((ring.rx * Math.cos(a)).toFixed(2));
    });
    const ys = Array.from({ length: steps + 1 }, (_, s) => {
      const a = phase + (s / steps) * Math.PI * 2;
      return parseFloat((ring.ry * Math.sin(a)).toFixed(2));
    });
    return {
      xs, ys,
      color: ring.color,
      size:  ring.size,
      dur:   ring.durBase + pi * 0.4,
      delay: (ri * 0.9 + pi * 0.55),
      glow:  ring.color,
    };
  })
);

// Background micro-particle positions per card (deterministic)
const CARD_PARTICLES = Array.from({ length: 5 }, (_, ci) =>
  Array.from({ length: 8 }, (_, pi) => ({
    top:  `${10 + (pi * 19 + ci * 7) % 80}%`,
    left: `${5  + (pi * 31 + ci * 13) % 88}%`,
    size: pi % 3 === 0 ? 2 : 1.5,
    dur:  4 + ((pi + ci) % 5),
    del:  ((pi * ci + pi) % 7) * 0.4,
  }))
);

// Card float offsets so cards breathe out of phase
const FLOAT = [
  { y: [-4, 4],  dur: 7  },
  { y: [-6, 2],  dur: 9  },
  { y: [-2, 6],  dur: 8  },
  { y: [-5, 3],  dur: 10 },
  { y: [-3, 5],  dur: 6  },
];

// ─── Per-card illustration components ─────────────────────────────────────────

function EnergyCrystalIllustration() {
  return (
    <svg viewBox="0 0 160 148" className="w-full h-full" overflow="visible">
      <defs>
        {/* ── Cinematic face gradients (light source: top-left) ── */}
        <linearGradient id="ec-table" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(230,245,255,0.92)" />
          <stop offset="55%"  stopColor="rgba(160,210,255,0.72)" />
          <stop offset="100%" stopColor="rgba(100,170,255,0.50)" />
        </linearGradient>
        <linearGradient id="ec-leftcrown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(190,230,255,0.65)" />
          <stop offset="100%" stopColor="rgba(100,170,255,0.42)" />
        </linearGradient>
        <linearGradient id="ec-rightcrown" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(30,80,200,0.55)" />
          <stop offset="100%" stopColor="rgba(10,30,130,0.75)" />
        </linearGradient>
        <linearGradient id="ec-strip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(140,195,255,0.38)" />
          <stop offset="100%" stopColor="rgba(40,80,200,0.45)" />
        </linearGradient>
        <linearGradient id="ec-lpav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(90,150,255,0.50)" />
          <stop offset="100%" stopColor="rgba(20,50,180,0.65)" />
        </linearGradient>
        <linearGradient id="ec-cpav" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(150,200,255,0.38)" />
          <stop offset="100%" stopColor="rgba(60,120,240,0.55)" />
        </linearGradient>
        <linearGradient id="ec-rpav" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(15,40,160,0.70)" />
          <stop offset="100%" stopColor="rgba(5,10,80,0.85)" />
        </linearGradient>
        {/* Internal golden core glow */}
        <radialGradient id="ec-core" cx="42%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,220,80,0.55)" />
          <stop offset="45%"  stopColor="rgba(255,160,20,0.22)" />
          <stop offset="100%" stopColor="rgba(200,100,0,0)"      />
        </radialGradient>
        {/* Outer ambient glow */}
        <radialGradient id="ec-ambient" cx="50%" cy="45%" r="55%">
          <stop offset="0%"   stopColor="rgba(100,160,255,0.18)" />
          <stop offset="100%" stopColor="rgba(40,80,255,0)"      />
        </radialGradient>
        {/* Particle glow filter */}
        <filter id="ec-pglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Edge specular filter */}
        <filter id="ec-spec" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Ambient halo behind crystal ────────────────────────────── */}
      <ellipse cx="80" cy="72" rx="62" ry="48" fill="url(#ec-ambient)" />

      {/* ── Crystal body — 7 faces, cinematic light from top-left ──── */}
      {/*
          Key vertices:
          Table:    TL(52,20)  TR(108,20)  IR(100,52)  IL(60,52)
          Girdle:   GL(22,70)              GR(138,70)
          Strip:    IL(60,52)  IR(100,52)  IR2(100,62) IL2(60,62)
          Culet:    BP(80,138)
      */}

      {/* Rotating wrapper — slow Y-axis spin via scaleX oscillation */}
      <motion.g
        animate={{ scaleX: [1, 0.91, 1, 1.06, 1], skewY: [0, 0.6, 0, -0.5, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '80px 79px' }}
      >
        {/* Face 1: Table — top flat, brightest */}
        <polygon points="52,20 108,20 100,52 60,52" fill="url(#ec-table)" />

        {/* Face 2: Left crown — light-facing, medium-bright */}
        <polygon points="52,20 22,70 60,52" fill="url(#ec-leftcrown)" />

        {/* Face 3: Right crown — shadow-facing, deep navy */}
        <polygon points="108,20 138,70 100,52" fill="url(#ec-rightcrown)" />

        {/* Face 4: Girdle strip */}
        <polygon points="60,52 100,52 100,62 60,62" fill="url(#ec-strip)" />

        {/* Face 5: Left pavilion */}
        <polygon points="22,70 60,62 80,138" fill="url(#ec-lpav)" />

        {/* Face 6: Centre pavilion — internal bounce light */}
        <polygon points="60,62 100,62 80,138" fill="url(#ec-cpav)" />

        {/* Face 7: Right pavilion — deepest shadow */}
        <polygon points="138,70 80,138 100,62" fill="url(#ec-rpav)" />

        {/* Internal golden core glow (sits above faces) */}
        <ellipse cx="76" cy="62" rx="44" ry="34" fill="url(#ec-core)" />

        {/* ── Face edge lines ─────────────────────────────────────── */}
        {/* Outer silhouette */}
        <polygon points="52,20 108,20 138,70 80,138 22,70"
          fill="none" stroke="rgba(200,230,255,0.35)" strokeWidth="0.8" />
        {/* Internal divider lines */}
        <line x1="52" y1="20" x2="60" y2="52"  stroke="rgba(200,230,255,0.28)" strokeWidth="0.6" />
        <line x1="108" y1="20" x2="100" y2="52" stroke="rgba(120,160,255,0.22)" strokeWidth="0.6" />
        <line x1="60" y1="52" x2="22" y2="70"   stroke="rgba(200,230,255,0.22)" strokeWidth="0.5" />
        <line x1="100" y1="52" x2="138" y2="70"  stroke="rgba(80,120,220,0.2)"  strokeWidth="0.5" />
        <line x1="60" y1="62" x2="22" y2="70"   stroke="rgba(160,200,255,0.18)" strokeWidth="0.5" />
        <line x1="100" y1="62" x2="138" y2="70"  stroke="rgba(60,90,200,0.18)"  strokeWidth="0.5" />
        <line x1="60" y1="52" x2="100" y2="52"  stroke="rgba(200,230,255,0.22)" strokeWidth="0.5" />
        <line x1="60" y1="62" x2="100" y2="62"  stroke="rgba(160,200,255,0.18)" strokeWidth="0.5" />
        <line x1="60" y1="62" x2="80" y2="138"  stroke="rgba(120,170,255,0.15)" strokeWidth="0.5" />
        <line x1="100" y1="62" x2="80" y2="138"  stroke="rgba(40,60,180,0.18)"  strokeWidth="0.5" />

        {/* ── Specular highlight — top-left corner flash ──────────── */}
        <motion.ellipse
          cx="64" cy="30" rx="18" ry="10"
          fill="rgba(255,255,255,0.55)"
          style={{ filter: 'blur(6px)' }}
          animate={{ opacity: [0.45, 0.75, 0.45], cx: [64, 60, 64], cy: [30, 28, 30] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Refraction lines inside crystal ─────────────────────── */}
        <line x1="68" y1="28" x2="58" y2="58"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="82" y1="24" x2="74" y2="54"
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="70" y1="60" x2="55" y2="90"
          stroke="rgba(180,210,255,0.10)" strokeWidth="0.6" strokeLinecap="round" />

        {/* ── TEXT inside the crystal ──────────────────────────────── */}
        {/* Shadow layers for depth */}
        <text x="81" y="58" textAnchor="middle" fontSize="28" fontWeight="900"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          fill="rgba(80,40,0,0.5)" letterSpacing="-0.5">20%</text>
        <text x="80.5" y="57.5" textAnchor="middle" fontSize="28" fontWeight="900"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          fill="rgba(180,90,0,0.6)" letterSpacing="-0.5">20%</text>
        {/* Glowing gold main text */}
        <motion.text x="80" y="57" textAnchor="middle" fontSize="28" fontWeight="900"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          fill="#FFE066"
          filter="url(#ec-pglow)"
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >20%</motion.text>

        {/* "OFF" sub-label */}
        <text x="80" y="70" textAnchor="middle" fontSize="11" fontWeight="800"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          fill="rgba(255,210,80,0.9)" letterSpacing="3">OFF</text>

        {/* "ON MEDICINES" label */}
        <text x="80" y="83" textAnchor="middle" fontSize="8.5" fontWeight="600"
          fontFamily="'Plus Jakarta Sans',sans-serif"
          fill="rgba(200,230,255,0.70)" letterSpacing="1.5">ON MEDICINES</text>
      </motion.g>

      {/* ── Golden orbital particles ─────────────────────────────── */}
      {CRYSTAL_ORBITERS.map((p, i) => (
        <motion.circle
          key={`co-${i}`}
          r={p.size}
          fill={p.color}
          filter="url(#ec-pglow)"
          style={{ cx: 80, cy: 72 } as React.CSSProperties}
          animate={{ x: p.xs, y: p.ys }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}

      {/* ── Bottom culet sparkle ─────────────────────────────────── */}
      <motion.circle
        cx="80" cy="138" r="3"
        fill="rgba(200,220,255,0.7)"
        filter="url(#ec-spec)"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '80px 138px' }}
      />
    </svg>
  );
}

function BPIllustration() {
  return (
    <svg viewBox="0 0 160 140" className="w-full h-full" overflow="visible">
      <defs>
        <radialGradient id="bp-hg" cx="40%" cy="35%" r="60%">
          <stop offset="0%"  stopColor="#FF8FAB" />
          <stop offset="55%" stopColor="#E63946" />
          <stop offset="100%" stopColor="#9D0208" />
        </radialGradient>
        <radialGradient id="bp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(230,57,70,0.4)" />
          <stop offset="100%" stopColor="rgba(230,57,70,0)" />
        </radialGradient>
        <filter id="bp-blur"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>

      {/* Pulse rings — use scale on <g> instead of animating r directly */}
      {[0, 1, 2].map(i => (
        <motion.g key={i}
          animate={{ scale: [1, 2.6 + i * 0.35], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.65, ease: 'easeOut' }}
          style={{ transformOrigin: '80px 65px' }}>
          <circle cx="80" cy="65" r="22" fill="none" stroke="rgba(230,57,70,0.4)" strokeWidth="1.5" />
        </motion.g>
      ))}

      {/* Glow orb behind heart */}
      <ellipse cx="80" cy="65" rx="45" ry="40" fill="url(#bp-glow)" />

      {/* Heart — 3D shaded */}
      <motion.path
        d="M80,90 C70,80 45,68 45,52 C45,42 52,36 60,36 C66,36 72,40 80,47 C88,40 94,36 100,36 C108,36 115,42 115,52 C115,68 90,80 80,90 Z"
        fill="url(#bp-hg)"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(200,0,50,0.6))' }}
        animate={{ scale: [1, 1.07, 1, 1.04, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        transformOrigin="80px 65px"
      />
      {/* Heart highlight */}
      <path d="M62,47 C64,42 72,38 78,42" fill="none" stroke="rgba(255,220,220,0.5)" strokeWidth="3" strokeLinecap="round"/>

      {/* ECG line through the heart */}
      <motion.polyline
        points="20,65 42,65 50,65 55,48 60,80 65,58 70,65 90,65 95,55 100,75 105,65 140,65"
        fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="200"
        animate={{ strokeDashoffset: [200, 0, -200] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Worth badge */}
      <rect x="100" y="18" width="52" height="24" rx="12" fill="rgba(230,57,70,0.3)" stroke="rgba(255,100,120,0.6)" strokeWidth="1" />
      <text x="126" y="27" textAnchor="middle" fontSize="7.5" fontWeight="700"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(255,200,200,0.9)">WORTH</text>
      <text x="126" y="37" textAnchor="middle" fontSize="9" fontWeight="800"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="#FF8FAB">₹20 FREE</text>

      {/* "BP" label */}
      <text x="80" y="118" textAnchor="middle" fontSize="10" fontWeight="600"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(255,160,160,0.7)" letterSpacing="3">BLOOD PRESSURE</text>
    </svg>
  );
}

function SugarIllustration() {
  // Pre-computed gauge arc
  const gaugeArc = (pct: number) => {
    const a = -210 + pct * 240;
    const r = 34;
    const x = 80 + r * Math.cos(a * Math.PI / 180);
    const y = 75 + r * Math.sin(a * Math.PI / 180);
    return `M80,75 L${x.toFixed(1)},${y.toFixed(1)}`;
  };
  return (
    <svg viewBox="0 0 160 140" className="w-full h-full" overflow="visible">
      <defs>
        <linearGradient id="sg-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#001F3A" />
          <stop offset="100%" stopColor="#00111F" />
        </linearGradient>
        <linearGradient id="sg-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="#00E5FF" />
          <stop offset="60%"  stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#90E0EF" />
        </linearGradient>
        <radialGradient id="sg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(0,229,255,0.3)" />
          <stop offset="100%" stopColor="rgba(0,180,216,0)" />
        </radialGradient>
        <filter id="sg-blur"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="80" cy="70" rx="50" ry="42" fill="url(#sg-glow)" />

      {/* Glucose meter body */}
      <rect x="44" y="22" width="72" height="94" rx="14" fill="rgba(0,20,40,0.8)" stroke="rgba(0,229,255,0.25)" strokeWidth="1.5" />
      <rect x="44" y="22" width="72" height="94" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      {/* Top rim light */}
      <line x1="58" y1="22.5" x2="104" y2="22.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />

      {/* Screen */}
      <rect x="52" y="32" width="56" height="50" rx="8" fill="url(#sg-screen)" />
      <rect x="52" y="32" width="56" height="50" rx="8" fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" />

      {/* Gauge arc track */}
      <path d="M 52,75 A 34,34 0 1 1 108,75" fill="none" stroke="rgba(0,229,255,0.12)" strokeWidth="5" strokeLinecap="round" />
      {/* Gauge arc fill */}
      <motion.path d="M 52,75 A 34,34 0 1 1 108,75" fill="none" stroke="url(#sg-arc)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="107" animate={{ strokeDashoffset: [107, 32, 107] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Reading number */}
      <motion.text x="80" y="60" textAnchor="middle" fontSize="18" fontWeight="800"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="#00E5FF"
        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
        98
      </motion.text>
      <text x="80" y="70" textAnchor="middle" fontSize="7" fontWeight="500"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(0,229,255,0.6)" letterSpacing="1">mg/dL</text>

      {/* Meter bottom buttons */}
      {[58, 80, 102].map((x, i) => (
        <rect key={i} x={x - 7} y="124" width="14" height="6" rx="3" fill="rgba(0,229,255,0.12)" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" />
      ))}

      {/* Blood droplet — right side */}
      <motion.path d="M 124,48 C 124,48 118,58 118,63 C 118,67 121,70 124,70 C 127,70 130,67 130,63 C 130,58 124,48 124,48 Z"
        fill="rgba(200,30,60,0.9)" stroke="rgba(255,100,120,0.5)" strokeWidth="0.5"
        style={{ filter: 'drop-shadow(0 0 6px rgba(200,30,60,0.7))' }}
        animate={{ y: [0, 2, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
      {/* Droplet highlight */}
      <path d="M 122,54 C 122,54 120,58 120,61" fill="none" stroke="rgba(255,200,200,0.5)" strokeWidth="1" strokeLinecap="round"/>

      {/* Worth badge */}
      <rect x="6" y="20" width="52" height="24" rx="12" fill="rgba(0,180,216,0.25)" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
      <text x="32" y="29" textAnchor="middle" fontSize="7.5" fontWeight="700"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(150,240,255,0.9)">WORTH</text>
      <text x="32" y="39" textAnchor="middle" fontSize="9" fontWeight="800"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="#00E5FF">₹30 FREE</text>

      <text x="80" y="118" textAnchor="middle" fontSize="10" fontWeight="600"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(0,229,255,0.55)" letterSpacing="3">BLOOD SUGAR</text>
    </svg>
  );
}

function DeliveryIllustration() {
  return (
    <svg viewBox="0 0 160 140" className="w-full h-full" overflow="visible">
      <defs>
        <linearGradient id="del-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgba(0,200,120,0.0)" />
          <stop offset="100%" stopColor="rgba(0,200,120,0.12)" />
        </linearGradient>
        <linearGradient id="del-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#00F59B" />
          <stop offset="100%" stopColor="#00C896" />
        </linearGradient>
        <radialGradient id="del-glow" cx="50%" cy="80%" r="60%">
          <stop offset="0%"  stopColor="rgba(0,220,140,0.3)" />
          <stop offset="100%" stopColor="rgba(0,200,120,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="80" cy="100" rx="65" ry="22" fill="url(#del-sky)" />
      <ellipse cx="80" cy="90" rx="50" ry="35" fill="url(#del-glow)" />

      {/* Road dots */}
      {[20, 42, 64, 86, 108, 130].map((x, i) => (
        <motion.rect key={i} x={x} y="108" width="14" height="3" rx="1.5"
          fill="rgba(0,229,255,0.25)"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }} />
      ))}

      {/* Scooter group — animated left to right bounce */}
      <motion.g
        animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}>

        {/* Rear wheel */}
        <circle cx="52" cy="103" r="10" fill="none" stroke="rgba(0,229,255,0.5)" strokeWidth="2.5" />
        <motion.circle cx="52" cy="103" r="10" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="8"
          strokeDasharray="3 6" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '52px 103px' }} />
        <circle cx="52" cy="103" r="3" fill="rgba(0,229,255,0.6)" />

        {/* Front wheel */}
        <circle cx="102" cy="103" r="10" fill="none" stroke="rgba(0,229,255,0.5)" strokeWidth="2.5" />
        <motion.circle cx="102" cy="103" r="10" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="8"
          strokeDasharray="3 6" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '102px 103px' }} />
        <circle cx="102" cy="103" r="3" fill="rgba(0,229,255,0.6)" />

        {/* Body frame */}
        <path d="M52,103 L62,80 L90,78 L110,90 L102,103 Z"
          fill="url(#del-body)" stroke="rgba(0,255,160,0.4)" strokeWidth="0.5"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,200,120,0.5))' }} />

        {/* Handlebar */}
        <path d="M102,90 L110,82 L115,84" fill="none" stroke="rgba(0,255,160,0.7)" strokeWidth="2" strokeLinecap="round" />
        {/* Seat/rider simplified */}
        <ellipse cx="78" cy="76" rx="12" ry="5" fill="rgba(0,180,100,0.7)" />

        {/* Package box on back */}
        <rect x="58" y="64" width="22" height="18" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(0,255,160,0.4)" strokeWidth="1" />
        <path d="M58,72 L80,72" stroke="rgba(0,255,160,0.3)" strokeWidth="0.5" />
        <path d="M69,64 L69,82" stroke="rgba(0,255,160,0.3)" strokeWidth="0.5" />
        {/* Cross on package */}
        <path d="M63,68 L75,68 M69,62 L69,74" fill="none" stroke="rgba(255,100,100,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      {/* Speed lines — animate x (CSS translate) not SVG x1 attribute */}
      {[0, 1, 2, 3].map(i => (
        <motion.line key={i}
          x1={35 - i * 8} y1={83 + i * 5}
          x2={10 - i * 5} y2={83 + i * 5}
          stroke="rgba(0,229,255,0.4)" strokeWidth={2 - i * 0.4} strokeLinecap="round"
          animate={{ x: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
        />
      ))}

      {/* House destination */}
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <path d="M130,88 L140,78 L150,88" fill="none" stroke="rgba(0,255,160,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="133" y="88" width="14" height="12" rx="1" fill="rgba(0,200,120,0.2)" stroke="rgba(0,255,160,0.4)" strokeWidth="1" />
        <rect x="137" y="94" width="6" height="6" rx="1" fill="rgba(0,229,255,0.3)" />
        <motion.circle cx="140" cy="68" r="3" fill="rgba(0,255,160,0.8)"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.g>

      <text x="80" y="130" textAnchor="middle" fontSize="10" fontWeight="600"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="rgba(0,229,255,0.55)" letterSpacing="2">HOME DELIVERY</text>
    </svg>
  );
}

function HoursIllustration() {
  // Clock hand angles (pre-computed)
  const H_HAND = { x2: 80 + 16 * Math.sin(300 * Math.PI / 180), y2: 65 - 16 * Math.cos(300 * Math.PI / 180) };
  const M_HAND = { x2: 80 + 24 * Math.sin(0),                   y2: 65 - 24 };

  return (
    <svg viewBox="0 0 160 140" className="w-full h-full" overflow="visible">
      <defs>
        <radialGradient id="hr-face" cx="50%" cy="45%" r="55%">
          <stop offset="0%"  stopColor="rgba(255,220,80,0.18)" />
          <stop offset="100%" stopColor="rgba(255,160,0,0)" />
        </radialGradient>
        <linearGradient id="hr-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#FFE566" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <filter id="hr-glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="80" cy="65" r="50" fill="url(#hr-face)" />

      {/* Outer decorative ring */}
      <circle cx="80" cy="65" r="42" fill="none" stroke="rgba(255,200,0,0.12)" strokeWidth="1" />
      <circle cx="80" cy="65" r="46" fill="none" stroke="rgba(255,200,0,0.06)" strokeWidth="0.5" />

      {/* Clock face */}
      <circle cx="80" cy="65" r="36" fill="rgba(5,8,22,0.7)" stroke="none" />
      <circle cx="80" cy="65" r="36" fill="none" stroke="url(#hr-ring)" strokeWidth="2.5"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,200,0,0.5))' }} />
      {/* Glass highlight */}
      <path d="M 56,50 A 36,36 0 0 1 104,50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />

      {/* Hour markers */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = i * 30 * Math.PI / 180;
        const r1 = 30, r2 = i % 3 === 0 ? 24 : 27;
        return (
          <line key={i}
            x1={80 + r1 * Math.sin(a)} y1={65 - r1 * Math.cos(a)}
            x2={80 + r2 * Math.sin(a)} y2={65 - r2 * Math.cos(a)}
            stroke={i % 3 === 0 ? 'rgba(255,215,0,0.8)' : 'rgba(255,200,0,0.35)'}
            strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round"
          />
        );
      })}

      {/* Hour hand */}
      <motion.line x1="80" y1="65" x2={H_HAND.x2} y2={H_HAND.y2}
        stroke="#FFD700" strokeWidth="3" strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.6))' }}
        animate={{ rotate: 360 }} transition={{ duration: 43200, repeat: Infinity, ease: 'linear' }}
        transformOrigin="80px 65px" />
      {/* Minute hand */}
      <motion.line x1="80" y1="65" x2={M_HAND.x2} y2={M_HAND.y2}
        stroke="#FFE566" strokeWidth="2" strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,229,102,0.6))' }}
        animate={{ rotate: 360 }} transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }}
        transformOrigin="80px 65px" />
      {/* Centre dot */}
      <circle cx="80" cy="65" r="3.5" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' }} />

      {/* "8AM – 11PM" arc badge */}
      <rect x="42" y="108" width="76" height="20" rx="10"
        fill="rgba(255,160,0,0.18)" stroke="rgba(255,200,0,0.45)" strokeWidth="1" />
      <text x="80" y="122" textAnchor="middle" fontSize="10" fontWeight="700"
        fontFamily="'Plus Jakarta Sans', sans-serif" fill="#FFD700" letterSpacing="0.5">8 AM – 11 PM</text>

      {/* Stars */}
      {[[18,22],[138,28],[28,92],[148,95]].map(([x,y], i) => (
        <motion.polygon key={i}
          points={`${x},${y-5} ${x+1.5},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2.5} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.5},${y-1.5}`}
          fill="rgba(255,215,0,0.6)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

// ─── Card data ─────────────────────────────────────────────────────────────────

const TILES = [
  {
    headline: '20% OFF',
    detail:   'On All Medicines',
    sub:      'Every purchase, every day',
    accent:   '#FFB800',
    glow:     'rgba(255,180,0,0.22)',
    border:   'rgba(255,200,60,0.22)',
    bg:       'linear-gradient(145deg, rgba(255,170,0,0.13) 0%, rgba(255,100,0,0.06) 100%)',
    shine:    'rgba(255,210,100,0.18)',
    Illustration: EnergyCrystalIllustration,
  },
  {
    headline: 'FREE BP Check',
    detail:   'Every Sunday',
    sub:      'Worth ₹20 — no appointment needed',
    accent:   '#FF4D6D',
    glow:     'rgba(230,57,70,0.22)',
    border:   'rgba(255,100,130,0.22)',
    bg:       'linear-gradient(145deg, rgba(230,57,70,0.13) 0%, rgba(150,0,40,0.06) 100%)',
    shine:    'rgba(255,160,180,0.15)',
    Illustration: BPIllustration,
  },
  {
    headline: 'FREE Sugar Check',
    detail:   'Every Sunday',
    sub:      'Worth ₹30 — walk in anytime',
    accent:   '#00E5FF',
    glow:     'rgba(0,229,255,0.2)',
    border:   'rgba(0,200,255,0.2)',
    bg:       'linear-gradient(145deg, rgba(0,180,220,0.12) 0%, rgba(0,80,120,0.06) 100%)',
    shine:    'rgba(100,240,255,0.14)',
    Illustration: SugarIllustration,
  },
  {
    headline: 'FREE Delivery',
    detail:   'To Your Door',
    sub:      'Right to your doorstep',
    accent:   '#00F59B',
    glow:     'rgba(0,220,140,0.2)',
    border:   'rgba(0,255,160,0.2)',
    bg:       'linear-gradient(145deg, rgba(0,200,130,0.12) 0%, rgba(0,80,60,0.06) 100%)',
    shine:    'rgba(100,255,200,0.13)',
    Illustration: DeliveryIllustration,
  },
  {
    headline: 'Open Daily',
    detail:   '8 AM – 11 PM',
    sub:      '365 days a year, no holidays',
    accent:   '#FFD700',
    glow:     'rgba(255,210,0,0.2)',
    border:   'rgba(255,210,0,0.22)',
    bg:       'linear-gradient(145deg, rgba(255,180,0,0.13) 0%, rgba(180,80,0,0.06) 100%)',
    shine:    'rgba(255,235,130,0.16)',
    Illustration: HoursIllustration,
  },
];

// ─── Tile component ────────────────────────────────────────────────────────────

function GlassTile({ tile, index, active }: { tile: typeof TILES[0]; index: number; active?: boolean }) {
  const f = FLOAT[index];
  const particles = CARD_PARTICLES[index];
  const { Illustration } = tile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -14, scale: 1.025, transition: { duration: 0.3, ease: 'easeOut' } }}
      animate={{ y: f.y, transition: { duration: f.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: index * 0.8 } }}
      className="relative rounded-[28px] overflow-hidden flex flex-col cursor-default"
      style={{
        minHeight: 320,
        background: tile.bg,
        border: `1px solid ${tile.border}`,
        borderTop: `1px solid rgba(255,255,255,0.22)`,
        boxShadow: [
          `0 24px 64px rgba(0,0,0,0.45)`,
          `0 0 0 1px rgba(255,255,255,0.04)`,
          `inset 0 1px 0 rgba(255,255,255,0.22)`,
          `inset 0 -1px 0 rgba(0,0,0,0.25)`,
          `0 0 60px ${tile.glow}`,
        ].join(', '),
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        opacity: active === false ? 0.55 : 1,
        transform: active === false ? 'scale(0.95)' : undefined,
      }}
    >
      {/* Glass shine refraction at top */}
      <div className="absolute top-0 left-0 right-0 h-[45%] rounded-t-[28px] pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${tile.shine} 0%, transparent 100%)` }} />

      {/* Micro sparkles in bg */}
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: tile.accent, opacity: 0.08,
          }}
          animate={{ opacity: [0.04, 0.22, 0.04] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del }}
        />
      ))}

      {/* Accent glow blob behind illustration */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '70%', height: '55%', background: `radial-gradient(ellipse, ${tile.glow} 0%, transparent 70%)`, filter: 'blur(20px)' }} />

      {/* Illustration */}
      <div className="relative flex-1 flex items-center justify-center px-4 pt-6" style={{ minHeight: 172 }}>
        <div className="w-full h-[152px]">
          <Illustration />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px" style={{ background: `linear-gradient(to right, transparent, ${tile.border} 30%, ${tile.border} 70%, transparent)` }} />

      {/* Text content */}
      <div className="px-6 py-5">
        <p className="text-[17px] font-bold text-white leading-tight tracking-tight">{tile.headline}</p>
        <p className="text-[15px] font-semibold mt-0.5" style={{ color: tile.accent }}>{tile.detail}</p>
        <p className="text-[12px] text-white/40 mt-1.5 leading-snug">{tile.sub}</p>
      </div>

      {/* Bottom corner accent dot */}
      <div className="absolute bottom-4 right-5 w-2 h-2 rounded-full"
        style={{ background: tile.accent, boxShadow: `0 0 8px ${tile.accent}`, opacity: 0.6 }} />
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function TrustSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const c = (child as HTMLElement).offsetLeft + (child as HTMLElement).clientWidth / 2;
        const d = Math.abs(center - c);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveIndex(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="py-24 w-full relative">
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 px-4"
        >
          <p className="text-xs font-semibold tracking-[0.35em] text-white/35 uppercase mb-3">Exclusive Benefits</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">CARE ONE?</span>
          </h2>
        </motion.div>

        {/* ── Mobile: horizontal snap-scroll carousel ── */}
        <div
          ref={scrollRef}
          className="md:hidden flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6 gap-4 px-[6vw]"
        >
          {TILES.map((tile, i) => (
            <div key={i} className="snap-center shrink-0 w-[78vw] max-w-[290px]">
              <GlassTile tile={tile} index={i} active={activeIndex === i} />
            </div>
          ))}
        </div>

        {/* Dot indicators — mobile only */}
        <div className="md:hidden flex justify-center gap-2 mt-4 mb-2">
          {TILES.map((_, i) => (
            <motion.div key={i}
              animate={{ width: activeIndex === i ? 24 : 8, opacity: activeIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
              className="h-1.5 rounded-full"
              style={{ background: activeIndex === i ? TILES[activeIndex].accent : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        {/* ── Desktop: 3 + 2 centred grid ── */}
        <div className="hidden md:block px-8">
          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {TILES.slice(0, 3).map((tile, i) => (
              <GlassTile key={i} tile={tile} index={i} />
            ))}
          </div>
          {/* Row 2 — 2 cards centred */}
          <div className="flex justify-center gap-6">
            {TILES.slice(3).map((tile, i) => (
              <div key={i} className="w-full max-w-[calc(33.333%-12px)]">
                <GlassTile tile={tile} index={i + 3} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
