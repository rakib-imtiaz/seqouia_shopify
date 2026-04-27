// Skill §4 Magnetic Micro-physics — uses Framer useMotionValue (NOT useState)
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function MagneticButtonImpl({ children, href = '#', onClick, variant = 'solid', className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 })
  const tx = useTransform(sx, v => v * 0.18)
  const ty = useTransform(sy, v => v * 0.18)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - (r.left + r.width / 2))
    my.set(e.clientY - (r.top + r.height / 2))
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  const styles =
    variant === 'solid'
      ? 'bg-ink-900 text-cream-50 hover:bg-ink-800 border-ink-900'
      : variant === 'moss'
        ? 'bg-moss-700 text-cream-50 hover:bg-moss-600 border-moss-700'
        : 'bg-transparent text-ink-900 hover:bg-ink-900/5 border-ink-900/20'

  const Tag = href ? motion.a : motion.button

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      className={`press inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase font-medium ${styles} ${className}`}
    >
      {children}
    </Tag>
  )
}

export default React.memo(MagneticButtonImpl)
