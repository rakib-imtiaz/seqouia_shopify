// Editorial product card — cursor-tracked 3D tilt + spotlight + reveal arrow.
// Uses motion's useMotionValue/useTransform so the tilt runs outside React's
// render cycle (no jitter, no re-renders).
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const TILT_MAX = 6; // degrees — restrained, editorial

export default function AddonCard({ addon, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring on the input motion values
  const springConfig = { stiffness: 240, damping: 22, mass: 0.4 };
  const xs = useSpring(x, springConfig);
  const ys = useSpring(y, springConfig);

  const rotateX = useTransform(ys, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]);
  const rotateY = useTransform(xs, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]);
  // Spotlight position drives a CSS variable on the element below.
  const spotlightX = useTransform(xs, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(ys, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="bg-ink relative p-5 md:p-6 group hover:bg-moss transition-colors duration-500 will-change-transform"
    >
      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) => `radial-gradient(280px circle at ${sx} ${sy}, rgba(181,104,59,0.30), transparent 55%)`
          ),
        }}
      />

      {/* Image with subtle parallax — counter-tilts slightly so it feels like
          it's sitting in front of the card surface */}
      <motion.div
        className="aspect-square bg-bone/5 mb-5 overflow-hidden relative"
        style={{
          rotateX: useTransform(rotateX, (v) => v * -0.4),
          rotateY: useTransform(rotateY, (v) => v * -0.4),
          transformPerspective: 800,
        }}
      >
        <img
          src={addon.img}
          alt={addon.title}
          className="w-full h-full object-cover duotone group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Reveal arrow — slides in from corner */}
        <span
          aria-hidden
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-bone text-ink opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 17 L17 7 M9 7 H17 V15" />
          </svg>
        </span>
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="numeral tnum text-[11px] tracking-widest text-copper">
            +{String(index + 1).padStart(2, "0")}
          </span>
          <span className="numeral tnum text-base text-bone">{addon.price}</span>
        </div>
        <h5 className="font-display text-lg leading-tight mb-1.5 text-bone">{addon.title}</h5>
        <p className="text-bone/55 text-[12px] leading-snug text-pretty">{addon.desc}</p>

        {/* Hairline that draws on hover — bottom of card */}
        <span
          aria-hidden
          className="absolute -bottom-5 left-0 right-0 h-px bg-copper origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
      </div>
    </motion.div>
  );
}
