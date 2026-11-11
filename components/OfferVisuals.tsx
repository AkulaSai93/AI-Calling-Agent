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

function Caller({ name, sub, accent, ring }: { name: string; sub: string; accent: string; ring: boolean }) {
  return (
    <div className="flex flex-col items-center pt-6 text-center">
      <span className="relative grid size-16 place-items-center">
        {ring && (
          <>
            <span className="absolute inset-0 rounded-full border animate-ring" style={{ borderColor: `${accent}99` }} />
            <span className="absolute inset-0 rounded-full border animate-ring [animation-delay:0.8s]" style={{ borderColor: `${accent}66` }} />
          </>
        )}
        <span
          className="relative grid size-16 place-items-center rounded-full text-xl font-semibold text-white"
          style={{ background: `linear-gradient(145deg, ${accent}, #3c4699)` }}
        >
          {name[0]}
        </span>
      </span>
      <p className="mt-3 text-[17px] font-medium text-white">{name}</p>
      <p className="mt-0.5 text-[11px] text-white/60">{sub}</p>
    </div>
  );
}

/* ---------- 01 One-way: incoming call → personalised voice message ---------- */

const message = "Hi Priya, your EMI of ₹4,200 is due on 5 December. Tap the link we sent on WhatsApp to pay in one step.";

export function BroadcastVisual({ accent }: { accent: string }) {
  const tick = useTick(250);
  const t = tick % 44; // 0–7 ringing · 8–37 playing · 38–43 delivered
  const ringing = t < 8;
  const words = message.split(" ");
  const shown = ringing ? 0 : Math.min(words.length, Math.ceil(((t - 8) / 26) * words.length));
  const done = t >= 38;

  return (
    <Phone accent={accent}>
      <Caller name="Apex Finance" sub={ringing ? "Incoming call…" : done ? "Call ended · 0:21" : `Voice message · 0:${String(Math.floor((t - 8) / 4) + 3).padStart(2, "0")}`} accent={accent} ring={ringing} />

      <div className="mx-4 mt-6 flex-1">
        {ringing ? (
          <p className="text-center text-[11px] text-white/50">Personalised reminder · Hindi / English</p>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur">
            <div className="flex items-center justify-between text-[9.5px] text-white/50">
              <span>Voxa AI · live caption</span>
              <span className="rounded-sm border border-white/15 px-1">EN</span>
            </div>
            <p className="mt-2 min-h-[72px] text-[12px] leading-snug text-white">
              {words.slice(0, shown).join(" ")}
              {!done && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-white/70" />}
            </p>
            <Wave color={accent} live={!done} bars={20} className="mt-2 h-6" />
          </div>
        )}
        {done && <p className="mt-3 text-center text-[11px] text-[#34c759]">✓ Delivered · listened 100%</p>}
      </div>

      <div className="flex shrink-0 justify-around px-8 pb-10">
        {ringing ? (
          <>
            <RoundButton kind="accept" tone="red" label="Decline" />
            <RoundButton kind="accept" tone="green" label="Accept" />
          </>
        ) : (
          <>
            <RoundButton kind="mic" label="Mute" />
            <RoundButton kind="accept" tone="red" label="End" />
            <RoundButton kind="speaker" label="Speaker" />
          </>
        )}
      </div>
    </Phone>
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

/* ---------- 03 Two-way: live conversation with Aria ---------- */

const convo = [
  { ai: true, text: "Hi Neha, it's Aria from Voxa — got a minute?" },
  { ai: false, text: "Sure! Can we talk in Hindi?" },
  { ai: true, text: "बिल्कुल! आपकी टीम कितनी बड़ी है?" },
  { ai: false, text: "करीब 40 लोग हैं।" },
  { ai: true, text: "बढ़िया — गुरुवार 4 बजे डेमो बुक कर दिया है।" },
];

export function ConversationVisual({ accent }: { accent: string }) {
  const tick = useTick(1600);
  const shown = Math.min((tick % (convo.length + 2)) + 1, convo.length);
  const visible = convo.slice(Math.max(0, shown - 3), shown);
  const last = convo[shown - 1];
  const hindi = shown >= 3;
  const done = shown === convo.length;

  return (
    <Phone accent={accent}>
      <Caller name="Aria · Voxa AI" sub={`0:${String(6 + shown * 7).padStart(2, "0")} · ${hindi ? "हिंदी" : "English"}`} accent={accent} ring={last.ai && !done} />

      <div className="mx-3 mt-4 flex flex-1 flex-col justify-end gap-1.5 overflow-hidden">
        {visible.map((m) => (
          <p
            key={m.text}
            lang={/[ऀ-ॿ]/.test(m.text) ? "hi" : "en"}
            className={`max-w-[88%] animate-rise rounded-2xl px-3 py-1.5 text-[11.5px] leading-snug ${m.ai ? "self-start rounded-bl-sm text-white" : "self-end rounded-br-sm bg-white/[0.12] text-white/90"}`}
            style={m.ai ? { background: `${accent}38` } : undefined}
          >
            {m.text}
          </p>
        ))}
      </div>

      <div className="shrink-0 px-6 pt-3">
        <Wave color={last.ai ? accent : "rgb(255 255 255 / 0.7)"} live={!done} bars={24} className="h-7" />
        <p className="mt-1 text-center text-[10px]" style={{ color: done ? "#34c759" : "rgb(255 255 255 / 0.5)" }}>
          {done ? "✓ Demo booked · synced to CRM" : last.ai ? "Aria is speaking" : "Neha is speaking"}
        </p>
      </div>

      <div className="flex shrink-0 justify-around px-6 pt-3 pb-9">
        <RoundButton kind="mic" />
        <RoundButton kind="keypad" />
        <RoundButton kind="speaker" />
        <RoundButton kind="accept" tone="red" />
      </div>
    </Phone>
  );
}
