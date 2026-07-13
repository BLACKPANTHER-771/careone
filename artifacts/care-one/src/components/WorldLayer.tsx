/**
 * WorldLayer — absolute, full page-height environment layer (z-0).
 * Sits as first child of MainLayout so it stretches to the full
 * document height. Every section gets zone-specific ambient elements
 * so the background is never empty during scroll.
 *
 * Sections (approximate vh positions):
 *   Hero        0 – 110vh
 *   Trust     110 – 270vh
 *   Services  270 – 450vh
 *   Offer     450 – 590vh
 *   Health    590 – 730vh
 *   Delivery  730 – 870vh
 *   Location  870 – 1010vh
 *   Contact  1010 – 1160vh
 */

import { motion } from 'framer-motion';

// ─── ALL constants pre-computed at module level (no Math.random in render) ───

// 100 micro-particles spread across the full page height
const MICRO_PARTICLES = Array.from({ length: 100 }, (_, i) => ({
  top:   `${(i * 11.7) % 1150}vh`,
  left:  `${2 + (i * 37) % 96}%`,
  size:  i % 7 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
  color: i % 9 === 0 ? 'rgba(255,215,0,0.55)'
       : i % 5 === 0 ? 'rgba(0,229,255,0.5)'
       : i % 3 === 0 ? 'rgba(100,180,255,0.45)'
       : 'rgba(255,255,255,0.25)',
  dur:   5 + (i % 8),
  del:   (i % 12) * 0.4,
  rise:  30 + (i % 5) * 12,
}));

// 12 diagonal energy lines (glowing beams at angles)
const ENERGY_LINES = [
  { top: '5vh',   left: '8%',  w: 300, rot: -25, color: 'rgba(41,121,255,0.07)',  dur: 8,  del: 0   },
  { top: '15vh',  left: '72%', w: 220, rot:  18, color: 'rgba(0,229,255,0.05)',   dur: 10, del: 3   },
  { top: '120vh', left: '5%',  w: 350, rot: -18, color: 'rgba(41,121,255,0.06)',  dur: 9,  del: 1   },
  { top: '160vh', left: '65%', w: 280, rot:  22, color: 'rgba(100,200,255,0.05)', dur: 12, del: 5   },
  { top: '290vh', left: '10%', w: 400, rot: -30, color: 'rgba(41,121,255,0.07)',  dur: 11, del: 2   },
  { top: '320vh', left: '60%', w: 260, rot:  15, color: 'rgba(0,229,255,0.05)',   dur: 7,  del: 4   },
  { top: '470vh', left: '3%',  w: 320, rot: -20, color: 'rgba(200,160,60,0.06)',  dur: 10, del: 6   },
  { top: '510vh', left: '75%', w: 240, rot:  28, color: 'rgba(200,160,60,0.05)',  dur: 9,  del: 1.5 },
  { top: '630vh', left: '8%',  w: 360, rot: -15, color: 'rgba(0,200,150,0.05)',   dur: 13, del: 3   },
  { top: '760vh', left: '62%', w: 300, rot:  20, color: 'rgba(41,121,255,0.06)',  dur: 8,  del: 0.5 },
  { top: '900vh', left: '4%',  w: 420, rot: -22, color: 'rgba(0,229,255,0.06)',   dur: 11, del: 4   },
  { top: '1050vh',left: '68%', w: 280, rot:  16, color: 'rgba(255,215,0,0.05)',   dur: 9,  del: 2   },
];

