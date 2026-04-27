// Horizontal Turo partnership ticker — continuously scrolls a single line
// of brand info inside an overflow-hidden container. Editorial dispatch tone.
import React from "react";

const ITEMS = [
  { kind: "text", value: "In partnership with" },
  { kind: "logo" },
  { kind: "dot" },
  { kind: "text", value: "2021 Mazda CX-5" },
  { kind: "dot" },
  { kind: "text", value: "Verified Host" },
  { kind: "dot" },
  { kind: "text", value: "Listing N°3271945" },
  { kind: "dot" },
  { kind: "text", value: "Kamloops, BC" },
  { kind: "dot" },
];

function Row({ ariaHidden = false }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex items-center gap-3 pr-3 shrink-0"
    >
      {ITEMS.map((item, i) => {
        if (item.kind === "logo") {
          return (
            <img
              key={i}
              src="/assets/images/turo-logo-official.svg"
              alt={ariaHidden ? "" : "Turo"}
              className="h-4 invert opacity-90 turo-beat"
            />
          );
        }
        if (item.kind === "dot") {
          return (
            <span key={i} className="text-copper/80 text-[8px]">
              ●
            </span>
          );
        }
        return (
          <span key={i} className="text-bone/80 text-[10px] tracking-widest uppercase whitespace-nowrap">
            {item.value}
          </span>
        );
      })}
    </div>
  );
}

export default function TuroTicker({ className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Soft fades at the edges so the ticker doesn't end abruptly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-ink to-transparent" />

      <div className="flex items-center turo-ticker-track">
        {[...Array(4)].map((_, i) => (
          <Row key={i} ariaHidden={i > 0} />
        ))}
      </div>
    </div>
  );
}
