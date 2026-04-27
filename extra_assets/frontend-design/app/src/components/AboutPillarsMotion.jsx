// AboutPillarsMotion — editorial trust pillars grid driven by Motion.
// Features: scroll-tied entrance (useScroll/useTransform), drag-to-reorder
// (Reorder.Group/Item), shared layoutId expansion, perpetual organic float
// (useTime/useTransform), copper hairline draw on hover, prefers-reduced-motion
// respected throughout. Aesthetic: bone/cream/ink/copper, Fraunces display.
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useScroll,
  useTransform,
  useTime,
  useReducedMotion,
} from "motion/react";

// Extended copy keyed by pillar title — invented to fit the brand voice
// (editorial, restrained, Pacific Northwest). One-to-two sentences each.
const EXTENDED = {
  "Eco-Friendly":
    "Our fleet runs silent on lithium electric drives — zero emissions, zero wake noise. The loons keep singing; the lake keeps its secrets.",
  "Safety First":
    "Every rental ships with Transport Canada–approved life jackets in five sizes, redundant paddles, and a brief on-water orientation. We don't cast off until you're confident.",
  "Local Expertise":
    "Our guides have logged decades on these waters — they know which cove holds the morning light and which channel the bighorn favour. Local knowledge, freely shared.",
  "Concierge Services":
    "From a licensed driver to a lakeside picnic spread, we tailor the day to the party. Tell us the occasion; we'll handle the choreography.",
  "Free Delivery":
    "We tow the boat to any popular Kamloops-area lake at no cost — Heffley, Paul, Lac Le Jeune and beyond. You arrive, the boat is waiting.",
};