// 9 large holographic rings at section transitions
const HOLO_RINGS = [
  { top: '80vh',  left: '50%',  size: '70vw',  color: 'rgba(41,121,255,0.045)', bw: '1px',  dur: 12, del: 0   },
  { top: '200vh', left: '20%',  size: '55vw',  color: 'rgba(0,229,255,0.035)',  bw: '1px',  dur: 15, del: 3   },
  { top: '250vh', left: '80%',  size: '40vw',  color: 'rgba(41,121,255,0.04)',  bw: '0.5px',dur: 11, del: 6   },
  { top: '380vh', left: '50%',  size: '65vw',  color: 'rgba(100,60,220,0.04)',  bw: '1px',  dur: 18, del: 2   },
  { top: '510vh', left: '25%',  size: '50vw',  color: 'rgba(200,160,60,0.045)',bw: '1px',  dur: 14, del: 5   },
  { top: '650vh', left: '75%',  size: '45vw',  color: 'rgba(0,200,150,0.04)',   bw: '0.5px',dur: 13, del: 1   },
  { top: '780vh', left: '50%',  size: '60vw',  color: 'rgba(41,121,255,0.04)',  bw: '1px',  dur: 16, del: 4   },
  { top: '920vh', left: '30%',  size: '55vw',  color: 'rgba(0,229,255,0.04)',   bw: '1px',  dur: 10, del: 7   },
  { top: '1080vh',left: '60%',  size: '65vw',  color: 'rgba(255,215,0,0.04)',   bw: '1px',  dur: 17, del: 3   },
];

// Section atmospheric orbs (large blurred radial gradients)
const ATMO_ORBS = [
  { top: '55vh',  left: '10%',  w: '60vw', h: '50vh', color: 'rgba(41,121,255,0.09)',  dur: 18, del: 0   },
  { top: '170vh', left: '60%',  w: '55vw', h: '45vh', color: 'rgba(0,180,220,0.07)',   dur: 22, del: 5   },
  { top: '360vh', left: '15%',  w: '65vw', h: '55vh', color: 'rgba(41,121,255,0.08)',  dur: 16, del: 2   },
  { top: '490vh', left: '55%',  w: '50vw', h: '40vh', color: 'rgba(180,130,40,0.07)',  dur: 20, del: 8   },
  { top: '640vh', left: '20%',  w: '60vw', h: '50vh', color: 'rgba(0,180,130,0.07)',   dur: 24, del: 4   },
  { top: '790vh', left: '50%',  w: '70vw', h: '60vh', color: 'rgba(41,121,255,0.08)',  dur: 15, del: 6   },
  { top: '940vh', left: '10%',  w: '55vw', h: '45vh', color: 'rgba(0,200,220,0.07)',   dur: 19, del: 3   },
  { top: '1080vh',left: '40%',  w: '65vw', h: '55vh', color: 'rgba(255,200,50,0.06)',  dur: 21, del: 7   },
];

// Fog bands (horizontal translucent panels)
const FOG_BANDS = [
  { top: '95vh',   opacity: 0.18 },
  { top: '255vh',  opacity: 0.14 },
  { top: '445vh',  opacity: 0.16 },
  { top: '580vh',  opacity: 0.13 },
  { top: '720vh',  opacity: 0.15 },
  { top: '860vh',  opacity: 0.14 },
  { top: '1005vh', opacity: 0.17 },
  { top: '1150vh', opacity: 0.20 },
];

// ── ZONE: TRUST — horizontal scan lines ──────────────────────────────────────
const TRUST_SCAN_LINES = [
  { top: '135vh', color: 'rgba(0,229,255,0.06)', dur: 5,  del: 0   },
  { top: '175vh', color: 'rgba(41,121,255,0.05)',dur: 7,  del: 2   },
  { top: '220vh', color: 'rgba(0,229,255,0.05)', dur: 6,  del: 4   },
];

// ── ZONE: SERVICES — vertical data stream columns ────────────────────────────
const DATA_STREAMS = Array.from({ length: 16 }, (_, i) => ({
  left:  `${5 + i * 6}%`,
  top:   `${280 + (i % 4) * 30}vh`,
  count: 4 + (i % 3),
  color: i % 3 === 0 ? 'rgba(0,229,255,0.5)' : i % 2 === 0 ? 'rgba(41,121,255,0.45)' : 'rgba(100,200,255,0.35)',
  dur:   2 + (i % 4),
  del:   (i % 6) * 0.3,
}));

