"use client";

import { useState } from "react";

type Mark = "yes" | "partial" | "no";
type Cell = { mark: Mark; text: string };
type Row = { feature: string; adya: Cell; centre: Cell; ivr: Cell };

// Typical figures for the Indian market; adjust to your own pricing and claims.
const rows: Row[] = [
  {
    feature: "Availability",
    adya: { mark: "yes", text: "24/7, all 365 days" },
    centre: { mark: "partial", text: "Shift-based, 9 to 6" },
    ivr: { mark: "yes", text: "24/7" },
  },
  {
    feature: "Cost per call",
    adya: { mark: "yes", text: "₹1–3" },
    centre: { mark: "no", text: "₹15–40" },
    ivr: { mark: "yes", text: "₹0.5–1" },
  },
  {
    feature: "Two-way conversation",
    adya: { mark: "yes", text: "Human-like" },
    centre: { mark: "yes", text: "Yes" },
    ivr: { mark: "no", text: "Fixed menus only" },
  },
  {
    feature: "Languages",
    adya: { mark: "yes", text: "15+, switches mid-call" },
    centre: { mark: "partial", text: "2–3 per agent" },
    ivr: { mark: "no", text: "Pre-recorded only" },
  },
  {
    feature: "Scale",
    adya: { mark: "yes", text: "1L+ calls per hour" },
    centre: { mark: "no", text: "Limited by headcount" },
    ivr: { mark: "partial", text: "High, but one-way" },
  },
  {
    feature: "Time to launch",
    adya: { mark: "yes", text: "Same day" },
    centre: { mark: "no", text: "4–8 weeks" },
    ivr: { mark: "partial", text: "1–2 weeks" },
  },
  {
    feature: "Insights & CRM sync",
    adya: { mark: "yes", text: "Live, automatic" },
    centre: { mark: "no", text: "Manual entry" },
    ivr: { mark: "partial", text: "Key-press logs" },
  },
];

const others = [
  { id: "centre", label: "Call centre" },
  { id: "ivr", label: "Basic IVR" },
] as const;

function MarkIcon({ mark, accent }: { mark: Mark; accent?: boolean }) {
  if (mark === "yes")
    return (
      <svg viewBox="0 0 24 24" aria-label="Yes" className={`mt-[3px] size-4 shrink-0 fill-none stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round] ${accent ? "stroke-brand" : "stroke-[#9a9ba6]"}`}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    );
  if (mark === "partial")
    return (
      <svg viewBox="0 0 24 24" aria-label="Partly" className="mt-[3px] size-4 shrink-0 fill-none stroke-[#5d5e66] stroke-[2.4] [stroke-linecap:round]">
        <path d="M7 12h10" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-label="No" className="mt-[3px] size-4 shrink-0 fill-none stroke-[#4a4b52] stroke-[2.2] [stroke-linecap:round]">
      <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
  );
}

const cols = "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]";
const mono = "font-mono text-[11px] tracking-[0.22em] uppercase";
// The Adya column is one continuous soft panel: side borders on every cell, rounded at top and bottom
const adyaCell = "border-x border-brand/25 bg-brand/[0.05] px-4 md:px-6";

export default function Comparison() {
  // On phones only one competitor fits beside Adya; let the visitor pick which
  const [vs, setVs] = useState<(typeof others)[number]["id"]>("centre");
  const show = (id: (typeof others)[number]["id"]) => `${id === vs ? "flex" : "hidden"} md:flex`;

  return (
    <section id="compare" className="mx-auto flex max-w-[1200px] flex-col justify-center px-4 py-20 sm:px-6 md:min-h-[calc(100svh-72px)] md:py-6">
      <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">Why Adya</p>
          <h2 className="mt-3 text-[clamp(30px,4vw,48px)] leading-[1.08] font-light tracking-[-0.03em] text-balance">
            A <span className="text-[#6e6f78]">smarter</span> way to make every call
          </h2>
        </div>
        <p className="max-w-[340px] text-[15px] leading-relaxed text-muted">
          The warmth of a human agent and the scale of automation, without the cost of either.
        </p>
      </div>

      {/* Mobile: choose what to compare against */}
      <div role="tablist" aria-label="Compare Adya with" className="mt-10 flex gap-6 border-b border-line md:hidden">
        {others.map((o) => (
          <button
            key={o.id}
            role="tab"
            aria-selected={vs === o.id}
            onClick={() => setVs(o.id)}
            className={`-mb-px border-b pb-3 ${mono} transition-colors ${vs === o.id ? "border-fg text-fg" : "border-transparent text-faint"}`}
          >
            vs {o.label}
          </button>
        ))}
      </div>

      <div role="table" data-stagger aria-label="Adya compared with call centres and IVR" className="mt-8 md:mt-7">
        {/* Header */}
        <div role="row" className={cols}>
          <div role="columnheader" className={`${mono} flex items-end pb-3 text-faint`}>
            Feature
          </div>
          <div role="columnheader" className={`${adyaCell} rounded-t-lg border-t pt-4 pb-3`}>
            <span className="flex items-center gap-2 text-[17px] font-normal text-fg">
              <span className="size-1.5 rounded-full bg-brand" />
              Adya AI
            </span>
            <span className={`mt-1 block ${mono} text-[10px] text-brand`}>Recommended</span>
          </div>
          {others.map((o) => (
            <div key={o.id} role="columnheader" className={`${show(o.id)} items-end px-4 pb-3 ${mono} text-faint md:px-6`}>
              {o.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((r) => (
          <div key={r.feature} role="row" className={cols}>
            <div role="rowheader" className="flex items-start border-t border-line py-4 pr-3 text-[14px] text-muted md:py-3 md:text-[15px]">
              {r.feature}
            </div>
            <div role="cell" className={`${adyaCell} flex gap-2.5 border-t border-t-brand/15 py-4 text-[14px] text-fg md:py-3 md:text-[15px]`}>
              <MarkIcon mark={r.adya.mark} accent />
              {r.adya.text}
            </div>
            {others.map((o) => {
              const cell = r[o.id];
              return (
                <div key={o.id} role="cell" className={`${show(o.id)} gap-2.5 border-t border-line px-4 py-4 text-[14px] text-[#7d7e88] md:px-6 md:py-3 md:text-[15px]`}>
                  <MarkIcon mark={cell.mark} />
                  {cell.text}
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer row with CTA inside the Adya column */}
        <div role="row" className={cols}>
          <div role="cell" className="border-t border-line pt-5 pr-3 text-[14px] leading-relaxed text-muted">
            Up to <span className="text-fg">70% cheaper</span> than a call centre, far smarter than IVR.
          </div>
          <div role="cell" className={`${adyaCell} rounded-b-lg border-t border-b border-t-brand/15 py-4`}>
            <a
              href="#demo"
              data-magnetic
              className="group flex w-full items-center justify-center gap-2 rounded-md bg-fg px-2 py-2.5 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-bg uppercase sm:justify-between sm:pr-2.5 sm:pl-4 sm:text-[11px] sm:tracking-[0.16em] transition-colors hover:bg-white"
            >
              <span className="sm:hidden">Try free</span>
              <span className="hidden sm:inline">Try Adya free</span>
              <span className="hidden size-6 place-items-center rounded-[4px] bg-bg text-fg transition-transform group-hover:translate-x-0.5 sm:grid">
                <svg viewBox="0 0 24 24" aria-hidden className="size-3 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
          {others.map((o) => (
            <div key={o.id} role="cell" className={`${show(o.id)} border-t border-line`} />
          ))}
        </div>
      </div>
    </section>
  );
}
