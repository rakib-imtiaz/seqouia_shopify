import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Lightning, Leaf, Compass, Truck, Lifebuoy, Calendar,
  ArrowUpRight, ArrowRight, Phone, MapPin, InstagramLogo,
  FacebookLogo, TwitterLogo, Plus, BatteryHigh, UsersThree,
  Clock, ShieldCheck, Boat, ForkKnife, Camera,
} from '@phosphor-icons/react'

import Marquee from './components/Marquee'
import MagneticButton from './components/MagneticButton'
import LakeAccordion from './components/LakeAccordion'
import BookingForm from './components/BookingForm'
import {
  NAV, FEATURES, RENTAL_FEATURES, PRICING, POLICIES,
  CONCIERGE, ADDONS, LAKES, TURO_BENEFITS, TURO_URL, TRUST_PILLARS,
} from './data'

/* ---------------- HEADER ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-5'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
          scrolled
            ? 'glass border-ink-900/10 px-3 py-2'
            : 'border-transparent px-3 py-2'
        }`}>
          <a href="#home" className="flex items-center gap-2.5 pl-2">
            <img src="/assets/images/logo_transparent_2.png" alt="Sequoia" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tightest">Sequoia</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500 font-mono">Boat Rentals</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(n => (
              <a
                key={n.label}
                href={n.href}
                className="px-4 py-2 text-[13px] tracking-tight text-ink-700 hover:text-ink-900 rounded-full hover:bg-ink-900/5 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+12505557890"
              className="hidden md:inline-flex items-center gap-2 text-[13px] text-ink-700 hover:text-ink-900 px-3 py-2"
            >
              <Phone size={14} weight="duotone" />
              <span className="font-mono">(250) 555-7890</span>
            </a>
            <a
              href="#booking"
              className="press inline-flex items-center gap-2 rounded-full bg-ink-900 text-cream-50 px-4 py-2.5 text-[12px] tracking-[0.16em] uppercase font-medium hover:bg-ink-800"
            >
              Book Your Adventure
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yMedia  = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-ink-950 text-cream-50"
    >
      {/* Background video / image with parallax */}
      <motion.div style={{ y: yMedia, opacity }} className="absolute inset-0">
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/people_riding_boats_lakes.png"
        >
          <source src="/assets/videos/lake-video-background.mp4" type="video/mp4" />
        </video>
        {/* Tinted gradient — never pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/30 to-ink-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/55 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-16 min-h-[100dvh] flex flex-col">
        {/* Asymmetric grid — left aligned content, right asset region */}
        <div className="grid grid-cols-12 gap-6 flex-1 items-end">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5"
            >
              <span className="size-1.5 rounded-full bg-moss-400 animate-breathe" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-light text-cream-100/90">
                A Variety of Charters for Everyone
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display font-light tracking-tightest leading-[0.92]
                         text-[clamp(3.4rem,9vw,9rem)]"
            >
              Inspirational
              <br />
              <span className="italic font-extralight text-cream-100">Routes.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-cream-100/85"
            >
              Discover the pristine waters surrounding Kamloops with our eco-friendly inflatable boats. Each lake offers a unique experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-3 items-start"
            >
              <MagneticButton href="#booking" variant="moss">
                Book Your Adventure <ArrowRight size={14} weight="bold" />
              </MagneticButton>
              <a
                href="#lakes"
                className="press inline-flex items-center gap-2 rounded-full border border-cream-100/25 px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase font-medium text-cream-100 hover:bg-cream-100/5"
              >
                Explore the Lakes
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </motion.div>
          </div>

          {/* Stat bar — right side, asymmetric */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-12 md:col-span-3 lg:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-px bg-cream-100/15 rounded-2xl overflow-hidden glass-dark mt-10 md:mt-0"
          >
            {[
              { k: '06', v: 'Lakes serviced' },
              { k: '0g', v: 'CO₂ per cruise' },
              { k: '24/7', v: 'Concierge desk' },
            ].map(s => (
              <div key={s.k} className="bg-ink-950/40 px-4 py-4 md:py-5">
                <div className="font-mono text-2xl text-cream-50 tracking-tight">{s.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-cream-100/70">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row — partnership */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 pt-6 border-t border-cream-100/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-cream-100/70">
            <span>In partnership with</span>
            <img src="/assets/images/turo-logo.png" alt="Turo" className="h-5 w-auto opacity-90" />
          </div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cream-100/60 font-mono">
            <span>Kamloops, BC</span>
            <span className="opacity-50">/</span>
            <span>50.6745° N</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- WHY (Bento, NOT 3-card) ---------------- */
function WhyChooseUs() {
  // Bento 2.0 mosaic — anti 3-column rule
  const ICONS = [Leaf, Compass, ForkKnife, Truck, Lifebuoy, Calendar]
  return (
    <section id="why" className="relative py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <SectionHead
          kicker="Why Sequoia"
          title={<>Six reasons we keep<br/>your day on the water effortless.</>}
        />

        {/* Bento mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-[auto] gap-4 md:gap-5">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[i] || Leaf
            // Asymmetric spans
            const span = [
              'md:col-span-3 md:row-span-2',  // 0
              'md:col-span-3',                // 1
              'md:col-span-2',                // 2
              'md:col-span-2',                // 3
              'md:col-span-2',                // 4
              'md:col-span-3',                // 5  — wait, must = 12 per row pair
            ][i]
            return (
              <article
                key={f.title}
                className={`${span} rounded-3xl border border-ink-900/10 bg-cream-50 p-7 md:p-8 hover:border-ink-900/20 transition-colors group`}
              >
                <div className="flex items-start justify-between">
                  <span className="size-10 rounded-full bg-moss-50 border border-moss-700/15 flex items-center justify-center">
                    <Icon size={18} weight="duotone" className="text-moss-700" />
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-ink-400">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl tracking-tightest leading-tight font-medium text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-600 max-w-[44ch]">
                  {f.body}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <MagneticButton href="#booking" variant="solid">
            Book Your Adventure <ArrowRight size={14} weight="bold" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-ink-900 text-cream-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <SectionHead
          dark
          kicker="Our Services"
          title={<>Boats, concierge,<br/>and a few thoughtful extras.</>}
        />

        {/* A. Boat Rentals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 relative rounded-4xl overflow-hidden border border-cream-100/10">
            <img
              src="/assets/images/our_services/boat_rentals/ecoboat.jpg"
              alt="Electric eco-friendly inflatable boat"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              {[
                { Icon: BatteryHigh, label: '6+ hr battery' },
                { Icon: UsersThree, label: '2–4 seats' },
                { Icon: Leaf,        label: 'Zero emissions' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cream-100/90"
                >
                  <Icon size={13} weight="duotone" /> {label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-moss-300">
              A. Boat Rentals
            </span>
            <h3 className="mt-3 text-3xl md:text-4xl tracking-tightest leading-tight font-light">
              Electric, Eco-friendly Inflatable Boats
            </h3>
            <p className="mt-4 text-[15px] text-cream-100/75 max-w-[55ch] leading-relaxed">
              Our premium electric boats provide a quiet, peaceful experience that lets you connect with nature without disturbing it.
            </p>
            <ul className="mt-6 divide-y divide-cream-100/10">
              {RENTAL_FEATURES.map(f => (
                <li key={f} className="py-3 flex items-start gap-3 text-[14px] text-cream-100/85">
                  <Plus size={14} weight="bold" className="text-moss-300 mt-1" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing table */}
        <div className="mt-16 rounded-4xl border border-cream-100/10 overflow-hidden">
          <div className="grid grid-cols-12 px-6 md:px-8 py-5 border-b border-cream-100/10 text-[11px] uppercase tracking-[0.2em] text-cream-100/55 font-mono">
            <div className="col-span-6 md:col-span-5">Duration</div>
            <div className="col-span-3 md:col-span-3 text-right md:text-left">Weekday</div>
            <div className="col-span-3 md:col-span-4 text-right md:text-left">Weekend</div>
          </div>
          {PRICING.map((row, i) => (
            <div key={i} className="grid grid-cols-12 items-center px-6 md:px-8 py-5 border-b border-cream-100/5 last:border-b-0 hover:bg-cream-100/[0.03] transition-colors">
              <div className="col-span-6 md:col-span-5 text-[15px] tracking-tight">{row.duration}</div>
              <div className="col-span-3 md:col-span-3 text-right md:text-left">
                <div className="font-mono text-lg">{row.weekday}</div>
                {row.weekdaySave && (
                  <div className="text-[11px] text-moss-300 uppercase tracking-widest">{row.weekdaySave}</div>
                )}
              </div>
              <div className="col-span-3 md:col-span-4 text-right md:text-left">
                <div className="font-mono text-lg">{row.weekend}</div>
                {row.weekendSave && (
                  <div className="text-[11px] text-moss-300 uppercase tracking-widest">{row.weekendSave}</div>
                )}
              </div>
            </div>
          ))}
          <div className="px-6 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[12px] text-cream-100/65 bg-ink-950/40">
            <span>All rentals include life jackets &amp; paddles.</span>
            <span className="text-moss-300">Tip — Book longer durations for better hourly rates.</span>
          </div>
        </div>

        {/* Policies */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-moss-300">
              Rental policies
            </span>
            <h4 className="mt-3 text-2xl md:text-3xl tracking-tightest leading-tight font-light">
              Quick, transparent, and built around safety.
            </h4>
          </div>
          <ul className="lg:col-span-7 divide-y divide-cream-100/10 border-y border-cream-100/10">
            {POLICIES.map(p => (
              <li key={p} className="py-4 flex items-start gap-4 text-[14px] text-cream-100/85">
                <ShieldCheck size={18} weight="duotone" className="text-moss-300 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* B. Concierge — zig-zag (anti-3-col) */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-moss-300">
                B. Concierge Services
              </span>
              <h3 className="mt-3 text-3xl md:text-4xl tracking-tightest font-light">
                Make the day yours.
              </h3>
            </div>
            <p className="hidden md:block max-w-[36ch] text-[13px] text-cream-100/70">
              Free delivery to popular lakes. Beyond the free zone: $50 per 100 km from Kamloops, or anywhere in BC for a fee.
            </p>
          </div>
          <div className="space-y-6 md:space-y-3">
            {CONCIERGE.map((c, i) => (
              <ConciergeRow key={c.title} item={c} index={i} flip={i % 2 === 1} />
            ))}
          </div>

          {/* License assistance note */}
          <div className="mt-8 glass-dark rounded-3xl p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="size-9 rounded-full bg-moss-700/30 flex items-center justify-center">
                <ShieldCheck size={16} weight="duotone" className="text-moss-200" />
              </span>
              <div>
                <p className="text-[15px] font-medium">Boating License Assistance</p>
                <p className="text-[13px] text-cream-100/70 max-w-[60ch]">
                  For customers without a license, we help obtain a temporary one.
                </p>
              </div>
            </div>
            <a href="#booking" className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-moss-200 hover:text-cream-50">
              Add to booking <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>

        {/* C. Add-ons — horizontal scroll gallery (anti-3-col) */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-moss-300">
                C. Add-ons
              </span>
              <h3 className="mt-3 text-3xl md:text-4xl tracking-tightest font-light">
                Extras worth packing.
              </h3>
            </div>
            <span className="hidden md:inline text-[11px] uppercase tracking-[0.2em] text-cream-100/55 font-mono">
              {String(ADDONS.length).padStart(2,'0')} · drag to scroll →
            </span>
          </div>

          <div className="-mx-4 md:-mx-8 px-4 md:px-8 overflow-x-auto pb-4 [scrollbar-width:thin]">
            <div className="flex gap-5 min-w-max">
              {ADDONS.map((a, i) => (
                <article
                  key={a.title}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-3xl border border-cream-100/10 bg-ink-950/30 overflow-hidden group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-ink-950">
                    <img
                      src={a.img}
                      alt={a.title}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-[16px] font-medium tracking-tight">{a.title}</h4>
                      <span className="font-mono text-sm text-moss-200">{a.price}</span>
                    </div>
                    <p className="mt-1.5 text-[13px] text-cream-100/70 leading-relaxed">{a.desc}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-cream-100/55 font-mono">
                      <span>add-on /{String(i+1).padStart(2,'0')}</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConciergeRow({ item, index, flip }) {
  return (
    <div className={`grid grid-cols-12 gap-4 md:gap-8 items-stretch py-4`}>
      <div className={`col-span-12 md:col-span-5 ${flip ? 'md:order-2' : ''}`}>
        <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-cream-100/10">
          <img src={item.img} alt={item.title} className="size-full object-cover" loading="lazy" />
        </div>
      </div>
      <div className={`col-span-12 md:col-span-7 flex flex-col justify-center ${flip ? 'md:order-1 md:pr-12' : 'md:pl-4'}`}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-widest text-cream-100/45">/{String(index+1).padStart(2,'0')}</span>
          <h4 className="text-2xl md:text-3xl tracking-tightest font-light">{item.title}</h4>
        </div>
        <p className="mt-3 text-[14px] text-cream-100/75 leading-relaxed max-w-[58ch]">{item.desc}</p>
        <div className="mt-5 inline-flex items-center gap-3">
          <span className="font-mono text-[15px] text-moss-200">{item.price}</span>
          <span className="hairline w-24" />
        </div>
      </div>
    </div>
  )
}

/* ---------------- LAKES ---------------- */
function LakesSection() {
  return (
    <section id="lakes" className="relative py-24 md:py-36 bg-cream-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 lg:col-span-7">
            <SectionHead
              kicker="Lakes We Service"
              title={<>Six lakes, each with<br/>its own slow story.</>}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-ink-900/10 bg-cream-50">
              <img
                src="/assets/images/Map of Kamloops area lakes.png"
                alt="Map of Kamloops area lakes"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <LakeAccordion lakes={LAKES} />

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[13px] text-ink-600 max-w-[60ch]">
            Free delivery to popular lakes. Beyond the free zone: $50 per 100 km from Kamloops, or anywhere in BC for a fee.
          </p>
          <MagneticButton href="#booking" variant="solid">
            Reserve a lake <ArrowRight size={14} weight="bold" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

/* ---------------- BOOKING SECTION ---------------- */
function BookingSection() {
  return (
    <section id="booking" className="relative py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <SectionHead
          kicker="Quick Booking"
          title={<>Hold a slot in<br/>under a minute.</>}
        />
        <BookingForm />
      </div>
    </section>
  )
}

/* ---------------- TURO ---------------- */
function Turo() {
  return (
    <section id="turo" className="relative py-24 md:py-36 bg-ink-950 text-cream-50 overflow-hidden">
      {/* Soft accent background — no neon glow, just tinted gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(48,87,57,0.18),transparent_60%)] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-moss-300">
              Partnership / Drive
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl tracking-tightest font-light leading-[0.95]">
              Our Partnership <br/>with <span className="italic font-extralight">Turo</span>.
            </h2>
            <p className="mt-5 text-[16px] text-cream-100/75 max-w-[42ch] leading-relaxed">
              Explore Beyond the Lakes with Premium Vehicle Rentals
            </p>
            <div className="mt-6 inline-flex items-center gap-3 glass-dark rounded-full px-3 py-2">
              <img src="/assets/images/turo-logo.png" alt="Turo" className="h-4" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream-100/75">Verified host</span>
            </div>

            <ul className="mt-10 divide-y divide-cream-100/10 border-y border-cream-100/10">
              {TURO_BENEFITS.map((b, i) => (
                <li key={b.title} className="py-5 grid grid-cols-12 gap-3">
                  <span className="col-span-1 font-mono text-[11px] text-cream-100/45 mt-1">/{String(i+1).padStart(2,'0')}</span>
                  <div className="col-span-11">
                    <p className="text-[15px] font-medium">{b.title}</p>
                    <p className="text-[13px] text-cream-100/70 mt-1 max-w-[55ch]">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start">
              <MagneticButton
                href={TURO_URL}
                variant="moss"
                onClick={() => {}}
              >
                Book Our Mazda CX-5 on Turo
                <ArrowUpRight size={14} weight="bold" />
              </MagneticButton>
              <span className="text-[12px] text-cream-100/55 self-center">
                All inclusive pricing with no hidden fees.
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative rounded-5xl overflow-hidden border border-cream-100/10 bg-gradient-to-br from-ink-900 to-ink-950 p-6 md:p-10">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-cream-100/55 font-mono">
                <span>2021 / Mazda CX-5</span>
                <span>SUV · 5 seats</span>
              </div>
              <img
                src="/assets/images/maz.png"
                alt="2021 Mazda CX-5"
                className="w-full max-w-[640px] mx-auto my-8 animate-floaty"
              />
              <div className="grid grid-cols-3 gap-px bg-cream-100/10 rounded-2xl overflow-hidden glass-dark">
                {[
                  { k: '4.96', v: 'Host rating' },
                  { k: '147', v: 'Trips' },
                  { k: '24/7', v: 'Roadside' },
                ].map(s => (
                  <div key={s.k} className="bg-ink-950/40 px-4 py-4 text-center">
                    <div className="font-mono text-2xl text-cream-50">{s.k}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream-100/65">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-cream-50 overflow-hidden">
      <img
        src="/assets/images/about_us_bg.png"
        alt=""
        aria-hidden="true"
        className="absolute -right-32 top-10 w-[60%] max-w-[800px] opacity-[0.06] mix-blend-multiply pointer-events-none"
      />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-500">
              About Us
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl tracking-tightest font-light leading-[0.98] text-ink-900">
              Your Gateway to <br/>
              <span className="italic font-extralight">Kamloops Lake Adventures.</span>
            </h2>
            <p className="mt-6 text-[15px] text-ink-700 max-w-[55ch] leading-relaxed">
              At Sequoia Boat Rentals, we offer electric, eco-friendly inflatable boats to explore the pristine waters around Kamloops. From Heffley Lake to Shuswap, we make your lake adventure unforgettable.
            </p>

            <div className="mt-8 rounded-3xl overflow-hidden border border-ink-900/10">
              <img src="/assets/images/happy_customer.jpg" alt="Happy customers" className="w-full aspect-[16/10] object-cover" loading="lazy" />
            </div>
          </div>

          <ul className="col-span-12 lg:col-span-7 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {TRUST_PILLARS.map((t, i) => (
              <li key={t.title} className="py-6 grid grid-cols-12 gap-4 items-start group hover:bg-ink-900/[0.02] transition-colors">
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-widest text-ink-400 mt-1">
                  /{String(i+1).padStart(2,'0')}
                </span>
                <div className="col-span-10 md:col-span-7">
                  <p className="text-2xl tracking-tightest font-medium text-ink-900">{t.title}</p>
                  <p className="mt-1 text-[14px] text-ink-600 leading-relaxed">{t.body}</p>
                </div>
                <div className="hidden md:flex col-span-4 items-center justify-end">
                  <ArrowUpRight size={20} weight="light" className="text-ink-400 group-hover:text-moss-700 transition-colors" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer id="footer" className="bg-ink-950 text-cream-100 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-10 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/assets/images/logo_transparent_2.png" alt="Sequoia" className="h-12 w-auto" />
              <div>
                <p className="text-xl tracking-tightest font-medium text-cream-50">Sequoia</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream-100/55 font-mono">
                  Boat Rentals &amp; Concierge
                </p>
              </div>
            </div>
            <p className="mt-6 text-[15px] text-cream-100/70 max-w-[42ch] leading-relaxed">
              Eco-friendly inflatable boat rentals on Kamloops' most beautiful lakes.
            </p>

            <div className="mt-8 space-y-3 text-[14px]">
              <div className="flex items-center gap-2.5 text-cream-100/85">
                <MapPin size={16} weight="duotone" className="text-moss-300" />
                Kamloops, BC, Canada
              </div>
              <a href="tel:+12505557890" className="flex items-center gap-2.5 text-cream-100/85 hover:text-cream-50">
                <Phone size={16} weight="duotone" className="text-moss-300" />
                <span className="font-mono">(250) 555-7890</span>
              </a>
              <a href="https://sequoiaservices.ca" className="flex items-center gap-2.5 text-cream-100/85 hover:text-cream-50">
                <Compass size={16} weight="duotone" className="text-moss-300" />
                sequoiaservices.ca
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {[
                { Icon: FacebookLogo,  href: '#', label: 'Facebook' },
                { Icon: InstagramLogo, href: '#', label: 'Instagram' },
                { Icon: TwitterLogo,   href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="press size-10 rounded-full border border-cream-100/15 hover:border-moss-300 hover:bg-cream-100/5 flex items-center justify-center text-cream-100/85"
                >
                  <Icon size={16} weight="duotone" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            className="col-span-6 md:col-span-4 lg:col-span-2"
            heading="Explore"
            links={['Home', 'Services', 'Lakes', 'Booking', 'About']}
            hrefs={['#home', '#services', '#lakes', '#booking', '#about']}
          />
          <FooterCol
            className="col-span-6 md:col-span-4 lg:col-span-2"
            heading="Lakes"
            links={['Heffley', 'Paul', 'Monte', 'Shuswap', 'Kamloops', 'Lac Le Jeune']}
            hrefs={['#lakes','#lakes','#lakes','#lakes','#lakes','#lakes']}
          />
          <FooterCol
            className="col-span-12 md:col-span-4 lg:col-span-3"
            heading="Company"
            links={['About', 'Contact', 'Terms & Conditions', 'Privacy Policy']}
            hrefs={['#about','#footer','#','#']}
          />
        </div>

        <div className="hairline mt-16" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-cream-100/50 font-mono uppercase tracking-[0.18em]">
          <span>© 2026 Sequoia Boat Rentals &amp; Concierge Services. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-moss-400 animate-breathe" />
            Open · Kamloops BC
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ heading, links, hrefs, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-cream-100/50 font-mono">{heading}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l, i) => (
          <li key={l}>
            <a href={hrefs?.[i] ?? '#'} className="text-[14px] text-cream-100/85 hover:text-cream-50">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------- SECTION HEAD ---------------- */
function SectionHead({ kicker, title, dark = false }) {
  return (
    <div className="mb-14 md:mb-20 max-w-[1400px]">
      <span className={`text-[11px] font-mono uppercase tracking-[0.22em] ${dark ? 'text-moss-300' : 'text-ink-500'}`}>
        {kicker}
      </span>
      <h2 className={`mt-4 text-4xl md:text-6xl tracking-tightest leading-[0.98] font-light ${dark ? 'text-cream-50' : 'text-ink-900'}`}>
        {title}
      </h2>
    </div>
  )
}

/* ---------------- APP ---------------- */
export default function App() {
  return (
    <div className="grain-overlay">
      <Header />
      <main>
        <Hero />
        <Marquee items={[
          'Heffley Lake',
          'Paul Lake',
          'Monte Lake',
          'Shuswap Lake',
          'Kamloops Lake',
          'Lac Le Jeune',
          'Free Delivery',
          'Zero Emissions',
          'Concierge On-call',
        ]} />
        <WhyChooseUs />
        <Services />
        <LakesSection />
        <BookingSection />
        <Turo />
        <About />
      </main>
      <Footer />
    </div>
  )
}