// ── ZONE: OFFER — orbiting gold particles ─────────────────────────────────────
const GOLD_ORBITERS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const r = 35 + (i % 3) * 18;
  return { rx: Math.cos(a) * r, ry: Math.sin(a) * r * 0.4, dur: 6 + (i % 4), del: (i % 8) * 0.35 };
});

// ── ZONE: HEALTH — ECG path ───────────────────────────────────────────────────
const ECG_D = 'M 0,50 L 80,50 L 90,15 L 100,85 L 110,50 L 200,50 L 210,30 L 220,70 L 230,50 L 320,50 L 330,20 L 340,80 L 350,50 L 440,50 L 450,25 L 460,75 L 470,50 L 560,50';

// ── ZONE: LOCATION — radar rings ─────────────────────────────────────────────
const RADAR_RINGS = [
  { size: '20vw', dur: 4,  del: 0   },
  { size: '35vw', dur: 4,  del: 1.3 },
  { size: '50vw', dur: 4,  del: 2.6 },
  { size: '65vw', dur: 4,  del: 0.7 },
];

// ── ZONE: CONTACT — convergence particles ────────────────────────────────────
const CONVERGE_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const a = (i / 30) * Math.PI * 2;
  const r = 80 + (i % 5) * 30;
  return {
    sx: Math.cos(a) * r,
    sy: Math.sin(a) * r,
    color: i % 3 === 0 ? 'rgba(255,215,0,0.6)' : 'rgba(41,121,255,0.5)',
    dur: 3 + (i % 4),
    del: (i % 8) * 0.25,
  };
});

// ─────────────────────────────────────────────────────────────────────────────

