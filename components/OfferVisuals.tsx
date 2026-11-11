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

/* Shared frame so all three mock-ups look like one product */
function Frame({ title, meta, accent, children }: { title: string; meta: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-[#0b0b0f] text-left shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-2 text-[12px] font-medium text-fg">
          <span className="size-1.5 rounded-full animate-ping-soft" style={{ background: accent }} />
          {title}
        </span>
        <span className="text-[11px] text-faint tabular-nums">{meta}</span>
      </div>
      <div className="relative flex-1 p-4">{children}</div>
    </div>
  );
}

function MiniWave({ color, live = true }: { color: string; live?: boolean }) {
  return (
    <span aria-hidden className="flex h-3.5 items-center gap-[2px]">
      {[50, 90, 60, 100, 70, 40].map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full ${live ? "animate-wave" : ""}`}
          style={{ height: `${live ? h : 30}%`, background: color, animationDelay: `${-i * 0.13}s` }}
        />
      ))}
    </span>
  );
}

/* 01 — personalised broadcast: each contact gets their own message */
const contacts = [
  { name: "Priya S.", lang: "HI", msg: "EMI of ₹4,200 due on 5 Dec" },
  { name: "Arjun K.", lang: "TA", msg: "Order #48213 arrives today" },
  { name: "Meera R.", lang: "EN", msg: "Policy renews on 12 Dec" },
  { name: "Rahul P.", lang: "TE", msg: "Appointment Thu, 6:30 PM" },
];

export function BroadcastVisual({ accent }: { accent: string }) {
  const tick = useTick(900);
  const step = tick % (contacts.length * 2 + 3); // each row: calling → delivered, then hold
  const sent = 12480 + Math.min(step, contacts.length * 2) * 312;

  return (
    <Frame title="EMI reminders · campaign" meta={`${sent.toLocaleString("en-IN")} / 50,000`} accent={accent}>
      <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(sent / 50000) * 100}%`, background: accent }} />
      </div>
      <ul className="mt-3 divide-y divide-line">
        {contacts.map((c, i) => {
          const state = step < i * 2 ? "queued" : step === i * 2 ? "calling" : "delivered";
          return (
            <li key={c.name} className="flex items-center gap-3 py-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[11px] text-body">{c.name[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12px] text-fg">
                  {c.name}
                  <span className="rounded-sm border border-line px-1 text-[9px] text-muted">{c.lang}</span>
                </span>
                <span className="block truncate text-[11.5px] text-muted">“Hi {c.name.split(" ")[0]}, {c.msg}”</span>
              </span>
              <span className="flex w-[74px] shrink-0 justify-end text-[11px]">
                {state === "calling" ? (
                  <span className="flex items-center gap-1.5" style={{ color: accent }}>
                    <MiniWave color={accent} /> Calling
                  </span>
                ) : state === "delivered" ? (
                  <span className="text-live">✓ Delivered</span>
                ) : (
                  <span className="text-faint">Queued</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* 02 — AVR: prompt, keypad and the result syncing to CRM */
const menu = [
  { key: "1", text: "Confirm order", result: "Order #4821 confirmed", spoken: false },
  { key: "2", text: "Reschedule delivery", result: "Moved to Sat, 10 AM", spoken: true },
  { key: "3", text: "Talk to an agent", result: "Routed to support team", spoken: false },
];
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export function KeypadVisual({ accent }: { accent: string }) {
  const tick = useTick(1800);
  const active = menu[tick % menu.length];

  return (
    <Frame title="COD confirmation · AVR" meta="00:14" accent={accent}>
      <div className="grid h-full grid-cols-[auto_minmax(0,1fr)] gap-4">
        <div className="grid grid-cols-3 content-center gap-1.5">
          {keys.map((k) => {
            const on = k === active.key && !active.spoken;
            return (
              <span
                key={k}
                className={`grid size-8 place-items-center rounded-md border text-[13px] tabular-nums transition-all duration-300 ${on ? "scale-105 text-white" : "text-faint"}`}
                style={{
                  borderColor: on ? accent : "rgb(255 255 255 / 0.08)",
                  background: on ? `${accent}40` : "rgb(255 255 255 / 0.02)",
                  boxShadow: on ? `0 0 20px -4px ${accent}` : undefined,
                }}
              >
                {k}
              </span>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-1.5">
          <p className="mb-1 text-[11px] text-faint">“Press or say an option”</p>
          {menu.map((m) => {
            const on = m.key === active.key;
            return (
              <div
                key={m.key}
                className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[12px] transition-all duration-300"
                style={{ borderColor: on ? `${accent}80` : "rgb(255 255 255 / 0.06)", background: on ? `${accent}14` : "transparent" }}
              >
                <span className="w-3 tabular-nums" style={{ color: on ? accent : "var(--color-faint)" }}>
                  {m.key}
                </span>
                <span className={`truncate ${on ? "text-fg" : "text-faint"}`}>{m.text}</span>
                {on && m.spoken && (
                  <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px]" style={{ color: accent }}>
                    <MiniWave color={accent} /> said
                  </span>
                )}
              </div>
            );
          })}
          <p key={active.key} className="mt-1.5 flex animate-rise items-center gap-1.5 truncate text-[11px] text-live">
            ✓ {active.result} <span className="text-faint">· synced to CRM</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

/* 03 — live two-way call that switches language mid-call */
const convo = [
  { ai: true, text: "Hi Neha, it's Aria from Voxa — got a minute?" },
  { ai: false, text: "Sure! Can we talk in Hindi?" },
  { ai: true, text: "बिल्कुल! आपकी टीम कितनी बड़ी है?" },
  { ai: false, text: "करीब 40 लोग हैं।" },
  { ai: true, text: "बढ़िया — गुरुवार 4 बजे डेमो बुक कर दिया है।" },
];

export function ConversationVisual({ accent }: { accent: string }) {
  const tick = useTick(1600);
  const count = (tick % (convo.length + 2)) + 1;
  const shown = Math.min(count, convo.length);
  const visible = convo.slice(Math.max(0, shown - 3), shown);
  const hindi = shown >= 3;
  const last = convo[shown - 1];

  return (
    <Frame title="Lead qualification · live" meta={`00:${String(8 + shown * 6).padStart(2, "0")}`} accent={accent}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[11px] text-muted">
          <MiniWave color={last.ai ? accent : "#d4d5dd"} />
          {last.ai ? "Aria speaking" : "Neha speaking"}
        </span>
        <span className="flex items-center gap-1 rounded-sm border border-line px-1.5 py-0.5 text-[10px] text-muted">
          <span className={hindi ? "text-faint line-through" : "text-fg"}>EN</span>→
          <span style={{ color: hindi ? accent : undefined }} className={hindi ? "" : "text-faint"}>
            HI
          </span>
        </span>
      </div>

      <div className="mt-3 flex h-[118px] flex-col justify-end gap-2">
        {visible.map((m) => (
          <p
            key={m.text}
            lang={/[ऀ-ॿ]/.test(m.text) ? "hi" : "en"}
            className={`max-w-[85%] animate-rise rounded-md px-3 py-1.5 text-[12px] leading-snug ${
              m.ai ? "self-start text-fg" : "self-end bg-white/[0.06] text-body"
            }`}
            style={m.ai ? { background: `${accent}1f`, border: `1px solid ${accent}55` } : undefined}
          >
            {m.text}
          </p>
        ))}
      </div>

      <p className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-2.5 text-[10.5px] text-faint">
        <span className="truncate">Language switched · adapted in 320 ms</span>
        <span className={`shrink-0 ${shown === convo.length ? "text-live" : ""}`}>{shown === convo.length ? "✓ Demo booked" : "Qualifying…"}</span>
      </p>
    </Frame>
  );
}
