"use client";

import { useEffect, useState } from "react";

function useTick(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}

/* ---------- Phone shell ---------- */

function Phone({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[244px]">
      <span aria-hidden className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl" style={{ background: `radial-gradient(closest-side, ${accent}55, transparent)` }} />
      <div className="rounded-[40px] bg-[linear-gradient(160deg,#3a3d4a,#15161c_35%,#0c0c10_70%,#2a2c36)] p-[2px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="rounded-[38px] bg-[#050507] p-[7px]">
          <div className="relative flex h-[488px] flex-col overflow-hidden rounded-[31px] bg-[radial-gradient(120%_60%_at_50%_0%,#1a1d33,#07070b_62%)]">
            {/* Status bar */}
            <div className="relative flex h-9 shrink-0 items-center justify-between px-6 text-[11px] font-semibold text-white">
              <span>9:41</span>
              <span className="absolute top-2 left-1/2 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 18 12" className="h-2.5 w-3.5 fill-white" aria-hidden>
                  <rect x="0" y="8" width="3" height="4" rx="0.7" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="0.7" />
                  <rect x="10" y="3" width="3" height="9" rx="0.7" />
                  <rect x="15" y="0" width="3" height="12" rx="0.7" />
                </svg>
                <span className="relative h-[10px] w-5 rounded-[3px] border border-white/60 p-[1px]">
                  <span className="block h-full w-3/4 rounded-[1.5px] bg-white" />
                </span>
              </span>
            </div>
            {children}
            {/* Home indicator */}
            <span className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

const icons = {
  accept: <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />,
  mic: <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4" />,
  speaker: <path d="M4 10v4h3l5 4V6L7 10H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />,
  keypad: <path d="M6 5h.01M12 5h.01M18 5h.01M6 11h.01M12 11h.01M18 11h.01M6 17h.01M12 17h.01M18 17h.01" />,
};

function RoundButton({ kind, tone = "glass", label }: { kind: keyof typeof icons; tone?: "glass" | "green" | "red"; label?: string }) {
  const bg = tone === "green" ? "bg-[#34c759]" : tone === "red" ? "bg-[#ff3b30]" : "bg-white/[0.12]";
  const filled = kind === "accept";
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className={`grid size-12 place-items-center rounded-full ${bg}`}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`size-5 ${filled ? "fill-white" : "fill-none stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"} ${tone === "red" ? "rotate-[135deg]" : ""}`}
        >
          {icons[kind]}
        </svg>
      </span>
      {label && <span className="text-[9.5px] text-white/70">{label}</span>}
    </span>
  );
}

function Wave({ color, live, bars = 22, className = "h-8" }: { color: string; live: boolean; bars?: number; className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }, (_, i) => {
        const h = 25 + Math.round(75 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.35)));
        return (
          <span
            key={i}
            className={`w-[3px] rounded-full transition-[height] duration-500 ${live ? "animate-wave" : ""}`}
            style={{ height: live ? `${h}%` : "12%", background: color, animationDelay: `${-((i * 0.17) % 1.2)}s`, animationDuration: `${0.8 + (i % 4) * 0.15}s` }}
          />
        );
      })}
    </span>
  );
}

/* ---------- 02 AVR: in-call keypad, press or say ---------- */

const menu = [
  { key: "1", text: "Confirm order", result: "Order #4821 confirmed" },
  { key: "2", text: "Reschedule", result: "Delivery moved to Sat, 10 AM" },
  { key: "3", text: "Talk to an agent", result: "Connecting you to support…" },
];
const keys = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
];

