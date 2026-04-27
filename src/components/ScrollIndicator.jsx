// Bottom-centered scroll cue — slow vertical travel, fades on scroll.
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 280], [1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="absolute left-1/2 -translate-x-1/2 bottom-[88px] z-20 flex flex-col items-center gap-3 text-bone/60 pointer-events-none"
    >
      <div className="eyebrow text-[10px]">Scroll</div>
      <div className="h-12 w-px bg-bone/30 overflow-hidden relative">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-copper origin-top"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
