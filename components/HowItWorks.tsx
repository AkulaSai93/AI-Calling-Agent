"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 3200;

const steps = [
  {
    title: "Connect your data",
    text: "Upload a contact list or sync your CRM. Voxa pulls names, dues and history so every call has context.",
    visual: "connect",
  },
  {
    title: "Design your agent",
    text: "Describe the goal in plain words, pick a voice and language — Voxa writes the script and the call flow.",
    visual: "design",
  },
  {
    title: "Test & go live",
    text: "Take a test call on your own phone, tweak anything, then launch to thousands of customers in one click.",
    visual: "launch",
  },
  {
    title: "Track & improve",
    text: "Every call is transcribed, scored and synced back. See what converts and let Voxa optimise the rest.",
    visual: "track",
  },
] as const;

function Visual({ kind, on }: { kind: (typeof steps)[number]["visual"]; on: boolean }) {
  const dim = on ? "text-fg" : "text-faint";
  switch (kind) {
    case "connect":
      return (
        <div className="flex flex-wrap gap-1.5 md:justify-center">
          {["CSV", "HubSpot", "Zoho", "Sheets", "API"].map((s, i) => (
            <span
              key={s}
              className={`rounded-md border px-2.5 py-1 text-[11px] transition-all duration-500 ${
                on ? "border-brand/40 bg-brand/10 text-fg" : "border-line text-faint"
              }`}
              style={{ transitionDelay: on ? `${i * 70}ms` : "0ms" }}
            >
              {s}
            </span>
          ))}
        </div>
      );
    case "design":
      return (
        <div className={`flex items-center gap-3 text-[12px] transition-colors ${dim}`}>
          <span className="flex h-6 items-center gap-[3px]" aria-hidden>
            {[40, 75, 55, 100, 65, 85, 45].map((h, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-brand ${on ? "animate-wave" : "opacity-40"}`}
                style={{ height: `${h}%`, animationDelay: `${-i * 0.15}s` }}
              />
            ))}
          </span>
          Aria · Hindi · Warm
        </div>
      );
    case "launch":
      return (
        <div className={`flex items-center gap-3 text-[12px] transition-colors ${dim}`}>
          <span className="relative grid size-7 place-items-center rounded-full bg-brand/15 text-brand">
            {on && <span className="absolute inset-0 rounded-full border border-brand/50 animate-ring" />}
            <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 fill-current">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
          </span>
          {on ? "Test call ringing…" : "Test call"}
        </div>
      );
    case "track":
      return (
        <div className="flex h-7 items-end gap-1" aria-hidden>
          {[30, 45, 38, 60, 52, 75, 90].map((h, i) => (
            <span
              key={i}
              className={`w-2.5 rounded-sm transition-all duration-700 ${on ? "bg-brand" : "bg-white/10"}`}
              style={{ height: on ? `${h}%` : `${h * 0.6}%`, transitionDelay: on ? `${i * 60}ms` : "0ms", opacity: on ? 0.45 + i * 0.08 : 1 }}
            />
          ))}
        </div>
      );
  }
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [fill, setFill] = useState(0); // 0–1, how far the vertical line is drawn on phones
  const [span, setSpan] = useState(0); // px distance from the first dot to the last
  const listRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: steps cycle on a timer (hover pauses)
  useEffect(() => {
    if (mobile || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearInterval(id);
  }, [paused, mobile]);

  // Phones: the line follows the scroll; a step lights up when its dot passes the middle of the screen
  useEffect(() => {
    if (!mobile) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const list = listRef.current;
        if (!list) return;
        const mid = window.innerHeight * 0.55;
        const first = nodeRefs.current[0]?.getBoundingClientRect().top ?? 0;
        const last = nodeRefs.current[steps.length - 1]?.getBoundingClientRect().top ?? 1;
        setSpan(last - first);
        setFill(Math.min(1, Math.max(0, (mid - first) / (last - first))));
        let idx = 0;
        nodeRefs.current.forEach((n, i) => {
          if (n && n.getBoundingClientRect().top <= mid) idx = i;
        });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mobile]);

  const progress = active / (steps.length - 1);

  return (
    <section id="how-it-works" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <div data-reveal className="mx-auto max-w-[640px] text-center">
        <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">How it works</p>
        <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-light tracking-[-0.03em] text-balance">
          Live in <span className="text-[#6e6f78]">minutes</span>, not months
        </h2>
        <p className="mt-4 text-base leading-relaxed text-balance text-muted sm:text-lg">
          No code, no call-centre setup. Four steps from your contact list to thousands of human-like conversations.
        </p>
      </div>

      <ol
        ref={listRef}
        data-stagger
        className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8"
        onMouseLeave={() => setPaused(false)}
      >
        {/* Track: horizontal on desktop, vertical on mobile */}
        <span aria-hidden className="absolute top-[7px] right-[12.5%] left-[12.5%] hidden h-px bg-line md:block" />
        <span
          aria-hidden
          className="absolute top-[7px] left-[12.5%] hidden h-px bg-[linear-gradient(90deg,#c3cbff,#8898e7,#6f80e0)] transition-[width] duration-700 ease-out md:block"
          style={{ width: `${progress * 75}%` }}
        />
        <span aria-hidden className="absolute top-2 left-[7px] w-px bg-line md:hidden" style={{ height: span ? `${span}px` : undefined }} />
        <span
          aria-hidden
          className="absolute top-2 left-[7px] w-px bg-[linear-gradient(180deg,#c3cbff,#8898e7,#6f80e0)] md:hidden"
          style={{ height: `${span * fill}px` }}
        />

        {steps.map((s, i) => {
          const on = i === active;
          const reached = i <= active;
          return (
            <li
              key={s.title}
              className="relative pl-10 md:pl-0 md:text-center"
              onMouseEnter={() => {
                if (mobile) return;
                setActive(i);
                setPaused(true);
              }}
            >
              {/* Node */}
              <span
                aria-hidden
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 grid size-[15px] place-items-center md:relative md:mx-auto"
              >
                {on && <span className="absolute inset-0 rounded-full bg-brand animate-ring" />}
                <span
                  className={`relative size-[15px] rounded-full border-[3px] border-bg transition-colors duration-500 ${reached ? "bg-brand" : "bg-white/20"}`}
                  style={on ? { boxShadow: "0 0 20px #8898e7" } : undefined}
                />
              </span>

              <p className={`font-mono text-[12px] tracking-[0.28em] md:mt-6 ${on ? "text-brand" : "text-faint"}`}>
                0{i + 1}
              </p>
              <h3 className={`mt-3 text-xl font-medium tracking-tight transition-colors duration-500 ${on ? "text-fg" : "text-muted"}`}>{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.text}</p>

              <div className="mt-5 flex min-h-8 md:justify-center">
                <Visual kind={s.visual} on={on} />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-16 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        <p className="text-sm text-muted">
          Average setup time: <span className="text-fg">15 minutes</span>
        </p>
        <a
          data-magnetic
          href="#demo"
          className="group inline-flex items-center gap-2 rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-white"
        >
          Start with a demo call
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform group-hover:translate-x-[3px]">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
