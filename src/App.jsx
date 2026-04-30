import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NAV,
  FEATURES,
  RENTAL_FEATURES,
  PRICING,
  POLICIES,
  CONCIERGE,
  ADDONS,
  LAKES,
  PACKAGES,
  TURO_BENEFITS,
  TRUST_PILLARS,
} from "./data";
import ConciergeAccordion from "./components/ConciergeAccordion";
import KamloopsMap from "./components/KamloopsMap";
import MaskReveal, { MaskLine } from "./components/MaskReveal";
import ProgressBar from "./components/ProgressBar";
import CountUp from "./components/CountUp";
import ScrollIndicator from "./components/ScrollIndicator";
import Ticker from "./components/Ticker";
import FeatureCard from "./components/FeatureCard";
import AddonCard from "./components/AddonCard";
import CycleStat from "./components/CycleStat";
import TuroTicker from "./components/TuroTicker";
import LakeSpread3D from "./components/LakeSpread3D";
import BookingPackagePicker from "./components/BookingPackagePicker";
import AboutPillarsMotion from "./components/AboutPillarsMotion";
import { useScroll, useTransform } from "motion/react";

/* ---------- Utility: reveal-on-scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Tiny icons (line / serif-friendly) ---------- */
const Icon = {
  Arrow: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  ArrowDown: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  ),
  Plus: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Leaf: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M5 21c0-9 6-15 15-15-1 9-6 15-15 15Z" />
      <path d="M5 21c4-4 7-7 11-11" />
    </svg>
  ),
  Compass: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5 11 13l-2.5 4 4-2.5L16 11l-1.5-1.5Z" />
    </svg>
  ),
  Sparkle: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Truck: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M3 7h12v9H3zM15 11h4l2 3v2h-6" />
      <circle cx="7" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" />
    </svg>
  ),
  Shield: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3Z" />
    </svg>
  ),
  Click: ({ className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className}>
      <path d="M9 4v6M4 9h6M14 4l1 4 4 1-4 1-1 4-1-4-4-1 4-1zM12 14l8 7-3 1-1 3-4-11Z" />
    </svg>
  ),
};

const FEATURE_ICONS = [Icon.Leaf, Icon.Compass, Icon.Sparkle, Icon.Truck, Icon.Shield, Icon.Click];