// Per-pillar SVG ornament — small editorial mark in the corner.
const ORNAMENTS = [
  // 0 — bracket
  (active) => (
    <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none" strokeWidth="0.7"
      stroke={active ? "#B5683B" : "rgba(181,104,59,0.5)"}>
      <path d="M22 4 H56 V38" />
      <circle cx="56" cy="4" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 1 — concentric rings
  (active) => (
    <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none" strokeWidth="0.7"
      stroke={active ? "#B5683B" : "rgba(181,104,59,0.5)"}>
      <circle cx="30" cy="30" r="22" />
      <circle cx="30" cy="30" r="14" />
      <circle cx="30" cy="30" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 2 — diagonal hatch
  (active) => (
    <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none" strokeWidth="0.7"
      stroke={active ? "#B5683B" : "rgba(181,104,59,0.5)"}>
      <path d="M4 24 L24 4" />
      <path d="M4 36 L36 4" />
      <path d="M4 48 L48 4" />
    </svg>
  ),
  // 3 — triangle
  (active) => (
    <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none" strokeWidth="0.7"
      stroke={active ? "#B5683B" : "rgba(181,104,59,0.5)"}>
      <path d="M30 6 L54 50 H6 Z" />
    </svg>
  ),
  // 4 — dotted grid
  (active) => (
    <svg viewBox="0 0 60 60" className="w-10 h-10"
      fill={active ? "#B5683B" : "rgba(181,104,59,0.5)"} stroke="none">
      {[0, 10, 20, 30].map((y) =>
        [0, 10, 20, 30].map((x) => (
          <circle key={`${x}-${y}`} cx={x + 6} cy={y + 6} r="1.1" />
        ))
      )}
    </svg>
  ),
];

// Floating phase offsets — distinct so the grid breathes asynchronously.
const FLOAT_PHASES = [0, 1.7, 3.1, 4.5, 6.0];

// Single pillar item — encapsulates float, hover, layout, drag.
function PillarItem({ pillar, idx, isActive, onSelect, anyActive, scrollScale, scrollOpacity, scrollY }) {
  const reduce = useReducedMotion();
  const time = useTime();

  // Perpetual organic float — independent y/rotate per card, paused when active or reduced.
  const phase = FLOAT_PHASES[idx % FLOAT_PHASES.length];
  const floatY = useTransform(time, (t) => {
    if (reduce || isActive) return 0;
    return Math.sin((t / 1000 + phase) * 0.6) * 3.2;
  });
  const floatRot = useTransform(time, (t) => {
    if (reduce || isActive) return 0;
    return Math.sin((t / 1000 + phase) * 0.45) * 0.35;
  });

  const Ornament = ORNAMENTS[idx % ORNAMENTS.length];

  return (
    <Reorder.Item
      value={pillar}
      id={pillar.title}
      layout
      layoutId={`pillar-${pillar.title}`}
      dragListener={!isActive}
      whileDrag={
        reduce
          ? {}
          : { scale: 1.03, zIndex: 30, boxShadow: "0 24px 60px -20px rgba(14,24,19,0.28)" }
      }
      whileHover={reduce ? {} : { y: -4 }}
      onClick={() => onSelect(pillar.title)}
      style={{
        y: reduce ? 0 : floatY,
        rotate: reduce ? 0 : floatRot,
        scale: reduce ? 1 : scrollScale,
        opacity: reduce ? 1 : scrollOpacity,
        translateY: reduce ? 0 : scrollY,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
      className={[
        "group relative cursor-grab active:cursor-grabbing select-none",
        "border border-ink/10 hairline-overrideable",
        isActive ? "bg-bone md:col-span-2 md:row-span-2" : "bg-cream",
        anyActive && !isActive ? "opacity-70" : "opacity-100",
        "p-7 md:p-8 overflow-hidden",
      ].join(" ")}
    >
      {/* Copper hairline frame — draws around active pillar; hover preview on others */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute top-0 left-0 h-px bg-copper origin-left",
          "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute bottom-0 right-0 h-px bg-copper origin-right",
          "transition-transform duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] w-full",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute top-0 left-0 w-px bg-copper origin-top",
          "transition-transform duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] h-full",
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100",
        ].join(" ")}
      />
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute top-0 right-0 w-px bg-copper origin-bottom",
          "transition-transform duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] h-full",
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100",
        ].join(" ")}
      />

      <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
        <motion.span
          layout="position"
          className="numeral tnum text-copper text-[12px] tracking-[0.22em]"
        >
          P°{String(idx + 1).padStart(2, "0")}
        </motion.span>
        {Ornament(isActive)}
      </div>

      <motion.h3
        layout="position"
        className={[
          "font-display leading-[1.05] text-ink text-balance",
          isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
        ].join(" ")}
      >
        {pillar.title}
      </motion.h3>

      <motion.p
        layout="position"
        className="mt-3 text-[14px] leading-relaxed text-ink/70 text-pretty"
      >
        {pillar.desc}
      </motion.p>

      {/* Extended copy revealed when this pillar is active. */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="extended"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-ink/15">
              <span className="eyebrow text-copper text-[10px]">In detail</span>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80 text-pretty max-w-[60ch]">
                {EXTENDED[pillar.title] || pillar.desc}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(pillar.title);
                }}
                className="mt-5 eyebrow text-[10px] text-ink/55 hover:text-copper transition-colors duration-300"
              >
                Collapse —
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag affordance — visible only when not active */}
      {!isActive && (
        <span
          aria-hidden
          className="absolute bottom-3 right-3 text-ink/30 group-hover:text-copper transition-colors duration-300"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <circle cx="4" cy="4" r="1" />
            <circle cx="4" cy="8" r="1" />
            <circle cx="4" cy="12" r="1" />
            <circle cx="12" cy="4" r="1" />
            <circle cx="12" cy="8" r="1" />
            <circle cx="12" cy="12" r="1" />
          </svg>
        </span>
      )}
    </Reorder.Item>
  );
}

