// Isolated client-only motion component (Skill §2 Interactivity Isolation)
import React from 'react'

function MarqueeImpl({ items }) {
  // Doubled track for seamless infinite loop
  const list = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-ink-900/10 bg-ink-900 text-cream-50 select-none">
      <div className="marquee-track animate-marquee py-5">
        {list.map((it, i) => (
          <span
            key={i}
            className="mx-10 inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase font-light"
          >
            <span className="size-1.5 rounded-full bg-moss-400 animate-breathe" />
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

export default React.memo(MarqueeImpl)
