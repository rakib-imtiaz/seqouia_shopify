import { useEffect, useRef, useState, useCallback } from "react";

/**
 * BookingPackagePicker — Build A (Sequoia, editorial PNW journal)
 *
 * React 18 caveat: the experimental `<ViewTransition>` component and React's
 * `addTransitionType` only ship in React 19 / canary. To avoid forcing a
 * canary upgrade, we drive transitions through the native browser API
 * (`document.startViewTransition`) which the `react-view-transitions` package
 * also wraps. We expose directional intent via the standard `types` argument
 * (Chromium 125+) AND via a `data-vt-direction` attribute on <html> as a
 * polyfill for browsers/older Chromium that ignore the `types` field. CSS
 * pseudo-elements then read either signal to drive directional animation.
 *
 * Hooks into:
 *   - Shared element: copper hairline (view-transition-name: pkg-indicator)
 *     morphs between the active card.
 *   - Directional reveal: the preview panel (view-transition-name: pkg-preview)
 *     slides from the right on "forward", from the left on "back".
 *   - Cross-fade: the price + name within the preview cross-fade through the
 *     same group while the panel slides.
 */

const startVT = (cb, types = []) => {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No browser support OR user prefers reduced motion → just commit.
  if (reduce || typeof document === "undefined" || !document.startViewTransition) {
    cb();
    return;
  }

  // Annotate <html> so CSS can pick a directional class (polyfill for
  // browsers that don't yet honor the `types` argument).
  const root = document.documentElement;
  const prev = root.getAttribute("data-vt-direction");
  if (types[0]) root.setAttribute("data-vt-direction", types[0]);

  // Pass `types` for engines that support it (Chrome 125+, the same shape
  // React's addTransitionType eventually compiles down to).
  let transition;
  try {
    transition = document.startViewTransition({ update: cb, types });
  } catch {
    // Older signature fallback.
    transition = document.startViewTransition(cb);
  }

  transition.finished.finally(() => {
    if (prev) root.setAttribute("data-vt-direction", prev);
    else root.removeAttribute("data-vt-direction");
  });
};

