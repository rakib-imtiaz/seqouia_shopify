// Static illustrated region map with overlay markers.
// Positions are %-based on the Map of Kamloops area lakes.png so the markers
// scale with the image at any width. Click a marker → syncs with active state.
import React from "react";
import { motion, AnimatePresence } from "motion/react";

// Approximate marker positions on the static PNG (x%, y%).
// The PNG centers on the Kamloops region; some lakes (Shuswap) lie at the
// far east edge and are positioned accordingly.
const POSITIONS = {
  "Heffley Lake":   { x: 68, y: 28 },
  "Paul Lake":      { x: 53, y: 35 },
  "Monte Lake":     { x: 64, y: 73 },
  "Shuswap Lake":   { x: 90, y: 50 },
  "Kamloops Lake":  { x: 18, y: 52 },
  "Lac Le Jeune":   { x: 25, y: 80 },
};

const KAMLOOPS_ANCHOR = { x: 38, y: 53 };

export default function RegionMapStatic({ lakes, active, onSelect }) {
  return (
    <figure className="relative w-full hairline p-2 md:p-3 bg-paper overflow-hidden">
      <div className="relative">
        <img
          src="/assets/images/Map of Kamloops area lakes.png"
          alt="Kamloops region — lakes and delivery zones"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Crosshairs that quietly drift across the map */}
        <div aria-hidden className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30">
          <div className="absolute left-0 right-0 h-px bg-ink/40" style={{ top: `${KAMLOOPS_ANCHOR.y}%` }} />
          <div className="absolute top-0 bottom-0 w-px bg-ink/40" style={{ left: `${KAMLOOPS_ANCHOR.x}%` }} />
        </div>

        {/* Kamloops anchor */}
        <div
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
          style={{ left: `${KAMLOOPS_ANCHOR.x}%`, top: `${KAMLOOPS_ANCHOR.y}%` }}
        >
          <span className="relative flex w-3 h-3">
            <span className="absolute inset-0 rounded-full bg-ink/60 animate-ping" />
            <span className="relative w-3 h-3 rounded-full bg-ink border-2 border-bone" />
          </span>
          <span className="font-display italic text-[12px] text-ink/85 bg-bone/85 backdrop-blur px-1.5 py-0.5 leading-tight">
            Kamloops
          </span>
        </div>

        {/* Lake markers */}
        {lakes.map((l, i) => {
          const pos = POSITIONS[l.name];
          if (!pos) return null;
          const isActive = i === active;
          return (
            <motion.button
              key={l.name}
              type="button"
              onClick={() => onSelect(i)}
              onMouseEnter={() => onSelect(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-full"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={`${l.name} — ${l.distance}`}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              {/* Pulse rings for active marker */}
              {isActive && (
                <>
                  <span className="absolute inset-0 -m-3 rounded-full border border-copper animate-ping" />
                  <span className="absolute inset-0 -m-1.5 rounded-full bg-copper/20" />
                </>
              )}
              <span
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 text-[11px] font-semibold numeral tnum tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "bg-copper border-bone text-bone"
                    : "bg-ink border-bone text-bone group-hover:bg-copper group-hover:border-bone"
                }`}
                style={{ boxShadow: "0 2px 8px rgba(14,24,19,0.35), 0 0 0 1px rgba(14,24,19,0.1)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Tooltip on hover/active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-display italic text-[12px] text-ink bg-bone/95 backdrop-blur border border-ink/15 px-2.5 py-1 leading-tight shadow-[0_2px_8px_rgba(14,24,19,0.12)] z-20"
                  >
                    {l.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Active lake quick-readout — bottom-left badge */}
        <div className="absolute bottom-3 left-3 bg-bone/95 backdrop-blur px-3 py-2 border border-ink/15 z-10">
          <div className="eyebrow text-copper text-[9px]">Active</div>
          <div className="font-display text-[14px] text-ink leading-tight">
            {String(active + 1).padStart(2, "0")} / {String(lakes.length).padStart(2, "0")} ·{" "}
            {lakes[active]?.name}
          </div>
        </div>

        {/* Coords ornament — bottom-right */}
        <div className="absolute bottom-3 right-3 bg-bone/95 backdrop-blur px-3 py-2 border border-ink/15 z-10 flex items-center gap-3 text-[10px] tracking-widest uppercase text-ink/65 numeral tnum">
          <span>50.6764° N</span>
          <span className="text-ink/30">·</span>
          <span>120.3408° W</span>
        </div>
      </div>

      <figcaption className="sr-only">
        Static illustrated map of the Kamloops region with markers for each
        lake. Clicking a marker selects that lake.
      </figcaption>
    </figure>
  );
}
