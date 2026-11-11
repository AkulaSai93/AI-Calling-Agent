"use client";

import { useEffect, useRef, useState } from "react";

// Placeholder benchmarks — swap for your measured numbers.
const stats = [
  { prefix: "<", value: 500, decimals: 0, suffix: "ms", label: "Response latency", compare: "Industry average: 2–3 s" },
  { prefix: "", value: 98.7, decimals: 1, suffix: "%", label: "Speech accuracy on Indian accents", compare: "Across 15+ languages" },
  { prefix: "", value: 3.2, decimals: 1, suffix: "×", label: "More qualified leads", compare: "vs. manual dialling teams" },
  { prefix: "", value: 70, decimals: 0, suffix: "%", label: "Lower cost per conversation", compare: "vs. in-house call centres" },
  { prefix: "", value: 1, decimals: 0, suffix: "L+", label: "Calls handled per hour", compare: "Scales with zero hiring" },
  { prefix: "", value: 4.8, decimals: 1, suffix: "/5", label: "Average customer rating", compare: "Post-call CSAT surveys" },
];

const DURATION = 1600;
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export default function Benchmarks() {
  // 1 = final values (what the server renders); reset to 0 and count up once the grid is on screen
  const [progress, setProgress] = useState(1);
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setProgress(0);

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          setProgress(easeOut(p));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="benchmarks" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="max-w-[560px]">
          <p className="text-gradient text-sm font-medium tracking-wide">Our benchmarks</p>
          <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
            Numbers that <em className="text-gradient pr-[0.06em] font-serif font-normal tracking-normal">speak</em> for themselves
          </h2>
        </div>
        <p className="max-w-[360px] text-base leading-relaxed text-muted">
          Measured across 10M+ live calls in lending, insurance, e-commerce and healthcare.
        </p>
      </div>

      <dl ref={ref} className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => {
          const shown = (s.value * progress).toFixed(s.decimals);
          return (
            <div
              key={s.label}
              className={`group relative border-b border-line px-1 py-10 text-center sm:px-8 sm:text-left sm:py-12 ${i % 2 === 1 ? "sm:border-l" : ""} ${
                i % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"
              }`}
            >
              {/* Hover glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(60% 60% at 30% 40%, rgb(136 152 231 / 0.10), transparent 70%)" }}
              />
              <dd className="relative flex items-baseline justify-center leading-none tabular-nums sm:justify-start">
                {s.prefix && <span className="mr-1 text-[clamp(32px,3.6vw,52px)] font-medium text-muted">{s.prefix}</span>}
                <span className="bg-linear-to-b from-white from-30% to-[#a3a7b8] bg-clip-text text-[clamp(64px,7.4vw,108px)] font-medium tracking-[-0.05em] text-transparent">
                  {shown}
                </span>
                <span className="text-gradient ml-1 text-[clamp(28px,3.2vw,46px)] font-medium tracking-tight">{s.suffix}</span>
              </dd>
              <dt className="relative mt-5 text-[17px] font-medium text-fg">{s.label}</dt>
              <p className="relative mt-1.5 text-sm text-muted">{s.compare}</p>
            </div>
          );
        })}
      </dl>

      <p className="mt-6 text-center text-xs text-faint sm:text-left">Benchmarks from Voxa production traffic, Jan–Sep 2026. Individual results vary by use case.</p>
    </section>
  );
}
