// Editorial line-by-line mask reveal.
// Splits children text into words, wraps each in an overflow-hidden line,
// and rises words from below the line on viewport enter. One orchestrated
// reveal — not perpetual.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

// Reliable in-view hook — manual IntersectionObserver with `once`.
function useInView(ref, { threshold = 0, rootMargin = "0px 0px -8% 0px" } = {}) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, threshold, rootMargin, ref]);
  return seen;
}

/**
 * <MaskReveal text="Six lakes, one unhurried region." />
 * <MaskReveal>Three <em>disciplines</em>. One unhurried day.</MaskReveal>
 *
 * Splits flat text on whitespace; each word becomes a span inside an
 * overflow-hidden inline-block, which animates from y:110% to y:0%.
 * For mixed/inline content (italics, line breaks), pass JSX children with
 * the splitWords={false} option and wrap manually.
 */
export default function MaskReveal({
  text,
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.85,
  as: Tag = "span",
}) {
  const words = useMemo(() => {
    if (typeof text === "string") {
      return text.split(/(\s+)/); // keep whitespace tokens
    }
    return null;
  }, [text]);

  // Fallback: if children given, just animate the whole block
  if (!words) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => {
          if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {w}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/**
 * <MaskLine delay={0.1}>{children}</MaskLine>
 *
 * Wraps a line of mixed inline content (text + italics + spans) and rises
 * the whole line from below an overflow-hidden mask on viewport enter.
 * Use one per visual line of a headline.
 */
export function MaskLine({ children, className = "", delay = 0, duration = 0.85 }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <span
      ref={ref}
      className={`mask-line block overflow-hidden ${seen ? "is-in" : ""} ${className}`}
      style={{
        paddingBottom: "0.06em",
        marginBottom: "-0.06em",
        // Pass duration + delay as CSS vars so we can animate via CSS rather
        // than rely on motion.span — bypasses an IO/transform interaction
        // that prevented Framer's whileInView from firing on these.
        ["--mask-duration"]: `${duration}s`,
        ["--mask-delay"]: `${delay}s`,
      }}
    >
      <span className="mask-line__inner block">{children}</span>
    </span>
  );
}
