// Concierge accordion — editorial horizontal image strip.
// Adapted from skill arsenal "Accordion Image Slider" mechanic, restyled
// to Build A's editorial Pacific Northwest journal aesthetic.
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ConciergeAccordion({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Desktop: horizontal accordion strip */}
      <div className="hidden md:flex w-full gap-2 h-[520px] border-y border-bone/15 py-2">
        {items.map((c, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={c.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              animate={{ flexGrow: isActive ? 4 : 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 22 }}
              className="relative overflow-hidden group focus:outline-none focus-visible:ring-1 focus-visible:ring-copper text-left"
              style={{ flexBasis: 0 }}
              aria-label={`Show ${c.title}`}
              aria-expanded={isActive}
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 size-full object-cover duotone transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />

              {/* Numeral overlay (always visible) */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-bone">
                <span className="numeral tnum text-[11px] tracking-widest text-copper">
                  N°{String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`eyebrow text-[10px] text-bone/70 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Concierge · {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-bone">
                <h4
                  className={`font-display leading-[1.05] text-balance transition-all duration-500 ${
                    isActive ? "text-3xl md:text-[34px]" : "text-xl md:text-2xl"
                  }`}
                >
                  {c.title}
                </h4>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-bone/20 flex items-end justify-between gap-6">
                        <p className="text-bone/80 text-[13px] leading-relaxed text-pretty max-w-[44ch]">
                          {c.desc}
                        </p>
                        <div className="text-right shrink-0 max-w-[160px]">
                          <div className="eyebrow text-bone/55 text-[9px]">Starting</div>
                          <div className="numeral tnum text-xl text-copper mt-1 leading-tight">
                            {c.price}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Desktop: index strip below accordion */}
      <div className="hidden md:flex items-center justify-between mt-6 text-[11px] tracking-widest uppercase text-bone/55">
        <span className="numeral tnum text-copper">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="eyebrow">Hover · Focus · Click to reveal</span>
      </div>

      {/* Mobile: vertical stacked cards (skill mobile-override pattern) */}
      <div className="md:hidden flex flex-col gap-6">
        {items.map((c, i) => (
          <article key={c.title} className="group">
            <div className="img-hover h-[300px] relative">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover duotone"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 numeral tnum text-[11px] tracking-widest text-bone/90 bg-ink/60 backdrop-blur px-3 py-2">
                N°{String(i + 1).padStart(2, "0")}
              </div>
            </div>
            <div className="pt-5 border-b border-bone/15 pb-5">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h4 className="font-display text-2xl leading-tight">{c.title}</h4>
                <div className="eyebrow text-bone/50 text-[9px] shrink-0">Starting</div>
              </div>
              <p className="text-bone/65 text-[13px] leading-relaxed text-pretty mb-3">{c.desc}</p>
              <div className="numeral tnum text-base text-copper">{c.price}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