export default function BookingPackagePicker({ packages = [], value = 0, onChange }) {
  const [internal, setInternal] = useState(value);
  const active = onChange ? value : internal;
  const prevRef = useRef(active);

  // Inject CSS once — keeps the component self-contained.
  useEffect(() => {
    if (document.getElementById("booking-package-picker-vt")) return;
    const style = document.createElement("style");
    style.id = "booking-package-picker-vt";
    style.textContent = VT_CSS;
    document.head.appendChild(style);
  }, []);

  const select = useCallback(
    (next) => {
      if (next === active) return;
      const direction = next > prevRef.current ? "forward" : "back";
      startVT(() => {
        if (onChange) onChange(next);
        else setInternal(next);
        prevRef.current = next;
      }, [direction]);
    },
    [active, onChange]
  );

  const selected = packages[active];

  return (
    <div className="bppx">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15 border border-ink/15 mb-12">
        {packages.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => select(i)}
              aria-pressed={isActive}
              className={`relative text-left p-8 transition-colors duration-500 group ${
                isActive ? "bg-ink text-bone" : "bg-bone hover:bg-paper"
              }`}
            >
              {/* Shared element: copper hairline indicator that morphs between cards */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px bg-copper"
                  style={{ viewTransitionName: "pkg-indicator" }}
                />
              )}
              <div className="flex items-center justify-between mb-6">
                <span className="numeral tnum text-[11px] tracking-widest text-copper">
                  PKG · 0{i + 1}
                </span>
                <span
                  className={`relative flex w-3 h-3 rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "bg-copper border-copper"
                      : "border-ink/40 group-hover:border-copper"
                  }`}
                  style={isActive ? { viewTransitionName: "pkg-dot" } : undefined}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-copper status-ring" />
                  )}
                </span>
              </div>
              <div className="font-display text-3xl mb-2">{p.name}</div>
              <div className={`text-[13px] ${isActive ? "text-bone/65" : "text-ink/65"}`}>
                {p.spec}
              </div>
              <div className="numeral tnum text-4xl mt-6 text-copper">{p.price}</div>
            </button>
          );
        })}
      </div>

      {/* Directional preview panel */}
      {selected && (
        <div
          key={`preview-${active}`}
          className="bppx-preview relative border border-ink/15 bg-paper/60 p-8 md:p-10 grid grid-cols-12 gap-6 mb-10"
          style={{ viewTransitionName: "pkg-preview" }}
        >
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex w-2 h-2">
                <span className="status-ring absolute inset-0 rounded-full bg-copper" />
                <span className="status-dot relative w-2 h-2 rounded-full bg-copper" />
              </span>
              <span className="eyebrow text-copper">Now reserved · {selected.name}</span>
            </div>
            <h3
              className="font-display text-[clamp(28px,4vw,48px)] leading-[1.02] text-ink"
              style={{ viewTransitionName: "pkg-preview-name" }}
            >
              {selected.name}
            </h3>
            <p className="text-ink/65 text-[14px] mt-3 max-w-md">{selected.spec}</p>
            <div className="mt-6 flex items-center gap-4 text-[11px] tracking-widest text-ink/55 uppercase">
              <span>PKG · 0{active + 1} of {packages.length}</span>
              <span className="h-px w-8 bg-ink/25" />
              <span>Instant confirmation</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:border-l md:border-ink/15 md:pl-8 flex flex-col justify-between">
            <div>
              <div className="eyebrow text-ink/55">Total</div>
              <div
                className="numeral tnum text-4xl text-copper mt-2"
                style={{ viewTransitionName: "pkg-preview-price" }}
              >
                {selected.price}
              </div>
              <div className="text-ink/55 text-[12px] mt-2">
                Free cancellation up to 24 hrs prior
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-ink/15 flex items-baseline justify-between">
              <span className="eyebrow text-ink/55 text-[10px]">Selection</span>
              <span className="numeral tnum text-ink text-[13px]">
                0{active + 1} / 0{packages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* CSS for view transition pseudo-elements — directional via [data-vt-direction] on <html>
   as well as the native :active-view-transition-type() selector. */
const VT_CSS = `
::view-transition-group(pkg-indicator),
::view-transition-group(pkg-dot) { animation-duration: 460ms; animation-timing-function: cubic-bezier(.2,.7,.2,1); }
::view-transition-old(pkg-preview), ::view-transition-new(pkg-preview),
::view-transition-old(pkg-preview-name), ::view-transition-new(pkg-preview-name),
::view-transition-old(pkg-preview-price), ::view-transition-new(pkg-preview-price) { animation-duration: 460ms; animation-timing-function: cubic-bezier(.2,.7,.2,1); }
@keyframes bppx-slide-from-right { from { transform: translateX(28px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes bppx-slide-to-left    { from { transform: translateX(0);    opacity: 1; } to { transform: translateX(-28px); opacity: 0; } }
@keyframes bppx-slide-from-left  { from { transform: translateX(-28px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes bppx-slide-to-right   { from { transform: translateX(0);    opacity: 1; } to { transform: translateX(28px); opacity: 0; } }
[data-vt-direction="forward"]::view-transition-new(pkg-preview),
[data-vt-direction="forward"]::view-transition-new(pkg-preview-name),
[data-vt-direction="forward"]::view-transition-new(pkg-preview-price) { animation-name: bppx-slide-from-right; }
[data-vt-direction="forward"]::view-transition-old(pkg-preview),
[data-vt-direction="forward"]::view-transition-old(pkg-preview-name),
[data-vt-direction="forward"]::view-transition-old(pkg-preview-price) { animation-name: bppx-slide-to-left; }
[data-vt-direction="back"]::view-transition-new(pkg-preview),
[data-vt-direction="back"]::view-transition-new(pkg-preview-name),
[data-vt-direction="back"]::view-transition-new(pkg-preview-price) { animation-name: bppx-slide-from-left; }
[data-vt-direction="back"]::view-transition-old(pkg-preview),
[data-vt-direction="back"]::view-transition-old(pkg-preview-name),
[data-vt-direction="back"]::view-transition-old(pkg-preview-price) { animation-name: bppx-slide-to-right; }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
`;
