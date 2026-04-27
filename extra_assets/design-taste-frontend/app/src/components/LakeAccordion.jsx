// Accordion image strip — skill arsenal "Accordion Image Slider"
// Asymmetric reveal; horizontal fr-grid that responds to active index
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'

export default function LakeAccordion({ lakes }) {
  const [active, setActive] = useState(0)

  return (
    <div className="w-full">
      {/* Desktop: horizontal accordion strip */}
      <div className="hidden md:flex w-full gap-2 h-[560px]">
        {lakes.map((l, i) => {
          const isActive = i === active
          return (
            <motion.button
              key={l.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              animate={{ flexGrow: isActive ? 4 : 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="relative overflow-hidden rounded-3xl group focus:outline-none"
              style={{ flexBasis: 0 }}
              aria-label={`Show ${l.name}`}
            >
              <img
                src={l.images[0]}
                alt={l.name}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-cream-50 text-left">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-widest opacity-70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight
                    size={18}
                    weight="light"
                    className={`transition-opacity ${isActive ? 'opacity-90' : 'opacity-0'}`}
                  />
                </div>
                <h3 className="mt-2 text-2xl md:text-3xl tracking-tightest leading-none font-medium">
                  {l.name}
                </h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-3 text-[13px] leading-relaxed text-cream-100/90 max-w-[55ch]"
                    >
                      {l.distance}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Active lake description (desktop) */}
      <div className="hidden md:block mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={lakes[active].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-8 items-start"
          >
            <div className="col-span-3">
              <span className="font-mono text-[11px] tracking-widest text-ink-500 uppercase">
                Lake {String(active + 1).padStart(2, '0')} / {String(lakes.length).padStart(2, '0')}
              </span>
              <h4 className="mt-3 text-3xl tracking-tightest leading-none font-medium text-ink-900">
                {lakes[active].name}
              </h4>
              <p className="mt-3 text-sm text-ink-500">{lakes[active].distance}</p>
            </div>
            <p className="col-span-9 text-[15px] leading-relaxed text-ink-700 max-w-[68ch]">
              {lakes[active].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: vertical stacked cards (skill mobile override) */}
      <div className="md:hidden flex flex-col gap-6">
        {lakes.map((l, i) => (
          <article key={l.id} className="rounded-3xl overflow-hidden border border-ink-900/10 bg-cream-50">
            <div className="relative aspect-[4/3]">
              <img src={l.images[0]} alt={l.name} className="absolute inset-0 size-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                <span className="font-mono text-[10px] tracking-widest opacity-80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl tracking-tightest font-medium">{l.name}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-mono uppercase tracking-widest text-ink-500">{l.distance}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{l.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
