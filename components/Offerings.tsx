"use client";

import { useEffect, useState } from "react";
import { offerings, type OfferingId } from "@/data/offerings";
import { BroadcastVisual, ConversationVisual, KeypadVisual } from "./OfferVisuals";

const visuals: Record<OfferingId, React.ComponentType<{ accent: string }>> = {
  "one-way": BroadcastVisual,
  avr: KeypadVisual,
  "two-way": ConversationVisual,
};

const ROTATE_MS = 9000;

// Fits in one screen: pick an offering on the left, its phone + details swap in on the right.
export default function Offerings() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userPicked, setUserPicked] = useState(false);

  // Cycle through the three until the visitor picks one
  useEffect(() => {
    if (userPicked || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActiveIdx((i) => (i + 1) % offerings.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [activeIdx, userPicked]);

  const pick = (i: number) => {
    setActiveIdx(i);
    setUserPicked(true);
  };

  const o = offerings[activeIdx];
  const Visual = visuals[o.id];

  return (
    <section
      id="offerings"
      className="mx-auto flex max-w-[1200px] flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[calc(100svh-72px)] lg:py-8"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
        {/* Left: heading + picker */}
        <div data-reveal>
          <p className="text-gradient text-sm font-medium tracking-wide">What we offer</p>
          <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-medium tracking-[-0.03em]">
            Three ways to <em className="text-gradient pr-[0.06em] font-serif font-normal tracking-normal">call</em>
          </h2>
          <p className="mt-4 max-w-[340px] text-base leading-relaxed text-muted">
            From simple announcements to full conversations — pick how deep each call should go.
          </p>

          <div role="tablist" aria-label="Offerings" className="mt-8 flex gap-2 overflow-x-auto [scrollbar-width:none] lg:mt-10 lg:flex-col lg:gap-0">
            {offerings.map((item, i) => {
              const on = i === activeIdx;
              return (
                <button
                  key={item.id}
                  role="tab"
                  id={`offer-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="offer-panel"
                  onClick={() => pick(i)}
                  className={`group relative shrink-0 rounded-md border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-5 lg:last:border-b ${
                    on ? "border-brand/50 bg-brand/10 lg:border-line lg:bg-transparent" : "border-line lg:border-line"
                  }`}
                >
                  {/* Progress line while auto-cycling */}
                  {on && (
                    <span
                      aria-hidden
                      key={`${item.id}-${userPicked}`}
                      className={`absolute -top-px left-0 hidden h-px w-full origin-left lg:block ${userPicked ? "" : "animate-[progress_linear_forwards]"}`}
                      style={{ background: item.accent, animationDuration: `${ROTATE_MS}ms` }}
                    />
                  )}
                  <span className="block text-xs tabular-nums" style={{ color: on ? item.accent : "var(--color-faint)" }}>
                    {item.step} · {item.stage}
                  </span>
                  <span className={`mt-1 block whitespace-nowrap text-[15px] transition-colors lg:text-lg ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: active offering */}
        <div
          id="offer-panel"
          role="tabpanel"
          aria-labelledby={`offer-tab-${o.id}`}
          data-reveal
          className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12"
        >
          <div key={`${o.id}-phone`} className="animate-rise">
            <Visual accent={o.accent} />
          </div>

          <div key={`${o.id}-text`} className="animate-rise">
            <h3 className="text-[clamp(24px,2.4vw,30px)] leading-tight font-medium tracking-[-0.02em]">
              <span className="mr-3 font-serif font-normal italic" style={{ color: o.accent }}>
                {o.step}
              </span>
              {o.name}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.tagline}</p>

            <div className="relative mt-6 pl-5">
              <span aria-hidden className="absolute top-1 bottom-1 left-0 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg, ${o.accent}, transparent)` }} />
              <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] uppercase" style={{ color: o.accent }}>
                <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
                  <path d="M12 2l2.2 6.6H21l-5.5 4 2.1 6.6L12 15.2l-5.6 4 2.1-6.6L3 8.6h6.8z" />
                </svg>
                Our edge
              </p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-fg">{o.unique}</p>
            </div>

            <ul className="mt-6 flex flex-col gap-2">
              {o.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14.5px] leading-snug text-body">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: o.accent }} />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
              <span className="text-[30px] leading-none font-medium tracking-tight" style={{ color: o.accent }}>
                {o.stat.value}
              </span>
              <span className="text-[13px] text-muted">{o.stat.label}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
