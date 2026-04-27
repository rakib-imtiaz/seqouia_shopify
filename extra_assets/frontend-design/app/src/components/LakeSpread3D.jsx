import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import Zdog from "zdog";

/* Inline arrow icon — local copy so we don't depend on App.jsx */
const ArrowIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

/* Detect prefers-reduced-motion at attach time */
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Custom hook that wires VanillaTilt to a node and cleans up on unmount */
function useTilt(options) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    VanillaTilt.init(node, {
      reverse: false,
      speed: 600,
      transition: true,
      easing: "cubic-bezier(.16,1,.3,1)",
      reset: true,
      gyroscope: false,
      ...options,
    });

    return () => {
      if (node.vanillaTilt) node.vanillaTilt.destroy();
    };
    // We deliberately ignore options changes — tilt stays stable for the lifetime of the node
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/* Tiny Zdog mark — a hairline compass that slowly rotates. ~80x80, copper ink. */
function ZdogMark() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const reduce = prefersReducedMotion();

    const illo = new Zdog.Illustration({
      element: el,
      zoom: 2.4,
      rotate: { x: -0.35, y: 0.25 },
    });

    // Outer ring
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 26,
      stroke: 0.9,
      color: "#0E1813", // ink
    });

    // Inner ring
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 16,
      stroke: 0.6,
      color: "#0E1813",
    });

    // Compass needle — copper, two halves
    new Zdog.Shape({
      addTo: illo,
      path: [
        { x: 0, y: -12 },
        { x: 1.6, y: 0 },
        { x: 0, y: 12 },
        { x: -1.6, y: 0 },
      ],
      stroke: 0.8,
      color: "#B5683B", // copper
      fill: true,
    });

    // N tick
    new Zdog.Shape({
      addTo: illo,
      path: [
        { x: 0, y: -15 },
        { x: 0, y: -13 },
      ],
      stroke: 1,
      color: "#B5683B",
    });

    // Center pin
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 1.6,
      stroke: 1.2,
      color: "#B5683B",
      fill: true,
    });

    illo.updateRenderGraph();

    if (!reduce) {
      const tick = () => {
        illo.rotate.z += 0.004;
        illo.rotate.y += 0.006;
        illo.updateRenderGraph();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      aria-hidden="true"
      className="block"
    />
  );
}

export default function LakeSpread3D({ lake, active, lakes, onPrev, onNext }) {
  // Main image card — subtle editorial tilt with soft glare
  const mainTiltRef = useTilt({
    max: 8,
    perspective: 1400,
    scale: 1.01,
    glare: true,
    "max-glare": 0.18,
    "glare-prerender": false,
  });

  // Inset secondary image — slightly more dramatic
  const insetTiltRef = useTilt({
    max: 12,
    perspective: 900,
    scale: 1.03,
    glare: true,
    "max-glare": 0.25,
  });

  const total = (lakes && lakes.length) || 1;
  const numeral = String(active + 1).padStart(2, "0");

  return (
    <div key={active} className="grid grid-cols-12 gap-8 animate-riseIn">
      {/* LEFT — main image card with VanillaTilt */}
      <div className="col-span-12 lg:col-span-7 img-hover relative">
        <div
          ref={mainTiltRef}
          className="relative w-full will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={lake.images[0]}
            alt={lake.name}
            className="w-full h-[520px] md:h-[680px] object-cover duotone"
            style={{ transform: "translateZ(0)" }}
          />

          {/* "Now Featuring" badge — floats forward via translateZ */}
          <div
            className="absolute top-5 left-5 bg-bone/90 backdrop-blur px-4 py-2.5"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="eyebrow text-copper">Now Featuring</div>
            <div className="font-display text-xl mt-1">{lake.name}</div>
          </div>

          {/* Tiny Zdog compass mark — sits in the bottom-left dead space */}
          <div
            className="hidden md:block absolute bottom-5 left-5 pointer-events-none opacity-90"
            style={{ transform: "translateZ(40px)" }}
          >
            <ZdogMark />
          </div>
        </div>

        {/* Inset secondary image — independent tilt for layered parallax feel */}
        {lake.images[1] && (
          <div
            ref={insetTiltRef}
            className="hidden md:block absolute -bottom-10 -right-10 w-48 h-64 lift will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={lake.images[1]}
              alt=""
              className="w-full h-full object-cover duotone border-4 border-bone"
            />
          </div>
        )}
      </div>

      {/* RIGHT — copy column (preserved verbatim) */}
      <div className="col-span-12 lg:col-span-5 lg:pl-6 flex flex-col">
        <div className="flex items-baseline justify-between mb-6 border-b border-ink/15 pb-5">
          <div className="numeral tnum text-7xl md:text-8xl text-copper">{numeral}</div>
          <div className="text-right">
            <div className="eyebrow text-ink/50 mb-1">Distance</div>
            <div className="text-[13px] text-ink/80 max-w-[220px]">{lake.distance}</div>
          </div>
        </div>
        <h3 className="font-display text-5xl md:text-6xl mb-6 text-balance leading-[0.98]">
          {lake.name}
          <span className="text-copper">.</span>
        </h3>
        <p className="text-ink/75 text-[15px] leading-relaxed text-pretty drop-cap">
          {lake.desc}
        </p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={() =>
              onPrev ? onPrev() : null
            }
            className="btn-ghost"
            type="button"
          >
            <ArrowIcon className="w-4 h-4 rotate-180" /> Previous
          </button>
          <button
            onClick={() => (onNext ? onNext() : null)}
            className="btn-primary"
            type="button"
          >
            Next Lake <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-6 numeral tnum text-[10px] tracking-[0.22em] uppercase text-ink/40">
          {numeral} / {String(total).padStart(2, "0")} — Pacific Northwest
        </div>
      </div>
    </div>
  );
}