export function KeypadVisual({ accent }: { accent: string }) {
  const tick = useTick(700);
  const cycle = tick % 12; // 4 phases per option: listen, listen, press, result
  const opt = menu[Math.floor(cycle / 4) % menu.length];
  const phase = cycle % 4;
  const pressed = phase >= 2 ? opt.key : null;

  return (
    <Phone accent={accent}>
      <div className="pt-2 text-center">
        <p className="text-[15px] font-medium text-white">ShopEase</p>
        <p className="text-[10.5px] text-white/60">0:{String(8 + tick % 40).padStart(2, "0")} · Automated menu</p>
      </div>

      <div className="mx-4 mt-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
        <div className="flex h-4 items-center gap-2">
          {phase === 3 ? (
            <span key={opt.key} className="truncate text-[10px] text-[#34c759]">
              ✓ {opt.result}
            </span>
          ) : (
            <>
              <Wave color={accent} live={phase < 2} bars={8} className="h-4" />
              <span className="text-[10px] text-white/60">Press or say a number</span>
            </>
          )}
        </div>
        <ul className="mt-1.5 space-y-0.5">
          {menu.map((m) => (
            <li key={m.key} className={`flex gap-2 text-[11.5px] transition-colors ${m.key === opt.key && phase >= 2 ? "text-white" : "text-white/55"}`}>
              <span style={{ color: m.key === opt.key && phase >= 2 ? accent : undefined }}>{m.key}</span>
              {m.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-4 grid grid-cols-3 gap-x-4 gap-y-2">
        {keys.map(([k, letters]) => {
          const on = k === pressed;
          return (
            <span
              key={k}
              className="flex size-[44px] flex-col items-center justify-center rounded-full transition-all duration-200"
              style={{ background: on ? accent : "rgb(255 255 255 / 0.12)", transform: on ? "scale(0.94)" : undefined, boxShadow: on ? `0 0 24px ${accent}` : undefined }}
            >
              <span className="text-[17px] leading-none font-light text-white">{k}</span>
              {letters && <span className="mt-0.5 text-[7px] font-semibold tracking-[0.12em] text-white/60">{letters}</span>}
            </span>
          );
        })}
      </div>

      <div className="mt-auto flex justify-center pt-2 pb-7">
        <RoundButton kind="accept" tone="red" />
      </div>
    </Phone>
  );
}

/* ---------- Desktop window shell (used by the non-phone visuals) ---------- */

function Window({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute -inset-8 -z-10 opacity-40 blur-3xl" style={{ background: `radial-gradient(closest-side, ${accent}55, transparent)` }} />
      <div className="overflow-hidden rounded-lg border border-white/12 bg-[#0a0a0e] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- 01 One-way: campaign dashboard ---------- */

const regions = [
  { name: "Maharashtra", lang: "Marathi", base: 0.92 },
  { name: "Tamil Nadu", lang: "Tamil", base: 0.84 },
  { name: "Delhi NCR", lang: "Hindi", base: 0.76 },
  { name: "Karnataka", lang: "Kannada", base: 0.68 },
];

export function BroadcastVisual({ accent }: { accent: string }) {
  const tick = useTick(120);
  const p = Math.min(1, (tick % 110) / 90); // fill, hold, restart
  const sent = Math.round(50000 * p);
  const bars = 28;

  return (
    <Window title="Campaign · EMI reminders · Dec" accent={accent}>
      <div className="grid gap-px bg-line sm:grid-cols-3">
        {[
          { k: "Calls placed", v: sent.toLocaleString("en-IN") },
          { k: "Answered", v: `${Math.round(78 * Math.min(1, p * 1.4))}%` },
          { k: "Listened fully", v: `${Math.round(91 * Math.min(1, p * 1.6))}%` },
        ].map((m) => (
          <div key={m.k} className="bg-[#0a0a0e] px-4 py-3">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-faint uppercase">{m.k}</p>
            <p className="mt-1 text-[22px] font-light tracking-tight text-fg tabular-nums">{m.v}</p>
          </div>
        ))}
      </div>

      {/* Calls per minute */}
      <div className="border-t border-line px-4 pt-4">
        <p className="font-mono text-[9.5px] tracking-[0.18em] text-faint uppercase">Calls / minute</p>
        <div className="mt-3 flex h-20 items-end gap-[3px]">
          {Array.from({ length: bars }, (_, i) => {
            const h = 30 + 65 * Math.abs(Math.sin(i * 0.45) * Math.cos(i * 0.17));
            const on = i / bars <= p;
            return (
              <span
                key={i}
                className="flex-1 rounded-t-[2px] transition-all duration-300"
                style={{ height: `${on ? h : 6}%`, background: on ? accent : "rgb(255 255 255 / 0.06)", opacity: on ? 0.35 + (i / bars) * 0.65 : 1 }}
              />
            );
          })}
        </div>
      </div>

      {/* Regions, each in its own language */}
      <ul className="space-y-2.5 border-t border-line px-4 py-4">
        {regions.map((r) => (
          <li key={r.name} className="grid grid-cols-[110px_minmax(0,1fr)_40px] items-center gap-3 text-[11.5px]">
            <span className="truncate text-body">
              {r.name} <span className="text-faint">· {r.lang}</span>
            </span>
            <span className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <span className="block h-full rounded-full transition-[width] duration-300" style={{ width: `${r.base * p * 100}%`, background: accent }} />
            </span>
            <span className="text-right text-muted tabular-nums">{Math.round(r.base * p * 100)}%</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

/* ---------- 03 Two-way: live call console ---------- */

const convo = [
  { ai: true, text: "Hi Neha, it's Aria from Voxa. Got a minute?", tag: null },
  { ai: false, text: "Sure! Can we talk in Hindi?", tag: "Language → Hindi" },
  { ai: true, text: "बिल्कुल! आपकी टीम कितनी बड़ी है?", tag: null },
  { ai: false, text: "करीब 40 लोग हैं।", tag: "Team size: 40" },
  { ai: true, text: "बढ़िया, गुरुवार 4 बजे डेमो बुक कर दिया है।", tag: "Demo booked" },
];

export function ConversationVisual({ accent }: { accent: string }) {
  const tick = useTick(1600);
  const shown = Math.min((tick % (convo.length + 2)) + 1, convo.length);
  const visible = convo.slice(Math.max(0, shown - 3), shown);
  const last = convo[shown - 1];
  const tags = convo.slice(0, shown).filter((m) => m.tag);
  const done = shown === convo.length;
  const intent = [32, 48, 61, 78, 94][shown - 1];

  return (
    <Window title="Live call · Lead qualification" accent={accent}>
      <div className="grid sm:grid-cols-[minmax(0,1fr)_170px]">
        {/* Voices + transcript */}
        <div className="p-4">
          <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase" style={{ color: accent }}>Aria</span>
            <Wave color={accent} live={last.ai && !done} bars={36} className="h-7 justify-start" />
            <span className="font-mono text-[9.5px] tracking-[0.16em] text-muted uppercase">Neha</span>
            <Wave color="rgb(255 255 255 / 0.7)" live={!last.ai && !done} bars={36} className="h-7 justify-start" />
          </div>

          <div className="mt-4 flex h-[118px] flex-col justify-end gap-1.5 overflow-hidden border-t border-line pt-3">
            {visible.map((m) => (
              <p key={m.text} lang={/[ऀ-ॿ]/.test(m.text) ? "hi" : "en"} className="animate-rise text-[12px] leading-snug">
                <span className="mr-2 font-mono text-[9.5px] tracking-[0.14em] uppercase" style={{ color: m.ai ? accent : "var(--color-faint)" }}>
                  {m.ai ? "Aria" : "Neha"}
                </span>
                <span className={m.ai ? "text-fg" : "text-body"}>{m.text}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Live insights */}
        <div className="border-t border-line p-4 sm:border-t-0 sm:border-l">
          <p className="font-mono text-[9.5px] tracking-[0.18em] text-faint uppercase">Buying intent</p>
          <p className="mt-1 text-[24px] font-light text-fg tabular-nums">{intent}%</p>
          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <span className="block h-full rounded-full transition-[width] duration-700" style={{ width: `${intent}%`, background: accent }} />
          </span>

          <p className="mt-5 font-mono text-[9.5px] tracking-[0.18em] text-faint uppercase">Captured</p>
          <ul className="mt-2 space-y-1.5">
            {tags.map((m) => (
              <li key={m.tag} className={`animate-rise text-[11px] ${m.tag === "Demo booked" ? "text-live" : "text-body"}`}>
                ✓ {m.tag}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] text-faint">{done ? "Synced to CRM" : "Response time 320 ms"}</p>
        </div>
      </div>
    </Window>
  );
}