export default function WorldLayer() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* ══════════════════════════════════════════════════════════════
          CONTINUOUS: Elements distributed across the full page height
         ══════════════════════════════════════════════════════════════ */}

      {/* Micro-particle field */}
      {MICRO_PARTICLES.map((p, i) => (
        <motion.div
          key={`mp-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{ y: [0, -p.rise, 0], opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
        />
      ))}

      {/* Diagonal energy lines */}
      {ENERGY_LINES.map((l, i) => (
        <motion.div
          key={`el-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: l.top, left: l.left,
            width: l.w, height: 1,
            transform: `rotate(${l.rot}deg)`,
            transformOrigin: 'left center',
            background: `linear-gradient(to right, transparent, ${l.color} 20%, ${l.color} 80%, transparent)`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: l.dur, repeat: Infinity, ease: 'easeInOut', delay: l.del }}
        />
      ))}

      {/* Holographic rings */}
      {HOLO_RINGS.map((r, i) => (
        <motion.div
          key={`hr-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: r.top, left: r.left,
            width: r.size, height: r.size,
            transform: 'translate(-50%, -50%)',
            border: `${r.bw} solid ${r.color}`,
            boxShadow: `0 0 30px ${r.color.replace(')', ', 0.5)').replace('rgba', 'rgba')}`,
          }}
          animate={{ scale: [0.95, 1.04, 0.95], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeInOut', delay: r.del }}
        />
      ))}

      {/* Atmospheric zone orbs */}
      {ATMO_ORBS.map((o, i) => (
        <motion.div
          key={`ao-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: o.top, left: o.left,
            width: o.w, height: o.h,
            background: `radial-gradient(ellipse, ${o.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], x: [0, 20, -10, 0], y: [0, -15, 8, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: o.del }}
        />
      ))}

      {/* Fog bands at section transitions */}
      {FOG_BANDS.map((f, i) => (
        <div
          key={`fog-${i}`}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: f.top, height: '8vh',
            background: `linear-gradient(to bottom, transparent, rgba(5,8,22,${f.opacity}) 50%, transparent)`,
          }}
        />
      ))}

      {/* Repeating full-page subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(41,121,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(41,121,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />


      {/* ══════════════════════════════════════════════════════════════
          ZONE: HERO  (0 – 110vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Dome wall SVG arcs */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: 0, left: 0, width: '100%', height: '110vh' }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path d="M -3,0 Q 22,50 -3,100"    fill="none" stroke="rgba(41,121,255,0.09)" strokeWidth="0.3" />
        <path d="M  4,0 Q 26,50  4,100"    fill="none" stroke="rgba(41,121,255,0.05)" strokeWidth="0.15" />
        <path d="M 103,0 Q 78,50 103,100"  fill="none" stroke="rgba(41,121,255,0.09)" strokeWidth="0.3" />
        <path d="M  96,0 Q 74,50  96,100"  fill="none" stroke="rgba(41,121,255,0.05)" strokeWidth="0.15" />
        <path d="M 0,0 Q 50,-12 100,0"     fill="none" stroke="rgba(41,121,255,0.07)" strokeWidth="0.2" />
        {/* Perspective floor grid lines converging */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
          <line key={`hfg-${i}`} x1={x} y1="100" x2="50" y2="70" stroke="rgba(41,121,255,0.035)" strokeWidth="0.08" />
        ))}
        {[76, 84, 92].map((y, i) => (
          <line key={`hfh-${i}`} x1="5" y1={y} x2="95" y2={y} stroke="rgba(41,121,255,0.03)" strokeWidth="0.07" />
        ))}
      </svg>

      {/* Hero light shafts */}
      {[
        { left: '12%', w: '110px', rot: '-22deg', color: 'rgba(41,121,255,0.06)',  dur: 9,  del: 0   },
        { left: '46%', w: '180px', rot:   '0deg', color: 'rgba(0,229,255,0.045)', dur: 11, del: 3   },
        { left: '76%', w: '90px',  rot:  '20deg', color: 'rgba(41,121,255,0.055)',dur: 8,  del: 1.5 },
      ].map((s, i) => (
        <motion.div
          key={`hls-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: 0, left: s.left, width: s.w, height: '75vh',
            transform: `rotate(${s.rot})`, transformOrigin: 'top center',
            background: `linear-gradient(to bottom, ${s.color} 0%, transparent 100%)`,
          }}
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [1, 1.15, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.del }}
        />
      ))}


      {/* ══════════════════════════════════════════════════════════════
          ZONE: TRUST  (110 – 270vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Horizontal scan-pulse lines */}
      {TRUST_SCAN_LINES.map((l, i) => (
        <motion.div
          key={`tsl-${i}`}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: l.top, background: `linear-gradient(to right, transparent, ${l.color} 30%, ${l.color} 70%, transparent)` }}
          animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: l.dur, repeat: Infinity, ease: 'easeInOut', delay: l.del }}
        />
      ))}

      {/* Trust zone glass panels */}
      {[
        { top: '125vh', left: '2%',  w: '22vw', h: '18vh', rot: '-2deg', del: 0 },
        { top: '185vh', right: '3%', w: '18vw', h: '22vh', rot:  '3deg', del: 1.5 },
        { top: '230vh', left: '4%',  w: '20vw', h: '16vh', rot: '-1deg', del: 3 },
      ].map((p, i) => (
        <motion.div
          key={`tgp-${i}`}
          className="absolute hidden md:block pointer-events-none"
          style={{
            top: p.top,
            ...(p.left  ? { left:  p.left  } : {}),
            ...(p.right ? { right: p.right } : {}),
            width: p.w, height: p.h,
            transform: `rotate(${p.rot})`,
            background: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(41,121,255,0.04) 100%)',
            border: '1px solid rgba(0,229,255,0.07)',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
          }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
        />
      ))}


      {/* ══════════════════════════════════════════════════════════════
          ZONE: SERVICES  (270 – 450vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Vertical data stream columns */}
      {DATA_STREAMS.map((s, i) => (
        <div key={`ds-${i}`} className="absolute hidden md:block pointer-events-none" style={{ top: s.top, left: s.left }}>
          {Array.from({ length: s.count }, (_, j) => (
            <motion.div
              key={`dsd-${i}-${j}`}
              className="absolute rounded-full"
              style={{ width: 2.5, height: 2.5, background: s.color, boxShadow: `0 0 6px ${s.color}` }}
              animate={{ y: [0, `${20 + j * 8}vh`, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: s.dur, repeat: Infinity, ease: 'linear', delay: s.del + j * 0.5 }}
            />
          ))}
        </div>
      ))}

      {/* Services matrix grid overlay */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '275vh', height: '170vh',
          backgroundImage: `
            linear-gradient(rgba(41,121,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(41,121,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      />

      {/* Services electric pulse rings */}
      {[
        { top: '310vh', left: '15%',  size: '30vw', color: 'rgba(41,121,255,0.06)',  dur: 5,  del: 0 },
        { top: '390vh', left: '70%',  size: '25vw', color: 'rgba(0,229,255,0.055)',  dur: 6,  del: 2 },
        { top: '420vh', left: '40%',  size: '20vw', color: 'rgba(100,60,220,0.05)',  dur: 7,  del: 4 },
      ].map((r, i) => (
        <motion.div
          key={`spr-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: r.top, left: r.left,
            width: r.size, height: r.size,
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${r.color}`,
          }}
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeOut', delay: r.del }}
        />
      ))}


      {/* ══════════════════════════════════════════════════════════════
          ZONE: OFFER  (450 – 590vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Golden diagonal beams */}
      {[
        { top: '460vh', left: '5%',  w: 400, rot: -18, dur: 10, del: 0   },
        { top: '500vh', left: '55%', w: 300, rot:  22, dur: 12, del: 3   },
        { top: '540vh', left: '25%', w: 350, rot: -10, dur: 8,  del: 6   },
      ].map((b, i) => (
        <motion.div
          key={`gb-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: b.top, left: b.left,
            width: b.w, height: 1.5,
            transform: `rotate(${b.rot}deg)`, transformOrigin: 'left center',
            background: 'linear-gradient(to right, transparent, rgba(200,160,60,0.1) 30%, rgba(200,160,60,0.08) 70%, transparent)',
          }}
          animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.7, 1.15, 0.7] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.del }}
        />
      ))}

      {/* Gold orbiting ring of particles */}
      <div className="absolute pointer-events-none" style={{ top: '510vh', left: '50%', transform: 'translateX(-50%)' }}>
        {GOLD_ORBITERS.map((p, i) => (
          <motion.div
            key={`go-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: 'rgba(200,160,60,0.55)', boxShadow: '0 0 8px rgba(200,160,60,0.4)' }}
            animate={{ x: [p.rx, -p.rx, p.rx], y: [p.ry, -p.ry, p.ry] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
          />
        ))}
      </div>


      {/* ══════════════════════════════════════════════════════════════
          ZONE: HEALTH  (590 – 730vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* ECG sine wave */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: '640vh', left: 0, width: '100%', height: '80px', opacity: 0.2 }}
        viewBox="0 0 560 100" preserveAspectRatio="none"
      >
        <motion.path
          d={ECG_D}
          fill="none" stroke="rgba(0,229,200,0.8)" strokeWidth="2"
          strokeDasharray="600"
          animate={{ strokeDashoffset: [600, 0, -600] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Secondary ECG wave (offset) */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: '680vh', left: 0, width: '100%', height: '60px', opacity: 0.12 }}
        viewBox="0 0 560 100" preserveAspectRatio="none"
      >
        <motion.path
          d={ECG_D}
          fill="none" stroke="rgba(0,229,200,0.7)" strokeWidth="1.5"
          strokeDasharray="600"
          animate={{ strokeDashoffset: [0, -600] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Health zone glass panels */}
      {[
        { top: '600vh', left: '2%',  w: '20vw', h: '20vh', color: 'rgba(0,200,150,0.04)' },
        { top: '660vh', right: '2%', w: '18vw', h: '16vh', color: 'rgba(0,200,150,0.035)' },
      ].map((p, i) => (
        <motion.div
          key={`hgp-${i}`}
          className="absolute hidden md:block pointer-events-none"
          style={{
            top: p.top,
            ...(p.left  ? { left:  p.left  } : {}),
            ...(p.right ? { right: p.right } : {}),
            width: p.w, height: p.h,
            background: `linear-gradient(135deg, ${p.color} 0%, rgba(0,180,130,0.025) 100%)`,
            border: '1px solid rgba(0,200,150,0.08)', borderRadius: '12px',
          }}
          animate={{ y: [0, -8, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 9 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}


      {/* ══════════════════════════════════════════════════════════════
          ZONE: DELIVERY  (730 – 870vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Delivery perspective city grid */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '810vh', width: '130vw', height: '60vh',
          perspective: '500px',
          transform: 'translateX(-50%) rotateX(70deg)',
        }}
      >
        <div
          style={{
            width: '100%', height: '100%',
            backgroundImage: `
              linear-gradient(rgba(41,121,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(41,121,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Delivery flow beam */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '800vh', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: 2 }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.15) 20%, rgba(0,229,255,0.3) 50%, rgba(0,229,255,0.15) 80%, transparent)' }} />
      </motion.div>

      {/* Moving delivery light dot */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '799vh', width: 8, height: 8,
          background: 'rgba(0,229,255,0.9)',
          boxShadow: '0 0 20px rgba(0,229,255,0.8)',
        }}
        animate={{ left: ['10%', '90%', '10%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />


      {/* ══════════════════════════════════════════════════════════════
          ZONE: LOCATION  (870 – 1010vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Radar rings */}
      {RADAR_RINGS.map((r, i) => (
        <motion.div
          key={`rr-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '935vh', left: '50%',
            width: r.size, height: r.size,
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,229,255,0.12)',
          }}
          animate={{ scale: [0.4, 1.2], opacity: [0.7, 0] }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeOut', delay: r.del }}
        />
      ))}

      {/* Location coordinate grid */}
      <svg
        className="absolute pointer-events-none"
        style={{ top: '875vh', left: 0, width: '100%', height: '130vh', opacity: 0.07 }}
        viewBox="0 0 100 100" preserveAspectRatio="none"
      >
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v, i) => (
          <g key={`lcg-${i}`}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(0,229,255,1)" strokeWidth="0.2" />
            <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(0,229,255,1)" strokeWidth="0.2" />
          </g>
        ))}
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0,229,255,1)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,229,255,1)" strokeWidth="0.2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(0,229,255,1)" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(0,229,255,1)" strokeWidth="0.5" />
      </svg>


      {/* ══════════════════════════════════════════════════════════════
          ZONE: CONTACT + FOOTER  (1010 – 1160vh)
         ══════════════════════════════════════════════════════════════ */}

      {/* Concentric pulse rings expanding from contact center */}
      {[
        { size: '25vw', dur: 5,  del: 0   },
        { size: '45vw', dur: 5,  del: 1.7 },
        { size: '65vw', dur: 5,  del: 3.4 },
        { size: '85vw', dur: 5,  del: 0.8 },
      ].map((r, i) => (
        <motion.div
          key={`cpr-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '1070vh', left: '50%',
            width: r.size, height: r.size,
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(41,121,255,0.1)',
          }}
          animate={{ scale: [0.5, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeOut', delay: r.del }}
        />
      ))}

      {/* Convergence particles flowing toward contact center */}
      <div className="absolute pointer-events-none" style={{ top: '1070vh', left: '50%', transform: 'translateX(-50%)' }}>
        {CONVERGE_PARTICLES.map((p, i) => (
          <motion.div
            key={`cp-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: p.color, boxShadow: `0 0 5px ${p.color}` }}
            animate={{ x: [p.sx, 0, p.sx], y: [p.sy, 0, p.sy], opacity: [0, 0.9, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
          />
        ))}
      </div>

      {/* Footer warm gradient */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '1120vh', height: '60vh',
          background: 'linear-gradient(to bottom, transparent, rgba(41,121,255,0.07) 40%, rgba(200,160,60,0.04) 80%, transparent)',
        }}
      />

    </div>
  );
}
