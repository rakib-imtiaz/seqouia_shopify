// Top-of-viewport reading progress hairline. Editorial longform staple.
import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-copper z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}