// Small wrapper that supplies scroll-tied transforms per index — keeps
// each item's hooks at top level (rules-of-hooks safe) by mapping index → MotionValue.
function PillarRow({ pillars, order, setOrder, activeId, setActiveId, scrollProgress }) {
  const reduce = useReducedMotion();

  // Stagger entrance per index using scrollProgress (a single MotionValue).
  // Earlier items animate in earlier; later items lag.
  const makeRange = (i, n) => {
    const start = (i / (n + 1)) * 0.6;
    const end = start + 0.4;
    return [start, end];
  };

  const total = order.length;

  // Build transforms per index — these are fixed-count (5) so hook order is stable.
  const tScale0 = useTransform(scrollProgress, makeRange(0, total), [0.92, 1]);
  const tScale1 = useTransform(scrollProgress, makeRange(1, total), [0.92, 1]);
  const tScale2 = useTransform(scrollProgress, makeRange(2, total), [0.92, 1]);
  const tScale3 = useTransform(scrollProgress, makeRange(3, total), [0.92, 1]);
  const tScale4 = useTransform(scrollProgress, makeRange(4, total), [0.92, 1]);

  const tOpacity0 = useTransform(scrollProgress, makeRange(0, total), [0, 1]);
  const tOpacity1 = useTransform(scrollProgress, makeRange(1, total), [0, 1]);
  const tOpacity2 = useTransform(scrollProgress, makeRange(2, total), [0, 1]);
  const tOpacity3 = useTransform(scrollProgress, makeRange(3, total), [0, 1]);
  const tOpacity4 = useTransform(scrollProgress, makeRange(4, total), [0, 1]);

  const tY0 = useTransform(scrollProgress, makeRange(0, total), [40, 0]);
  const tY1 = useTransform(scrollProgress, makeRange(1, total), [40, 0]);
  const tY2 = useTransform(scrollProgress, makeRange(2, total), [40, 0]);
  const tY3 = useTransform(scrollProgress, makeRange(3, total), [40, 0]);
  const tY4 = useTransform(scrollProgress, makeRange(4, total), [40, 0]);

  const scrollScales = [tScale0, tScale1, tScale2, tScale3, tScale4];
  const scrollOpacities = [tOpacity0, tOpacity1, tOpacity2, tOpacity3, tOpacity4];
  const scrollYs = [tY0, tY1, tY2, tY3, tY4];

  return (
    <Reorder.Group
      axis="y"
      values={order}
      onReorder={setOrder}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0"
      as="ul"
    >
      {order.map((pillar, idx) => (
        <PillarItem
          key={pillar.title}
          pillar={pillar}
          idx={idx}
          isActive={activeId === pillar.title}
          anyActive={activeId !== null}
          onSelect={(id) => setActiveId((cur) => (cur === id ? null : id))}
          scrollScale={reduce ? 1 : scrollScales[idx]}
          scrollOpacity={reduce ? 1 : scrollOpacities[idx]}
          scrollY={reduce ? 0 : scrollYs[idx]}
        />
      ))}
    </Reorder.Group>
  );
}

export default function AboutPillarsMotion({ pillars }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Scroll-tied entrance — progress goes 0 → 1 as the section
  // travels from "just entering viewport" to "centered".
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 55%"],
  });

  const [order, setOrder] = useState(() => pillars || []);
  const [activeId, setActiveId] = useState(null);

  // Sync local order when pillars prop changes (defensive for prop updates).
  useEffect(() => {
    if (!pillars) return;
    // Preserve existing order positions where possible.
    setOrder((prev) => {
      const byTitle = new Map(prev.map((p) => [p.title, p]));
      const next = pillars.map((p) => byTitle.get(p.title) || p);
      // Append any new items.
      return next;
    });
  }, [pillars]);

  // Headline numerals — count visible pillars vs active.
  const stats = useMemo(
    () => ({
      total: String(order.length).padStart(2, "0"),
      active: activeId ? "01" : "00",
    }),
    [order.length, activeId]
  );

  if (!order.length) return null;

  return (
    <div ref={sectionRef} className="relative">
      {/* Editorial meta row */}
      <div className="flex items-end justify-between mb-8 md:mb-10 gap-6">
        <div>
          <span className="eyebrow text-copper">Trust Pillars</span>
          <p className="mt-3 text-ink/55 text-[13px] max-w-[42ch] leading-relaxed">
            Drag to reorder by what matters most to your trip. Tap any pillar
            to read the longer note.
          </p>
        </div>
        <div className="hidden md:flex items-baseline gap-6 text-ink/50">
          <div className="text-right">
            <div className="numeral tnum text-copper text-2xl leading-none">{stats.total}</div>
            <div className="eyebrow text-[10px] mt-1">Pillars</div>
          </div>
          <div className="text-right">
            <div className="numeral tnum text-copper text-2xl leading-none">{stats.active}</div>
            <div className="eyebrow text-[10px] mt-1">Expanded</div>
          </div>
        </div>
      </div>

      <PillarRow
        pillars={pillars}
        order={order}
        setOrder={setOrder}
        activeId={activeId}
        setActiveId={setActiveId}
        scrollProgress={scrollYProgress}
      />

      {/* Footer hint — only shows when no pillar is active */}
      <AnimatePresence>
        {!activeId && !reduce && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 flex items-center gap-3 text-ink/45"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="eyebrow text-[10px]">Click a pillar to expand · Drag to reorder</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
