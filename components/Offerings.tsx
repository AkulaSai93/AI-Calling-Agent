"use client";

import { useEffect, useRef, useState } from "react";
import { offerings, type OfferingId } from "@/data/offerings";
import { BroadcastVisual, ConversationVisual, KeypadVisual } from "./OfferVisuals";

const visuals: Record<OfferingId, React.ComponentType<{ accent: string }>> = {
  "one-way": BroadcastVisual,
  avr: KeypadVisual,
  "two-way": ConversationVisual,
};

export default function Offerings() {
  const [active, setActive] = useState<OfferingId>(offerings[0].id);
  const refs = useRef<Partial<Record<OfferingId, HTMLElement | null>>>({});

  // Highlight the offering that crosses the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as OfferingId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeIdx = offerings.findIndex((o) => o.id === active);

  return (
    <section id="offerings" className="mx-auto max-w-[1200px] px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
        {/* Left: sticky heading + progress nav */}
        <div data-reveal className="self-start lg:sticky lg:top-28">
          <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">What we offer</p>
          <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-light tracking-[-0.03em]">
            Three ways to <span className="text-[#6e6f78]">call</span>
          </h2>
          <p className="mt-4 max-w-[360px] text-base leading-relaxed text-muted">
            From simple announcements to full conversations, on one platform.
          </p>

          <ol className="relative mt-10 hidden lg:block">
            <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
            <span
              aria-hidden
              className="absolute top-2 left-[5px] w-px bg-[linear-gradient(180deg,#c3cbff,#8898e7,#6f80e0)] transition-[height] duration-500"
              style={{ height: `calc(${(activeIdx / (offerings.length - 1)) * 100}% - ${activeIdx === offerings.length - 1 ? 16 : 0}px)` }}
            />
            {offerings.map((o, i) => {
              const on = o.id === active;
              return (
                <li key={o.id} className={i < offerings.length - 1 ? "pb-16" : ""}>
                  <a href={`#${o.id}`} className="group relative flex gap-4">
                    <span
                      className="relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 transition-colors duration-300"
                      style={{ borderColor: i <= activeIdx ? o.accent : "rgb(255 255 255 / 0.18)", background: on ? o.accent : "var(--color-bg)" }}
                    />
                    <span>
                      <span className="block font-mono text-[11px] tracking-[0.2em] uppercase transition-colors" style={{ color: on ? o.accent : "var(--color-faint)" }}>
                        {o.step} · {o.stage}
                      </span>
                      <span className={`mt-1 block text-lg transition-colors ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}>{o.name}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right: scrolling content */}
        <div className="divide-y divide-line">
          {offerings.map((o) => {
            const Visual = visuals[o.id];
            return (
              <article
                data-reveal
                key={o.id}
                id={o.id}
                ref={(el) => {
                  refs.current[o.id] = el;
                }}
                className="scroll-mt-28 py-10 first:pt-0 last:pb-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[clamp(24px,2.6vw,32px)] leading-tight font-light tracking-[-0.02em]">
                    <span className="mr-3 align-middle font-mono text-[12px] tracking-[0.2em]" style={{ color: o.accent }}>
                      {o.step}
                    </span>
                    {o.name}
                  </h3>
                  <span className="hidden font-mono text-[11px] tracking-[0.2em] uppercase sm:block" style={{ color: o.accent }}>
                    {o.stage}
                  </span>
                </div>
                <p className="mt-2 max-w-[560px] text-base leading-relaxed text-muted">{o.tagline}</p>

                <div
                  className={`mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 ${
                    o.id === "avr" ? "items-center md:grid-cols-[260px_minmax(0,1fr)] md:gap-12" : ""
                  }`}
                >
                  {/* Animated visual: phone for AVR, product windows for the others */}
                  <div data-parallax="-6" className={o.id === "avr" ? "py-4" : ""}>
                    <Visual accent={o.accent} />
                  </div>

                  <div className={o.id === "avr" ? "" : "md:grid md:grid-cols-2 md:gap-x-12"}>
                    <div className="relative pl-5">
                      <span aria-hidden className="absolute top-1 bottom-1 left-0 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg, ${o.accent}, transparent)` }} />
                      <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: o.accent }}>
                        <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
                          <path d="M12 2l2.2 6.6H21l-5.5 4 2.1 6.6L12 15.2l-5.6 4 2.1-6.6L3 8.6h6.8z" />
                        </svg>
                        Our edge
                      </p>
                      <p className="mt-2.5 text-[16px] leading-relaxed text-fg">{o.unique}</p>
                    </div>

                    <ul className={`mt-7 flex flex-col gap-2.5 ${o.id === "avr" ? "" : "md:mt-0"}`}>
                      {o.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-body">
                          <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: o.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 flex items-baseline gap-2 border-t border-line pt-5 md:col-span-2">
                      <span className="text-[32px] leading-none font-light tracking-tight" style={{ color: o.accent }}>
                        {o.stat.value}
                      </span>
                      <span className="text-[13px] text-muted">{o.stat.label}</span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
