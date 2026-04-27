// Editorial number counter. Counts up from 0 to `to` when it enters view.
// Uses requestAnimationFrame; respects prefers-reduced-motion.
import React, { useEffect, useRef, useState } from "react";

export default function CountUp({ to = 0, duration = 1400, pad = 2, className = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            if (reduced) {
              setN(to);
              io.disconnect();
              return;
            }
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              // easeOutQuart
              const eased = 1 - Math.pow(1 - t, 4);
              setN(Math.round(eased * to));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {String(n).padStart(pad, "0")}
    </span>
  );
}
