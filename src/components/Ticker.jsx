// Editorial coordinate ticker — periodic micro-shuffle on the last digit.
// Mimics a compass/GPS readout that's actively reading. Restrained.
import React, { useEffect, useState } from "react";

export default function Ticker({ value, className = "", interval = 5200 }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let ticking = false;
    const id = setInterval(() => {
      if (ticking) return;
      ticking = true;
      // brief shuffle of last 2 digits, then settle back to original
      const orig = value;
      let i = 0;
      const total = 6;
      const tick = setInterval(() => {
        i++;
        const last = String(Math.floor(Math.random() * 100)).padStart(2, "0");
        // replace last 2 chars before the ° symbol
        const m = orig.match(/^(.*?)(\d{2})(°.*)$/);
        if (m) setDisplay(m[1] + last + m[3]);
        if (i >= total) {
          clearInterval(tick);
          setDisplay(orig);
          ticking = false;
        }
      }, 60);
    }, interval);
    return () => clearInterval(id);
  }, [value, interval]);

  return <span className={className}>{display}</span>;
}
