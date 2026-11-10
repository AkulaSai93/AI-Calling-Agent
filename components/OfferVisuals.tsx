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

/* 01 — one source broadcasting to many phones */
export function BroadcastVisual({ accent }: { accent: string }) {
  const phones = 10;
  const tick = useTick(260);
  const delivered = tick % (phones + 4); // light phones one by one, hold, then restart

  return (
    <div className="relative grid size-full place-items-center pb-4">
      {[0, 0.55, 1.1].map((d) => (
        <span
          key={d}
          className="absolute size-16 rounded-full border animate-ring"
          style={{ borderColor: `${accent}66`, animationDelay: `${d}s`, animationDuration: "2s" }}
        />
      ))}
      <span
        className="relative z-10 grid size-14 place-items-center rounded-full text-white"
        style={{ background: `radial-gradient(circle at 30% 25%, ${accent}, #3b3270)`, boxShadow: `0 0 40px -6px ${accent}` }}
      >
        <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden>
          <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
          <path d="M16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" />
        </svg>
      </span>
      {Array.from({ length: phones }, (_, i) => {
        const angle = (i / phones) * Math.PI * 2 - Math.PI / 2;
        const on = i < delivered;
        return (
          <span
            key={i}
            className="absolute grid size-7 place-items-center rounded-lg border transition-all duration-300"
            style={{
              left: `calc(50% + ${Math.cos(angle) * 42}% - 14px)`,
              top: `calc(50% + ${Math.sin(angle) * 34}% - 22px)`,
              borderColor: on ? `${accent}99` : "rgb(255 255 255 / 0.1)",
              background: on ? `${accent}26` : "rgb(255 255 255 / 0.03)",
              color: on ? accent : "#6b6679",
            }}
          >
            {on ? (
              <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-[2.6] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden>
                <path d="m5 12 5 5 9-10" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-2" aria-hidden>
                <rect x="7" y="3" width="10" height="18" rx="2" />
              </svg>
            )}
          </span>
        );
      })}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-line bg-bg/80 px-2.5 py-1 text-[11px] whitespace-nowrap text-muted tabular-nums">
        {(Math.min(delivered, phones) * 1248).toLocaleString("en-IN")} delivered
      </span>
    </div>
  );
}

/* 02 — keypad cycling through press 1 / 2 / 3 */
const menu = [
  { key: "1", text: "Confirm order" },
  { key: "2", text: "Reschedule delivery" },
  { key: "3", text: "Talk to an agent" },
];
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export function KeypadVisual({ accent }: { accent: string }) {
  const tick = useTick(1500);
  const active = menu[tick % menu.length];

  return (
    <div className="flex size-full items-center justify-center gap-5">
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((k) => {
          const on = k === active.key;
          return (
            <span
              key={k}
              className={`grid size-9 place-items-center rounded-full border text-sm tabular-nums transition-all duration-300 ${on ? "scale-110 text-white" : "text-faint"}`}
              style={{
                borderColor: on ? accent : "rgb(255 255 255 / 0.08)",
                background: on ? `${accent}33` : "rgb(255 255 255 / 0.03)",
                boxShadow: on ? `0 0 24px -4px ${accent}` : undefined,
              }}
            >
              {k}
            </span>
          );
        })}
      </div>
      <ul className="flex w-[148px] flex-col gap-1.5 text-left">
        {menu.map((m) => {
          const on = m.key === active.key;
          return (
            <li
              key={m.key}
              className={`rounded-xl border px-2.5 py-2 text-[12px] leading-tight transition-all duration-300 ${on ? "text-fg" : "text-faint"}`}
              style={{ borderColor: on ? `${accent}80` : "rgb(255 255 255 / 0.06)", background: on ? `${accent}1a` : "transparent" }}
            >
              <span className="font-medium" style={{ color: on ? accent : undefined }}>
                Press {m.key}
              </span>
              <br />
              {m.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* 03 — back-and-forth conversation, switching language mid-call */
const convo = [
  { ai: true, text: "Hi Neha, calling about your demo request — got a minute?" },
  { ai: false, text: "Sure! Can we talk in Hindi?" },
  { ai: true, text: "बिल्कुल! आपकी टीम कितनी बड़ी है?" },
  { ai: false, text: "करीब 40 लोग हैं।" },
  { ai: true, text: "Perfect — I've booked you for Thursday, 4 PM." },
];

export function ConversationVisual({ accent }: { accent: string }) {
  const tick = useTick(1700);
  const count = (tick % (convo.length + 2)) + 1; // reveal, hold, restart
  const visible = convo.slice(0, Math.min(count, convo.length)).slice(-3);
  const typing = count < convo.length;

  return (
    <div className="flex size-full flex-col justify-end gap-2 px-1">
      {visible.map((m) => (
        <p
          key={m.text}
          className={`max-w-[85%] animate-rise rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${m.ai ? "self-start rounded-bl-md text-fg" : "self-end rounded-br-md bg-white/[0.06] text-[#d4d5dd]"}`}
          style={m.ai ? { background: `${accent}22`, border: `1px solid ${accent}55` } : undefined}
          lang={/[ऀ-ॿ]/.test(m.text) ? "hi" : "en"}
        >
          {m.text}
        </p>
      ))}
      <span className={`flex h-4 items-center gap-1 self-start pl-1 transition-opacity ${typing ? "opacity-100" : "opacity-0"}`} aria-hidden>
        {[0, 0.15, 0.3].map((d) => (
          <span key={d} className="size-1.5 rounded-full animate-wave" style={{ background: accent, animationDelay: `${d}s` }} />
        ))}
      </span>
    </div>
  );
}
