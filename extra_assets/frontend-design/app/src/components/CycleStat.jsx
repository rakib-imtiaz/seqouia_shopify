// Cycling hero stat — every cycle the number recounts from 0 with CountUp
// and the label crossfades. Editorial pace; no perpetual jitter.
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CountUp from "./CountUp";

const STATS = [
  { value: 6,   label: "Lakes Curated",    duration: 1200, pad: 2 },
  { value: 24,  label: "Avg KM/hr Cruise", duration: 1500, pad: 2 },
  { value: 100, label: "Battery Charge",   duration: 1800, pad: 3, suffix: "%" },
  { value: 38,  label: "Days Until Solstice", duration: 1400, pad: 2 },
];

const INTERVAL_MS = 5400;

export default function CycleStat({ className = "" }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % STATS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = STATS[idx];

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="numeral text-6xl text-bone tnum soft-pulse leading-none">
            <CountUp to={current.value} duration={current.duration} pad={current.pad} />
            {current.suffix && <span className="text-copper">{current.suffix}</span>}
          </div>
          <div className="eyebrow text-bone/75 mt-2 leading-tight whitespace-nowrap">
            {current.label}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots — show which stat is showing + cycle position */}
      <div className="flex justify-end gap-1.5 mt-3">
        {STATS.map((_, i) => (
          <span
            key={i}
            className={`h-px transition-all duration-500 ${
              i === idx ? "w-6 bg-copper" : "w-2 bg-bone/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
