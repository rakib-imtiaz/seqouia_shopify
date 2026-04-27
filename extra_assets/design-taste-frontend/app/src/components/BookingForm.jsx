// Booking form preview — skill §3 Rule 6 (label above input, helper, error states)
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Lightning, Tag, Warning } from '@phosphor-icons/react'
import { PACKAGES, LAKES, ADDONS } from '../data'

const ADDON_KEYS = ['cooler', 'speaker', 'drybags', 'gopro', 'fishing', 'beachkit']
const ADDON_LABELS = {
  cooler:  'Cooler',
  speaker: 'JBL Speaker',
  drybags: 'Dry Bags',
  gopro:   'GoPro',
  fishing: 'Fishing Gear',
  beachkit:'Beach Kit',
}

export default function BookingForm() {
  const [pkg, setPkg]         = useState('lite')
  const [lake, setLake]       = useState(LAKES[0].id)
  const [boat, setBoat]       = useState('single')
  const [duration, setDuration] = useState('2')
  const [addons, setAddons]   = useState([])
  const [date, setDate]       = useState('')
  const [time, setTime]       = useState('')
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [errors, setErrors]   = useState({})

  const toggleAddon = (k) =>
    setAddons(s => (s.includes(k) ? s.filter(x => x !== k) : [...s, k]))

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!date) errs.date = 'Pick a date'
    if (!time) errs.time = 'Pick a time'
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus('error')
      return
    }
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1100)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Promo strip */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28">
        <div className="glass rounded-4xl p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-moss-700/30 bg-moss-50 px-3 py-1">
            <Lightning size={14} weight="fill" className="text-moss-700" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-moss-700">
              Limited time
            </span>
          </div>
          <h3 className="mt-5 text-3xl tracking-tightest leading-none font-medium">
            Free add-ons<br/>this season.
          </h3>
          <p className="mt-3 text-sm text-ink-600 max-w-[34ch]">
            Bundle a cooler, JBL speaker, or dry bag with any 4-hour rental — on the house.
          </p>

          <div className="mt-7 space-y-3 text-sm">
            {[
              'Instant confirmation',
              'Free cancellation',
              'Safety gear included',
              'No hidden fees',
            ].map(t => (
              <div key={t} className="flex items-center gap-2 text-ink-700">
                <CheckCircle size={16} weight="duotone" className="text-moss-600" />
                {t}
              </div>
            ))}
          </div>

          <div className="hairline my-7" />

          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-500 font-mono">Quick estimate</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-ink-700">Selected package</span>
            <span className="font-mono text-2xl text-ink-900">
              {PACKAGES.find(p => p.id === pkg)?.price ?? '—'}
            </span>
          </div>
        </div>
      </aside>

      {/* Form */}
      <form onSubmit={submit} className="lg:col-span-8 rounded-4xl bg-cream-50 border border-ink-900/10 p-6 sm:p-9 shadow-soft">
        {/* Package selection */}
        <fieldset className="space-y-3">
          <legend className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-500 mb-3">
            01 / Choose a package
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PACKAGES.map(p => {
              const sel = pkg === p.id
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPkg(p.id)}
                  className={`press text-left rounded-2xl border p-4 transition-colors ${
                    sel
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-900/15 bg-cream-50 hover:border-ink-900/30'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[15px] font-medium tracking-tight">{p.name}</span>
                    <span className="font-mono text-sm">{p.price}</span>
                  </div>
                  <p className={`mt-1 text-xs ${sel ? 'text-cream-100/80' : 'text-ink-500'}`}>{p.summary}</p>
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setPkg('custom')}
              className={`press text-left rounded-2xl border p-4 transition-colors ${
                pkg === 'custom'
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-900/15 bg-cream-50 hover:border-ink-900/30'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-medium tracking-tight">Custom Trip</span>
                <Tag size={16} weight="duotone" />
              </div>
              <p className={`mt-1 text-xs ${pkg === 'custom' ? 'text-cream-100/80' : 'text-ink-500'}`}>
                Pick your own lake, boat, and duration below.
              </p>
            </button>
          </div>
        </fieldset>

        <div className="hairline my-8" />

        {/* Lake + Boat + Duration grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Choose a Lake" id="lake" helper="Free delivery to popular lakes.">
            <select
              id="lake"
              value={lake}
              onChange={e => setLake(e.target.value)}
              className="w-full rounded-xl border border-ink-900/15 bg-cream-50 px-4 py-3 text-[15px]"
            >
              {LAKES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </Field>

          <Field label="Boat Type" id="boat">
            <div className="grid grid-cols-2 gap-3">
              <Toggle active={boat === 'single'} onClick={() => setBoat('single')}>
                <span className="block text-[14px] font-medium">Single Boat</span>
                <span className="block text-[11px] text-ink-500">1–2 people</span>
              </Toggle>
              <Toggle active={boat === 'family'} onClick={() => setBoat('family')}>
                <span className="block text-[14px] font-medium">Family Boat</span>
                <span className="block text-[11px] text-ink-500">3–4 people</span>
              </Toggle>
            </div>
          </Field>

          <Field label="Rental Duration" id="duration">
            <div className="grid grid-cols-4 gap-2">
              {['2','4','6','8'].map(d => (
                <Toggle key={d} active={duration === d} onClick={() => setDuration(d)}>
                  <span className="font-mono text-sm">{d}h</span>
                </Toggle>
              ))}
            </div>
          </Field>

          <Field label="Date & Time" id="dt">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={`rounded-xl border px-4 py-3 text-[14px] bg-cream-50 ${errors.date ? 'border-rose-500' : 'border-ink-900/15'}`}
              />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className={`rounded-xl border px-4 py-3 text-[14px] bg-cream-50 ${errors.time ? 'border-rose-500' : 'border-ink-900/15'}`}
              />
            </div>
            {(errors.date || errors.time) && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-rose-600">
                <Warning size={14} weight="fill" /> Please select date and time.
              </p>
            )}
          </Field>
        </div>

        <div className="hairline my-8" />

        {/* Add-ons */}
        <fieldset>
          <legend className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-500 mb-3">
            02 / Add-ons
          </legend>
          <div className="flex flex-wrap gap-2">
            {ADDON_KEYS.map(k => {
              const sel = addons.includes(k)
              return (
                <button
                  type="button"
                  key={k}
                  onClick={() => toggleAddon(k)}
                  className={`press rounded-full border px-4 py-2 text-[13px] transition-colors ${
                    sel
                      ? 'border-moss-700 bg-moss-700 text-cream-50'
                      : 'border-ink-900/15 hover:border-ink-900/30'
                  }`}
                >
                  {ADDON_LABELS[k]}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-[12px] text-ink-500">
            By checking, you agree to our rental policies.
          </div>
          <button
            type="submit"
            className="press inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-cream-50 px-7 py-3.5 text-[13px] tracking-[0.16em] uppercase font-medium hover:bg-ink-800 disabled:opacity-60"
            disabled={status === 'loading'}
          >
            {status === 'loading' && (
              <span className="size-3 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin" />
            )}
            {status === 'success' ? 'Held — we\'ll be in touch' : 'Check Availability'}
          </button>
        </div>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-moss-700/30 bg-moss-50 px-4 py-3 text-[13px] text-moss-700"
            >
              <CheckCircle size={16} weight="fill" />
              Slot held. We'll confirm by phone within 30 minutes.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

function Field({ label, id, helper, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-500">
        {label}
      </label>
      {children}
      {helper && <p className="text-[11px] text-ink-500">{helper}</p>}
    </div>
  )
}

function Toggle({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press w-full rounded-xl border px-3 py-3 text-left transition-colors ${
        active
          ? 'border-ink-900 bg-ink-900 text-cream-50'
          : 'border-ink-900/15 hover:border-ink-900/30 bg-cream-50'
      }`}
    >
      {children}
    </button>
  )
}