/* ---------- Header (mobile-first) ----------
 *  < md      : logo + hamburger
 *    md      : logo + book CTA + hamburger
 *    lg      : logo + nav items + book CTA + hamburger (still — nav also in slide)
 *    xl      : logo + nav items + phone icon + book CTA  (no hamburger)
 *    2xl     : as above with full phone number visible
 */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-bone/90 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 py-3 md:py-4 flex items-center justify-between gap-3">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/assets/images/logo_transparent_2.png"
            alt="Sequoia"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain"
          />
          <div className={`leading-none transition-colors ${scrolled || open ? "text-ink" : "text-bone"}`}>
            <div className="font-display text-[16px] sm:text-[17px] md:text-[18px] tracking-tightest">Sequoia</div>
            <div className={`eyebrow mt-1 text-[8px] sm:text-[9px] ${scrolled || open ? "text-ink/65" : "text-bone/85"}`}>
              Boat Rentals · Kamloops
            </div>
          </div>
        </a>

        {/* Nav items — only at xl+ to avoid crowding at 1024-1279 */}
        <nav className="hidden xl:flex items-center gap-7 ml-auto mr-7">
          {NAV.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              className={`text-[13px] tracking-wide hover:text-copper transition-colors flex items-center gap-2 ${
                scrolled ? "text-ink/80" : "text-bone/90"
              }`}
            >
              <span className="numeral text-[10px] text-copper/85 tnum">0{i + 1}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone — full text only at 2xl, icon link at xl */}
          <a
            href="tel:+12505557890"
            className={`hidden 2xl:flex items-center text-[13px] hover:text-copper transition-colors ${
              scrolled ? "text-ink/75" : "text-bone/85"
            }`}
          >
            <span className={`eyebrow text-[10px] mr-2 ${scrolled ? "text-ink/45" : "text-bone/55"}`}>Call</span>
            <span className="numeral tnum">(250) 555-7890</span>
          </a>
          <a
            href="tel:+12505557890"
            aria-label="Call (250) 555-7890"
            className={`hidden xl:flex 2xl:hidden w-10 h-10 items-center justify-center border hover:text-copper hover:border-copper transition ${
              scrolled ? "border-ink/15 text-ink/70" : "border-bone/30 text-bone/85"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            </svg>
          </a>

          {/* Book CTA — md+. When over hero video (not scrolled), invert: copper bg / bone text */}
          <div className="hidden md:block">
            <a
              href="#booking"
              className={`btn-primary !py-2.5 !px-4 !text-[11px] md:!text-[12px] whitespace-nowrap ${
                scrolled || open ? "" : "!bg-copper !text-bone hover:!bg-bone hover:!text-ink"
              }`}
            >
              <span className="hidden lg:inline">Book Your Adventure</span>
              <span className="lg:hidden">Book Now</span>
              <Icon.Arrow className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hamburger — anything below xl */}
          <button
            onClick={() => setOpen(!open)}
            className={`xl:hidden p-2 -mr-1 sm:-mr-2 transition-colors ${
              scrolled || open ? "text-ink" : "text-bone"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d={open ? "M6 6l12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-down mobile menu — full viewport coverage so hero CTAs don't bleed */}
      {open && (
        <div className="xl:hidden bg-bone border-t border-ink/10 min-h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] overflow-y-auto">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-10 py-6 flex flex-col gap-1">
            {NAV.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-3 border-b border-ink/10 last:border-0"
              >
                <span className="numeral text-[10px] tracking-widest text-copper/70 tnum w-6">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl sm:text-3xl group-hover:text-copper transition-colors">
                  {n.label}
                </span>
              </a>
            ))}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6">
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="btn-primary !py-3 !px-5"
              >
                Book Your Adventure <Icon.Arrow className="w-4 h-4" />
              </a>
              <a
                href="tel:+12505557890"
                className="text-sm text-ink/70 numeral tnum sm:ml-2"
              >
                <span className="eyebrow text-[10px] text-ink/40 mr-2">Call</span>(250) 555-7890
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  // Parallax: as the user scrolls, slow the video translation creating depth.
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 700], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section
      id="top"
      className="relative min-h-[640px] md:min-h-[100svh] grain overflow-hidden bg-ink text-bone"
    >
      {/* video background — Ken Burns + scroll parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: videoY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/people_riding_boats_lakes.png"
          className="hero-video-zoom absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/assets/videos/lake-video-background.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/35 to-ink/85"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(181,104,59,0.30),transparent_60%)] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-10 pt-28 sm:pt-32 md:pt-36 pb-32 md:pb-28"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
      >
        {/* Top meta strip */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-bone/70 mb-10 md:mb-16"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <div className="eyebrow flex items-center gap-3">
            <span className="w-8 h-px bg-bone/50" />
            <span className="hidden sm:inline">Volume I · Summer Edition · </span>
            <span>Kamloops, BC</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-[10px] sm:text-[11px] tracking-widest uppercase text-bone/65">
            <Ticker className="numeral tnum" value="50.6764° N" />
            <Ticker className="numeral tnum" value="120.3408° W" />
            <span className="numeral text-bone tnum">{new Date().getFullYear()}</span>
            {/* 06 LAKES badge — shown on small/medium where the standalone stat block is hidden */}
            <span className="xl:hidden numeral text-copper tnum tracking-widest flex items-center gap-1.5">
              <span className="text-bone soft-pulse"><CountUp to={6} /></span>
              <span>Lakes</span>
            </span>
          </div>
        </motion.div>

        {/* Headline grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
          {/* Vertical kicker (xl+ only — would crowd at smaller sizes) */}
          <div className="hidden xl:block xl:col-span-2">
            <motion.div
              className="vertical-rl text-bone/55 eyebrow"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              A Variety of Charters for Everyone
            </motion.div>
          </div>

          <div className="col-span-12 xl:col-span-8">
            {/* Mobile/medium kicker */}
            <motion.p
              className="xl:hidden eyebrow text-bone/65 mb-4"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              A Variety of Charters for Everyone
            </motion.p>

            {/* H1 — fluid clamp, line-mask reveal per line */}
            <h1 className="display-xl text-bone leading-[0.92]" style={{ fontSize: "clamp(44px, 8.5vw, 156px)" }}>
              <MaskLine duration={0.95}>Inspirational</MaskLine>
              <MaskLine duration={0.95} delay={0.18}>
                <span className="italic font-light text-copper">Routes</span>
                <span className="text-copper">.</span>
              </MaskLine>
            </h1>
          </div>

          {/* Stat — xl+ only. Cycles through 3-4 stats every 5.4s. */}
          <div className="hidden xl:flex xl:col-span-2 xl:justify-end items-end pr-2">
            <motion.div
              className="text-right"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <CycleStat className="text-right" />
            </motion.div>
          </div>
        </div>

        {/* Body + CTAs row — stack until xl, side-by-side at xl+ */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-14 xl:mt-20">
          <motion.div
            className="col-span-12 xl:col-span-5"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <p className="text-bone/85 text-base md:text-lg font-light leading-relaxed text-pretty max-w-xl">
              Discover the pristine waters surrounding Kamloops with our eco-friendly inflatable boats.
              Each lake offers a unique experience.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 xl:col-span-3 xl:col-start-7 flex flex-col sm:flex-row xl:flex-col gap-3"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <a
              href="#booking"
              className="btn-primary !bg-copper !text-bone hover:!bg-bone hover:!text-ink !py-4 !px-5 flex-1 sm:flex-none xl:flex-none"
            >
              Book Your Adventure <Icon.Arrow className="w-4 h-4" />
            </a>
            <a href="#lakes" className="btn-light !py-4 !px-5 flex-1 sm:flex-none xl:flex-none">
              Explore the Lakes <Icon.ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
          {/* Turo dispatch ticker — horizontal scroll, replaces the static
              partnership badge. Wider column so the marquee has room to read. */}
          <motion.div
            className="hidden xl:block xl:col-span-3 xl:col-start-10 self-end"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <div className="border-t border-bone/15 pt-3">
              <TuroTicker />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue — fades on scroll */}
      <ScrollIndicator />

      {/* Bottom marquee — outside the padded container so it spans the full width */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden border-t border-bone/15 py-4 z-10 bg-ink/40 backdrop-blur-sm">
        <div className="marquee-track text-bone/60">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
              {["Heffley", "Paul", "Monte", "Shuswap", "Kamloops", "Lac Le Jeune"].map((l, i) => (
                <span key={i} className="flex items-center gap-3 font-display italic text-lg sm:text-2xl">
                  <span className="numeral text-[10px] sm:text-[11px] not-italic tracking-widest tnum text-copper">
                    N°0{i + 1}
                  </span>
                  {l} Lake
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  return (
    <section id="why" className="relative bg-bone py-28 md:py-40">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-copper">§ 01 — The Difference</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-balance">
              <MaskLine>Quietly,<span className="italic text-copper"> exceptional</span>.</MaskLine>
              <MaskLine delay={0.12}>Six reasons to choose Sequoia.</MaskLine>
            </h2>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={i}
              feature={f}
              index={i}
              IconComp={FEATURE_ICONS[i] || Icon.Sparkle}
            />
          ))}
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-display italic text-2xl md:text-3xl text-ink/80 max-w-xl">
            "The lake is best heard at a whisper — not over an engine."
          </p>
          <a href="#booking" className="btn-primary">
            Book Your Adventure <Icon.Arrow className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICE_TABS = [
  { letter: "A", title: "Boat Rentals", id: "svc-rentals" },
  { letter: "B", title: "Concierge",    id: "svc-concierge" },
  { letter: "C", title: "Add-ons",      id: "svc-addons" },
];

function ServicesJumper() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const ids = SERVICE_TABS.map((t) => t.id);
    const observers = ids.map((id, i) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.25, rootMargin: "-20% 0px -55% 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return (
    <div className="mt-8 border-t border-bone/15 pt-5 flex flex-wrap gap-x-6 gap-y-3">
      {SERVICE_TABS.map((t, i) => (
        <a
          key={t.letter}
          href={`#${t.id}`}
          className={`group relative flex items-baseline gap-3 transition-colors ${
            i === active ? "text-bone" : "text-bone/55 hover:text-bone/85"
          }`}
        >
          <span
            className={`numeral text-3xl tnum transition-transform duration-300 ${
              i === active ? "text-copper scale-110" : "text-copper/70 group-hover:scale-105"
            }`}
          >
            {t.letter}
          </span>
          <span className="font-display text-xl md:text-2xl">{t.title}</span>
          {i === active && (
            <motion.span
              layoutId="svc-active"
              className="absolute -bottom-2 left-0 right-0 h-px bg-copper"
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            />
          )}
        </a>
      ))}
    </div>
  );
}

function Watermark({ letter, side = "left" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none absolute ${
        side === "left" ? "-left-4 md:-left-10" : "-right-6 md:-right-14"
      } -top-12 md:-top-24 font-display text-bone/[0.04] leading-none text-[260px] md:text-[440px]`}
    >
      {letter}
    </div>
  );
}

const PRICING_HIGHLIGHTS = ["Quick Trip", "Most Popular", "Best Value/hr", "Full Adventure"];

function Services() {
  const [highlightIdx, setHighlightIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHighlightIdx((i) => (i + 1) % PRICING.length), 4400);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="services" className="relative bg-ink text-bone py-28 md:py-40 grain overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-copper">§ 02 — Our Services</div>
            <div className="mt-2 numeral tnum text-[10px] tracking-widest uppercase text-bone/45">
              Three Disciplines · 01 / 03 — 03 / 03
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-bone text-balance">
              <MaskLine>Three <span className="italic text-copper">disciplines</span>.</MaskLine>
              <MaskLine delay={0.12}>One unhurried day on the water.</MaskLine>
            </h2>
            <ServicesJumper />
          </div>
        </div>

        {/* A. Boat Rentals */}
        <div id="svc-rentals" className="relative grid grid-cols-12 gap-8 mb-32 md:mb-40 scroll-mt-24">
          <Watermark letter="A" side="right" />

          {/* Aurora mesh — drifts behind the entire row */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full blur-3xl aurora-drift"
              style={{ backgroundColor: "rgba(181,104,59,0.10)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl aurora-drift"
              style={{ backgroundColor: "rgba(31,44,36,0.55)", animationDelay: "-12s" }}
            />
          </div>

          <div className="col-span-12 lg:col-span-7 relative overflow-hidden img-hover">
            {/* Section letter */}
            <div className="absolute top-4 left-4 z-10 eyebrow text-bone/80 bg-ink/60 backdrop-blur px-3 py-2">
              A · Boat Rentals
            </div>

            {/* Live availability badge */}
            <div
              className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 backdrop-blur border numeral tnum text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(14,24,19,0.7)",
                borderColor: "rgba(181,104,59,0.5)",
                color: "#B5683B",
              }}
            >
              <span className="relative flex w-2 h-2">
                <span className="status-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="status-dot relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-bone/85">4 Boats Available Today</span>
            </div>

            {/* The image — continuous Ken Burns */}
            <img
              src="/assets/images/our_services/boat_rentals/ecoboat.jpg"
              alt="Electric inflatable boat"
              className="mazda-kenburns w-full h-[480px] md:h-[580px] object-cover duotone"
            />

            {/* Animated waterline at the bottom of the image — flowing wave */}
            <div aria-hidden className="absolute left-0 right-0 bottom-0 h-12 overflow-hidden pointer-events-none">
              <svg
                viewBox="0 0 1200 48"
                preserveAspectRatio="none"
                className="waterline-track w-[200%] h-full"
              >
                <path
                  d="M0 30 Q 100 18, 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30 V 48 H 0 Z M1200 30 Q 1300 18, 1400 30 T 1600 30 T 1800 30 T 2000 30 T 2200 30 T 2400 30 V 48 H 1200 Z"
                  fill="rgba(181,104,59,0.20)"
                />
                <path
                  d="M0 36 Q 80 28, 160 36 T 320 36 T 480 36 T 640 36 T 800 36 T 960 36 T 1120 36 T 1200 36 V 48 H 0 Z M1200 36 Q 1280 28, 1360 36 T 1520 36 T 1680 36 T 1840 36 T 2000 36 T 2160 36 T 2320 36 T 2400 36 V 48 H 1200 Z"
                  fill="rgba(14,24,19,0.45)"
                />
              </svg>
            </div>

            {/* Bottom-edge live data strip */}
            <div className="absolute left-4 bottom-4 z-10 flex items-center gap-3 text-bone/85 numeral tnum text-[10px] tracking-widest uppercase">
              <span>EcoBoat 2.0</span>
              <span className="text-bone/40">·</span>
              <span>Quiet · 0 g CO₂/hr</span>
              <span className="text-bone/40">·</span>
              <span className="text-copper">6+ hr battery</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pl-8 flex flex-col">
            <h3 className="font-display text-4xl md:text-5xl text-balance leading-[1.05] mb-6">
              Electric, eco-friendly inflatable boats.
            </h3>
            <p className="text-bone/70 text-[15px] leading-relaxed mb-8">
              Our premium electric boats provide a quiet, peaceful experience that lets you connect
              with nature without disturbing it.
            </p>
            <motion.ul
              className="space-y-3 mb-10 border-t border-bone/15 pt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {RENTAL_FEATURES.map((f, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="flex items-start gap-4 text-bone/85 text-[14px] group"
                >
                  <span className="numeral text-[11px] text-copper tnum mt-1.5 group-hover:text-bone transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{f}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Pricing */}
            <div className="relative border border-bone/15">
              <div className="px-6 py-4 border-b border-bone/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Slow-rotating compass — instrument feel */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 compass-spin text-copper"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 3 L13 12 L12 21 L11 12 Z" fill="currentColor" />
                    <path d="M3 12 L12 11 L21 12 L12 13 Z" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                  <div className="eyebrow text-bone/70">Rate Card · Live</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="status-ring absolute inset-0 rounded-full bg-copper" />
                    <span className="status-dot relative w-1.5 h-1.5 rounded-full bg-copper" />
                  </span>
                  <div className="numeral text-[11px] tracking-widest tnum text-copper">CAD · per hour</div>
                </div>
              </div>
              <table className="w-full text-[14px]">
                <thead className="text-bone/60 text-[11px] uppercase tracking-widest">
                  <tr className="border-b border-bone/10">
                    <th className="text-left p-4 font-normal">Duration</th>
                    <th className="text-right p-4 font-normal">Weekday</th>
                    <th className="text-right p-4 font-normal">Weekend</th>
                  </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                >
                  {PRICING.map((p, i) => {
                    const isHighlight = highlightIdx === i;
                    return (
                      <motion.tr
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        animate={{
                          backgroundColor: isHighlight ? "rgba(181,104,59,0.10)" : "rgba(181,104,59,0)",
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-bone/10 last:border-0 hover:bg-copper/10"
                      >
                        <td className="p-4 relative">
                          <div className="flex items-center justify-between gap-3">
                            <div>{p.dur}</div>
                            {isHighlight && (
                              <motion.span
                                layoutId="value-pill"
                                className="best-value-pulse inline-flex items-center gap-1.5 numeral tnum text-[9px] tracking-widest uppercase text-bone bg-copper px-2 py-0.5"
                                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                              >
                                <span className="w-1 h-1 rounded-full bg-bone" />
                                {PRICING_HIGHLIGHTS[i]}
                              </motion.span>
                            )}
                          </div>
                          {p.note && <div className="text-[11px] text-copper mt-1">{p.note}</div>}
                        </td>
                        <td className="p-4 text-right numeral text-lg tnum">{p.weekday}</td>
                        <td className="p-4 text-right numeral text-lg tnum">{p.weekend}</td>
                      </motion.tr>
                    );
                  })}
                </motion.tbody>
              </table>
              <div className="px-6 py-4 text-[12px] text-bone/60 border-t border-bone/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <span>All rentals include life jackets &amp; paddles.</span>
                <span className="text-copper italic">Book longer durations for better hourly rates.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Policies + electric motor */}
        <div className="grid grid-cols-12 gap-8 mb-32 md:mb-40">
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="eyebrow text-copper mb-4">Rental Policies</div>
            <ol className="space-y-5 text-bone/85" style={{ counterReset: "item" }}>
              {POLICIES.map((p, i) => (
                <li key={i} className="idx font-display text-2xl md:text-[28px] leading-[1.15] text-pretty border-b border-bone/10 pb-5">{p}</li>
              ))}
            </ol>
          </div>
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 img-hover overflow-hidden">
            <motion.img
              src="/assets/images/our_services/boat_rentals/rental_policies_Section.jpg"
              alt="Rental policies"
              className="w-full h-[420px] md:h-[600px] object-cover duotone"
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.04 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* B. Concierge */}
        <div id="svc-concierge" className="relative mb-32 md:mb-40 scroll-mt-24">
          <Watermark letter="B" side="left" />
          <div className="relative flex items-end justify-between mb-12 border-b border-bone/15 pb-6">
            <div>
              <div className="eyebrow text-copper mb-3">B · Concierge Services</div>
              <h3 className="font-display text-4xl md:text-6xl">Curated, on demand.</h3>
            </div>
            <div className="hidden md:block text-right text-bone/60 text-[12px] max-w-xs">
              Boating License Assistance — for customers without a license, we help obtain a temporary one.<br/>
              <span className="text-copper">Free delivery to popular lakes.</span> Beyond the free zone: $50 per 100 km from Kamloops, or anywhere in BC for a fee.
            </div>
          </div>

          <ConciergeAccordion items={CONCIERGE} />

          <p className="md:hidden mt-8 text-bone/60 text-[13px]">
            Boating License Assistance — for customers without a license, we help obtain a temporary one.
            Free delivery to popular lakes. Beyond the free zone: $50 per 100 km from Kamloops, or anywhere in BC for a fee.
          </p>
        </div>

        {/* C. Add-ons */}
        <div id="svc-addons" className="relative scroll-mt-24">
          <Watermark letter="C" side="right" />
          <div className="relative flex items-end justify-between mb-12 border-b border-bone/15 pb-6">
            <div>
              <div className="eyebrow text-copper mb-3">C · Add-ons</div>
              <h3 className="font-display text-4xl md:text-6xl">Pack lighter, drift longer.</h3>
            </div>
            <div className="hidden md:block text-right text-bone/60 text-[12px] max-w-xs">
              Daily-rate accessories. Stack any combination — we deliver them with your boat.
            </div>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-bone/15 border border-bone/15"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {ADDONS.map((a, i) => (
              <AddonCard key={i} addon={a} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Lakes ---------- */
function Lakes() {
  const [active, setActive] = useState(0);
  const lake = LAKES[active];
  return (
    <section id="lakes" className="relative bg-bone py-28 md:py-40">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-copper">§ 03 — The Field Guide</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-balance">
              <MaskLine>Six lakes,</MaskLine>
              <MaskLine delay={0.12}>one <span className="italic text-copper">unhurried</span> region.</MaskLine>
            </h2>
          </div>
        </div>

        {/* Region map — static illustrated PNG with overlay markers */}
        <div className="grid grid-cols-12 gap-8 mb-14 items-end">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow text-copper mb-3">Region Map</div>
            <h3 className="font-display text-3xl md:text-4xl text-balance leading-[1.1]">
              Plotted across<br/>the Thompson plateau.
            </h3>
            <p className="text-ink/65 text-[14px] mt-4 leading-relaxed">
              From the close shoreline of Kamloops Lake to the winding coves of Shuswap, every launch
              is a short drive from the city. Hover or tap a marker to focus that lake.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <KamloopsMap lakes={LAKES} active={active} onSelect={setActive} />
          </div>
        </div>

        {/* Index strip */}
        <div className="border-y border-ink/15 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-6">
            {LAKES.map((l, i) => (
              <button
                key={l.name}
                onClick={() => setActive(i)}
                className={`relative text-left p-5 md:p-6 border-r last:border-r-0 border-ink/10 transition-colors group ${
                  active === i ? "bg-ink text-bone" : "hover:bg-cream"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="lake-indicator"
                    className="absolute left-0 right-0 top-0 h-px bg-copper"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <div className={`numeral tnum text-[11px] tracking-widest mb-2 ${active === i ? "text-copper" : "text-copper/80"}`}>
                  N°{String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-xl md:text-2xl leading-tight">{l.name}</div>
                <div className={`eyebrow mt-2 text-[9px] ${active === i ? "text-bone/60" : "text-ink/50"}`}>{l.distance.split("(")[0].trim()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active lake spread — Vanilla-Tilt 3D + Zdog compass mark */}
        <LakeSpread3D
          lake={lake}
          active={active}
          lakes={LAKES}
          onPrev={() => setActive((active - 1 + LAKES.length) % LAKES.length)}
          onNext={() => setActive((active + 1) % LAKES.length)}
        />

      </div>
    </section>
  );
}

/* ---------- Quick Booking ---------- */
function Booking() {
  const [pkg, setPkg] = useState(0);
  const [addons, setAddons] = useState([]);
  const toggle = (n) => setAddons((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const addonOptions = ["Cooler", "JBL Speaker", "Dry Bags", "GoPro", "Fishing Gear", "Beach Kit"];

  return (
    <section id="booking" className="relative bg-cream py-28 md:py-40 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-copper/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-copper">§ 04 — Reserve</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-balance">
              <MaskLine>A boat,</MaskLine>
              <MaskLine delay={0.12}>by <span className="italic text-copper">tomorrow morning</span>.</MaskLine>
            </h2>
            <p className="mt-6 text-ink/70 max-w-2xl text-lg">
              Three curated packages, or compose your own. Instant confirmation, free cancellation,
              and safety gear included with every rental.
            </p>
          </div>
        </div>

        {/* Packages — View Transition API for shared-element + directional reveals */}
        <BookingPackagePicker packages={PACKAGES} value={pkg} onChange={setPkg} />

        {/* Promo + form */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-ink text-bone p-8 mb-6 grain relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-copper blur-2xl opacity-50 turo-scribble" />
              {/* Pulsing live offer dot */}
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex w-2 h-2">
                  <span className="status-ring absolute inset-0 rounded-full bg-copper" />
                  <span className="status-dot relative w-2 h-2 rounded-full bg-copper" />
                </span>
                <span className="eyebrow text-copper">Limited Time Offer</span>
              </div>
              <div className="font-display text-4xl leading-tight">Free Add-Ons</div>
              <p className="text-bone/70 text-[13px] mt-3">Bundle every accessory at no extra cost — while the season lasts.</p>
              {/* Live counter */}
              <div className="mt-5 pt-4 border-t border-bone/15 flex items-baseline justify-between">
                <span className="eyebrow text-bone/55 text-[10px]">Offer ends in</span>
                <span className="numeral tnum text-copper text-[14px] soft-pulse">38 days</span>
              </div>
            </div>
            <ul className="space-y-4 text-ink/80 text-[14px]">
              {["Instant confirmation","Free cancellation","Safety gear included","No hidden fees"].map((t,i)=>(
                <li key={i} className="flex items-center gap-3 border-b border-ink/15 pb-4">
                  <span className="numeral tnum text-copper text-[12px]">0{i+1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="col-span-12 lg:col-span-8 bg-bone p-8 md:p-10 lift" onSubmit={(e)=>e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <label className="eyebrow text-ink/50">Choose a Lake</label>
                <select className="field">
                  {LAKES.map((l) => <option key={l.name}>{l.name}</option>)}
                  <option>Custom — let us advise</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-ink/50">Boat Type</label>
                <select className="field">
                  <option>Single Boat (1–2 people)</option>
                  <option>Family Boat (3–4 people)</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-ink/50">Rental Duration</label>
                <select className="field">
                  <option>2 hours</option><option>4 hours</option>
                  <option>6 hours</option><option>8 hours (full day)</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-ink/50">Date</label>
                <input type="date" className="field" />
              </div>
              <div className="md:col-span-2 mt-6">
                <label className="eyebrow text-ink/50 block mb-3">
                  Add-ons
                  <span className="ml-3 numeral tnum text-copper text-[11px]">
                    {addons.length} of {addonOptions.length} selected
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {addonOptions.map((a) => {
                    const sel = addons.includes(a);
                    return (
                      <motion.button
                        type="button"
                        key={a}
                        onClick={() => toggle(a)}
                        whileTap={{ scale: 0.96 }}
                        className={`relative px-4 py-2 text-[12px] tracking-wide uppercase border transition-all duration-300 ${
                          sel
                            ? "bg-ink text-bone border-ink"
                            : "bg-transparent text-ink/70 border-ink/25 hover:border-copper hover:text-copper"
                        }`}
                      >
                        {sel && (
                          <motion.span
                            layoutId={`addon-${a}`}
                            className="absolute inset-0 bg-ink"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative inline-flex items-center gap-2">
                          {sel && (
                            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M3 8.5 L7 12 L13 4" />
                            </svg>
                          )}
                          {a}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="md:col-span-2 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <p className="text-ink/55 text-[12px]">By submitting, our team will reach out within the hour to confirm availability.</p>
                <button type="submit" className="btn-primary">Check Availability <Icon.Arrow className="w-4 h-4" /></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Turo ----------
 *  Branded section: official Turo SVG wordmark + Turo's Goldenrod (#F9D96A)
 *  used as the accent in this section (instead of copper) so the partnership
 *  reads as authentic. Goldenrod sits adjacent to copper on the wheel and
 *  doesn't fight the editorial palette.
 */
function Turo() {
  return (
    <section
      id="turo"
      className="relative text-bone py-28 md:py-40 grain overflow-hidden"
      style={{ backgroundColor: "#231F20" /* Turo Thunder */ }}
    >
      {/* Goldenrod glow + drifting scribble accent */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl" style={{ backgroundColor: "rgba(249,217,106,0.10)" }} />
      <div className="absolute top-10 right-10 hidden md:block pointer-events-none opacity-35 turo-scribble">
        <svg width="240" height="60" viewBox="0 0 240 60" fill="none" stroke="#F9D96A" strokeWidth="0.5">
          <path d="M0 50 Q 30 10, 60 30 T 120 30 T 180 30 T 240 30" />
          <path d="M0 40 Q 30 20, 60 35 T 120 35 T 180 35 T 240 35" opacity="0.5" />
        </svg>
      </div>
      {/* Subtle horizontal hairline that periodically sweeps right */}
      <div className="absolute left-0 right-0 top-1/3 hidden md:block pointer-events-none">
        <div className="h-px w-1/3 turo-scribble" style={{ background: "linear-gradient(90deg, transparent, rgba(249,217,106,0.4), transparent)" }} />
      </div>

      <div className="max-w-[1480px] mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow" style={{ color: "#F9D96A" }}>§ 05 — Beyond the Lakes</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            {/* Authenticated partnership chip */}
            <div className="flex items-center gap-3 mb-7">
              <span className="eyebrow text-bone/60">In partnership with</span>
              <img
                src="/assets/images/turo-logo-official.svg"
                alt="Turo"
                className="h-7 md:h-8"
              />
              <span
                className="hidden sm:inline-flex items-center gap-2 ml-2 px-2.5 py-1 border text-[10px] tracking-widest uppercase numeral tnum"
                style={{ borderColor: "rgba(249,217,106,0.4)", color: "#F9D96A" }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="status-ring absolute inset-0 rounded-full" style={{ backgroundColor: "#F9D96A" }} />
                  <span className="status-dot relative w-2 h-2 rounded-full" style={{ backgroundColor: "#F9D96A" }} />
                </span>
                Verified Host
              </span>
            </div>

            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-bone text-balance">
              <MaskLine>Our partnership</MaskLine>
              <MaskLine delay={0.12}>
                with <span className="italic" style={{ color: "#F9D96A" }}>Turo</span>.
              </MaskLine>
            </h2>
            <p className="mt-6 text-bone/70 max-w-xl text-lg">
              Explore Beyond the Lakes with Premium Vehicle Rentals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Vehicle card */}
          <div className="col-span-12 lg:col-span-7 relative group">
            <div
              className="absolute -top-6 left-0 numeral tnum text-[140px] sm:text-[180px] leading-none select-none pointer-events-none"
              style={{ color: "rgba(249,217,106,0.10)" }}
            >
              CX-5
            </div>

            {/* Available Now status badge — floats top-right of vehicle */}
            <div
              className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 backdrop-blur border numeral tnum text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(35,31,32,0.85)",
                borderColor: "rgba(249,217,106,0.4)",
                color: "#F9D96A",
              }}
            >
              <span className="relative flex w-2 h-2">
                <span className="status-ring absolute inset-0 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                <span className="status-dot relative w-2 h-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              </span>
              Available Now
            </div>

            <div className="relative z-10 overflow-hidden">
              <img
                src="/assets/images/maz.png"
                alt="2021 Mazda CX-5"
                className="mazda-kenburns w-full h-auto drop-shadow-2xl"
              />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-bone/15 pt-6">
              <div>
                <div className="eyebrow mb-1" style={{ color: "#F9D96A" }}>Featured Vehicle</div>
                <div className="font-display text-2xl md:text-3xl">2021 Mazda CX-5</div>
                <div className="numeral tnum text-bone/55 text-[12px] mt-1.5">Listing #3271945 · Kamloops, BC</div>
              </div>
              <div className="text-right">
                <div className="eyebrow text-bone/55 text-[10px]">Per Day</div>
                <div className="numeral tnum text-2xl text-bone mt-1">From $89</div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6">
            <ul className="space-y-6">
              {TURO_BENEFITS.map((b, i) => (
                <li
                  key={b.title}
                  className="border-b border-bone/15 pb-5 flex items-start gap-5 group/benefit"
                >
                  <span
                    className="numeral tnum text-2xl shrink-0 w-10 transition-transform duration-300 group-hover/benefit:scale-110 group-hover/benefit:translate-x-0.5"
                    style={{ color: "#F9D96A" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-display text-xl mb-1">{b.title}</div>
                    <p className="text-bone/65 text-[14px] leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="https://turo.com/ca/en/suv-rental/canada/kamloops-bc/mazda/cx-5/3271945"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-shimmer relative overflow-hidden mt-10 inline-flex items-center gap-3.5 px-6 py-4 text-[12px] tracking-widest uppercase font-medium border transition-all duration-300"
              style={{
                backgroundColor: "#F9D96A",
                color: "#231F20",
                borderColor: "#F9D96A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F9D96A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F9D96A";
                e.currentTarget.style.color = "#231F20";
              }}
            >
              Book the CX-5 on Turo <Icon.Arrow className="w-4 h-4" />
            </a>
            <p className="text-bone/50 text-[12px] mt-4 flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1 L1 4 V8 C1 12 4 14.5 8 15 C12 14.5 15 12 15 8 V4 Z" />
              </svg>
              All-inclusive pricing · No hidden fees · 24/7 support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="relative bg-bone py-28 md:py-40">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-copper">§ 06 — About Us</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="display-xl text-[clamp(40px,7vw,108px)] text-balance">
              <MaskLine>Your gateway to</MaskLine>
              <MaskLine delay={0.12}>Kamloops <span className="italic text-copper">lake adventures</span>.</MaskLine>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5 img-hover overflow-hidden">
            <img
              src="/assets/images/happy_customer.jpg"
              alt="Happy customer"
              className="w-full h-[480px] md:h-[600px] object-cover duotone mazda-kenburns"
            />
          </div>
          <div className="col-span-12 lg:col-span-7 lg:pl-6">
            <p className="font-display text-3xl md:text-[36px] leading-[1.15] text-balance text-ink/90 mb-10">
              At Sequoia Boat Rentals, we offer electric, eco-friendly inflatable boats to explore the
              pristine waters around Kamloops. From Heffley Lake to Shuswap, we make your lake adventure
              <span className="italic text-copper"> unforgettable</span>.
            </p>

            {/* Live stat strip — small dossier feel above the pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10 mb-px">
              {[
                { value: 6,   suffix: "",  label: "Lakes" },
                { value: 100, suffix: "%", label: "Electric" },
                { value: 24,  suffix: "/7",label: "Concierge" },
              ].map((s, i) => (
                <div key={i} className="bg-bone p-4 sm:p-5 flex items-baseline justify-between gap-3">
                  <span className="numeral tnum text-3xl text-ink soft-pulse">
                    <CountUp to={s.value} duration={1200 + i * 200} pad={s.value === 100 ? 3 : 2} />
                    <span className="text-copper">{s.suffix}</span>
                  </span>
                  <span className="eyebrow text-ink/55 text-[9px] shrink-0">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Trust pillars — motion-framer Reorder + layoutId + scroll physics */}
            <AboutPillarsMotion pillars={TRUST_PILLARS} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer id="footer" className="relative bg-ink text-bone pt-24 pb-10 grain">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10">
        {/* Top row: wordmark + dispatch + anchor */}
        <div className="grid grid-cols-12 gap-8 md:gap-10 pb-14 border-b border-bone/15">
          <div className="col-span-12 md:col-span-5">
            <div className="display-xl text-[clamp(56px,9vw,140px)] text-bone leading-[0.85] tracking-tightest">
              Sequoia<span className="text-copper italic">.</span>
            </div>
            <p className="text-bone/70 mt-6 text-[15px] font-light leading-relaxed max-w-sm text-pretty">
              Eco-friendly inflatable boat rentals on Kamloops' most beautiful lakes.
            </p>
            <div className="eyebrow text-copper mt-6 text-[10px]">
              Volume I · Summer Edition · MMXXVI
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-7">
            <div className="eyebrow text-bone/50 mb-3">Dispatches</div>
            <p className="text-bone/75 text-[13px] leading-relaxed mb-5 text-pretty">
              Field notes from the lake. Seasonal availability, conditions, member rates — sent monthly.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-3 border-b border-bone/30 pb-3 focus-within:border-copper transition-colors"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent flex-1 text-bone placeholder-bone/35 text-sm focus:outline-none"
                aria-label="Email for dispatches"
              />
              <button
                type="submit"
                className="text-copper text-[11px] tracking-widest uppercase font-medium hover:text-bone transition-colors flex items-center gap-2"
              >
                Subscribe <Icon.Arrow className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="text-bone/40 text-[11px] mt-3 leading-relaxed">
              No spam. Unsubscribe anytime. We share nothing.
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 md:col-start-11 md:text-right">
            <div className="eyebrow text-copper mb-3">Anchor</div>
            <div className="text-bone/75 text-[13px] space-y-1.5">
              <div>Kamloops, BC</div>
              <div>Canada V2C</div>
            </div>
            <div className="text-bone/75 text-[13px] mt-4 space-y-1.5">
              <a href="tel:+12505557890" className="block hover:text-copper transition numeral tnum">
                (250) 555-7890
              </a>
              <a
                href="https://sequoiaservices.ca"
                className="block hover:text-copper transition text-[12px]"
              >
                sequoiaservices.ca
              </a>
            </div>
          </div>
        </div>

        {/* Middle row: link columns */}
        <div className="grid grid-cols-12 gap-8 py-12 border-b border-bone/15">
          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-copper mb-5">Explore</div>
            <ul className="space-y-3 text-bone/75 text-[14px]">
              {[
                ["Home", "#top"],
                ["Why Sequoia", "#why"],
                ["Services", "#services"],
                ["Lakes", "#lakes"],
                ["Booking", "#booking"],
                ["About", "#about"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-copper transition inline-flex items-baseline gap-2">
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-copper mb-5">The Lakes</div>
            <ul className="space-y-3 text-bone/75 text-[14px]">
              {["Heffley", "Paul", "Monte", "Shuswap", "Kamloops", "Lac Le Jeune"].map((x, i) => (
                <li key={x}>
                  <a href="#lakes" className="hover:text-copper transition inline-flex items-baseline gap-3">
                    <span className="numeral tnum text-[10px] text-copper/60">N°0{i + 1}</span>
                    <span>{x}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-copper mb-5">Services</div>
            <ul className="space-y-3 text-bone/75 text-[14px]">
              {[
                "Boat Rentals",
                "Guided Tours",
                "Professional Driver",
                "Lakeside Picnic",
                "Photography",
                "License Assistance",
              ].map((x) => (
                <li key={x}>
                  <a href="#services" className="hover:text-copper transition">{x}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-copper mb-5">Connect</div>
            <div className="flex gap-2 mb-6">
              {[
                { label: "Facebook", short: "FB" },
                { label: "Instagram", short: "IG" },
                { label: "Twitter", short: "X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 border border-bone/20 flex items-center justify-center text-[10px] tracking-widest text-bone/70 hover:bg-copper hover:border-copper hover:text-bone transition"
                >
                  {s.short}
                </a>
              ))}
            </div>
            <ul className="space-y-3 text-bone/55 text-[13px]">
              <li><a href="#" className="hover:text-copper transition">Terms &amp; Conditions</a></li>
              <li><a href="#" className="hover:text-copper transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-copper transition">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom: colophon */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-bone/50 text-[11px]">
          <p>© 2026 Sequoia Boat Rentals &amp; Concierge Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 numeral tnum tracking-widest">
            <span>50.6764° N · 120.3408° W</span>
            <span className="hidden md:inline text-bone/30">·</span>
            <span>Crafted in Kamloops, BC</span>
            <span className="hidden md:inline text-bone/30">·</span>
            <span className="text-copper/70">Issue N° 01</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  useReveal();
  return (
    <div className="min-h-screen">
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Lakes />
        <Booking />
        <Turo />
        <About />
      </main>
      <Footer />
    </div>
  );
}
