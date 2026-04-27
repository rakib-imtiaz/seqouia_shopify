// Editorial feature card — color rotation + invert-on-hover + reveal panel
// + cursor spotlight + corner ornament + hairline frame draw.
import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const PALETTE = ["bg-bone", "bg-cream", "bg-paper"];

// SVG corner ornaments — one per card, varied for visual rhythm.
const ORNAMENTS = [
  // 0: top-right bracket
  (
    <svg key="0" viewBox="0 0 80 80" className="absolute top-5 right-5 w-14 h-14 stroke-copper/55 group-hover:stroke-copper transition-colors duration-500" fill="none" strokeWidth="0.6">
      <path d="M30 4 H76 V50" />
      <circle cx="76" cy="4" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 1: bottom-left dot grid
  (
    <svg key="1" viewBox="0 0 80 80" className="absolute bottom-20 left-5 w-14 h-14 fill-copper/45 group-hover:fill-copper transition-colors duration-500" stroke="none">
      {[0, 12, 24].map((y) => [0, 12, 24].map((x) => <circle key={`${x}-${y}`} cx={x + 4} cy={y + 4} r="1" />))}
    </svg>
  ),
  // 2: top-left diagonal hairline
  (
    <svg key="2" viewBox="0 0 80 80" className="absolute top-5 left-5 w-16 h-16 stroke-copper/55 group-hover:stroke-copper transition-colors duration-500" fill="none" strokeWidth="0.6">
      <path d="M0 28 L28 0" />
      <path d="M0 38 L38 0" />
      <path d="M0 48 L48 0" />
    </svg>
  ),
  // 3: top-right triangle
  (
    <svg key="3" viewBox="0 0 80 80" className="absolute top-5 right-5 w-14 h-14 stroke-copper/55 group-hover:stroke-copper transition-colors duration-500" fill="none" strokeWidth="0.6">
      <path d="M40 4 L76 40 L40 40 Z" />
    </svg>
  ),
  // 4: bottom-right ring
  (
    <svg key="4" viewBox="0 0 80 80" className="absolute bottom-20 right-5 w-14 h-14 stroke-copper/55 group-hover:stroke-copper transition-colors duration-500" fill="none" strokeWidth="0.6">
      <circle cx="50" cy="50" r="22" />
      <circle cx="50" cy="50" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 5: top-right horizontal lines
  (
    <svg key="5" viewBox="0 0 80 80" className="absolute top-5 right-5 w-16 h-12 stroke-copper/55 group-hover:stroke-copper transition-colors duration-500" fill="none" strokeWidth="0.6">
      <path d="M30 8 H76" />
      <path d="M40 18 H76" />
      <path d="M50 28 H76" />
      <path d="M60 38 H76" />
    </svg>
  ),
];

// Per-card hidden detail revealed on hover — quick stat / promise / keyword
const REVEAL_STATS = [
  { stat: "0 g", label: "CO₂/hr emissions" },
  { stat: "Same day", label: "License turnaround" },
  { stat: "On request", label: "Trip planning" },
  { stat: "$0", label: "Delivery to popular lakes" },
  { stat: "Premium", label: "Life jackets included" },
  { stat: "< 60s", label: "Booking flow" },
];

export default function FeatureCard({ feature, index, IconComp }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const bg = PALETTE[index % PALETTE.length];
  const reveal = REVEAL_STATS[index % REVEAL_STATS.length];

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -6 }}
      className={`group relative ${bg} hover:bg-ink p-10 md:p-12 pb-24 md:pb-28 overflow-hidden transition-colors duration-500`}
    >
      {/* Cursor-tracked spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(181,104,59,0.22), transparent 55%)`,
        }}
      />

      {/* Corner ornament */}
      {ORNAMENTS[index % ORNAMENTS.length]}

      {/* Hairline frame — top + bottom draw on hover */}
      <span aria-hidden className="pointer-events-none absolute top-0 left-0 h-px bg-copper origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-px bg-copper origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] w-full" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-10">
          <div className="relative">
            <span className="numeral text-[13px] tracking-widest tnum text-copper">
              N°{String(index + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px bg-copper origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 w-full"
            />
          </div>
          <IconComp className="w-6 h-6 text-ink/75 group-hover:text-copper group-hover:rotate-[14deg] transition-all duration-500 ease-out" />
        </div>

        <h3 className="font-display text-3xl md:text-[34px] leading-[1.05] mb-5 text-balance text-ink group-hover:text-bone transition-colors duration-500">
          {feature.title}
        </h3>
        <p className="text-ink/70 group-hover:text-bone/75 text-[15px] leading-relaxed text-pretty transition-colors duration-500">
          {feature.body}
        </p>
      </div>

      {/* Hover reveal — slides up from below, separated by hairline */}
      <div
        aria-hidden
        className="absolute left-10 right-10 md:left-12 md:right-12 bottom-7 md:bottom-8 flex items-end justify-between gap-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none"
      >
        <div className="flex items-baseline gap-3 border-t border-bone/25 pt-4 flex-1">
          <span className="numeral tnum text-[28px] md:text-[32px] text-copper leading-none">
            {reveal.stat}
          </span>
          <span className="eyebrow text-bone/65 text-[10px] leading-tight max-w-[60%]">
            {reveal.label}
          </span>
        </div>
        <span className="text-bone/85 group-hover:text-copper transition-colors duration-300 mt-4">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}
