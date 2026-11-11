"use client";

import { useState } from "react";

type Mark = "yes" | "partial" | "no";
type Cell = { mark: Mark; text: string };
type Row = { feature: string; voxa: Cell; centre: Cell; ivr: Cell };

// Typical figures for the Indian market — adjust to your own pricing and claims.
const rows: Row[] = [
  {
    feature: "Availability",
    voxa: { mark: "yes", text: "24/7, all 365 days" },
    centre: { mark: "partial", text: "Shift-based, 9 to 6" },
    ivr: { mark: "yes", text: "24/7" },
  },
  {
    feature: "Cost per call",
    voxa: { mark: "yes", text: "₹1–3" },
    centre: { mark: "no", text: "₹15–40" },
    ivr: { mark: "yes", text: "₹0.5–1" },
  },
  {
    feature: "Two-way conversation",
    voxa: { mark: "yes", text: "Human-like" },
    centre: { mark: "yes", text: "Yes" },
    ivr: { mark: "no", text: "Fixed menus only" },
  },
  {
    feature: "Languages",
    voxa: { mark: "yes", text: "15+, switches mid-call" },
    centre: { mark: "partial", text: "2–3 per agent" },
    ivr: { mark: "no", text: "Pre-recorded only" },
  },
  {
    feature: "Scale",
    voxa: { mark: "yes", text: "1L+ calls per hour" },
    centre: { mark: "no", text: "Limited by headcount" },
    ivr: { mark: "partial", text: "High, but one-way" },
  },
  {
    feature: "Time to launch",
    voxa: { mark: "yes", text: "Same day" },
    centre: { mark: "no", text: "4–8 weeks" },
    ivr: { mark: "partial", text: "1–2 weeks" },
  },
  {
    feature: "Insights & CRM sync",
    voxa: { mark: "yes", text: "Live, automatic" },
    centre: { mark: "no", text: "Manual entry" },
    ivr: { mark: "partial", text: "Key-press logs" },
  },
];

const others = [
  { id: "centre", label: "Call centre" },
  { id: "ivr", label: "Basic IVR" },
] as const;

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-light">
        <svg viewBox="0 0 24 24" aria-label="Yes" className="size-3 fill-none stroke-current stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </span>
    );
  if (mark === "partial")
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-line-strong" aria-label="Partly">
        <span className="h-[2px] w-2 rounded-full bg-muted" />
      </span>
    );
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/[0.04] text-faint">
      <svg viewBox="0 0 24 24" aria-label="No" className="size-2.5 fill-none stroke-current stroke-[3] [stroke-linecap:round]">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </span>
  );
}

export default function Comparison() {
  // On phones only one competitor fits beside Voxa; let the visitor pick which
  const [vs, setVs] = useState<(typeof others)[number]["id"]>("centre");

  const otherCell = (id: (typeof others)[number]["id"]) =>
    `${id === vs ? "flex" : "hidden"} md:flex`;

  return (
    <section id="compare" className="mx-auto flex max-w-[1200px] flex-col justify-center px-4 py-16 sm:px-6 md:min-h-[calc(100svh-72px)] md:py-6">
      <div data-reveal className="mx-auto max-w-[720px] text-center">
        <p className="text-gradient text-sm font-medium tracking-wide">Why Voxa</p>
        <h2 className="mt-2 text-[clamp(28px,3.6vw,44px)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
          A <em className="text-gradient pr-[0.06em] font-serif font-normal tracking-normal">smarter</em> way to make every call
        </h2>
        <p className="mt-3 text-base leading-relaxed text-balance text-muted">
          The warmth of a human agent and the scale of automation — without the cost of either.
        </p>
      </div>

      {/* Mobile: choose what to compare against */}
      <div className="mt-10 flex justify-center md:hidden">
        <div role="tablist" aria-label="Compare Voxa with" className="flex gap-1 rounded-md border border-line p-1">
          {others.map((o) => (
            <button
              key={o.id}
              role="tab"
              aria-selected={vs === o.id}
              onClick={() => setVs(o.id)}
              className={`rounded-md px-4 py-1.5 text-sm transition-colors ${vs === o.id ? "bg-white/[0.08] text-fg" : "text-muted"}`}
            >
              vs {o.label}
            </button>
          ))}
        </div>
      </div>

      <div role="table" data-stagger aria-label="Voxa compared with call centres and IVR" className="mt-8">
        {/* Header */}
        <div role="row" className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div role="columnheader" className="hidden md:block" />
          <div role="columnheader" className="sr-only md:hidden">Feature</div>
          <div
            role="columnheader"
            className="col-start-2 rounded-t-lg border-x border-t border-brand/30 bg-brand/[0.07] px-3 pt-4 pb-3 md:col-start-auto md:px-6"
          >
            <span className="inline-flex items-center gap-2 text-lg font-medium md:text-xl">
              Voxa <span className="text-gradient">AI</span>
            </span>
            <span className="mt-1 block text-[11px] tracking-[0.14em] text-brand-light uppercase">Recommended</span>
          </div>
          {others.map((o) => (
            <div key={o.id} role="columnheader" className={`${otherCell(o.id)} flex-col justify-end px-3 pb-3 text-base text-muted md:px-6 md:text-lg`}>
              {o.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((r) => (
          <div key={r.feature} role="row" className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div role="rowheader" className="flex items-center border-t border-line py-3.5 pr-2 text-[13px] text-body md:py-2.5 md:text-[15px]">
              {r.feature}
            </div>
            <div role="cell" className="flex items-start gap-2 border-x border-t border-x-brand/30 border-t-line bg-brand/[0.07] px-3 py-3.5 md:gap-2.5 md:items-center md:px-6 md:py-2.5">
              <MarkIcon mark={r.voxa.mark} />
              <span className="text-[13px] leading-snug text-fg md:text-[14.5px]">{r.voxa.text}</span>
            </div>
            {others.map((o) => {
              const cell = r[o.id];
              return (
                <div key={o.id} role="cell" className={`${otherCell(o.id)} items-start gap-2 border-t border-line px-3 py-3.5 md:items-center md:gap-2.5 md:px-6 md:py-2.5`}>
                  <MarkIcon mark={cell.mark} />
                  <span className="text-[13px] leading-snug text-muted md:text-[14.5px]">{cell.text}</span>
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer row with CTA */}
        <div role="row" className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div role="cell" className="border-t border-line pt-4 pr-3 text-[13px] leading-relaxed text-faint md:text-sm">
            Up to 70% cheaper than a call centre, far smarter than IVR.
          </div>
          <div role="cell" className="rounded-b-lg border-x border-b border-t border-brand/30 border-t-line bg-brand/[0.07] px-3 py-4 md:px-6">
            <a
              data-magnetic
              href="#demo"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-deep px-3 py-2.5 text-[13px] font-medium whitespace-nowrap sm:text-sm text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16),0_10px_30px_-10px_rgb(111_128_224/0.8)] transition-transform hover:-translate-y-px"
            >
              Try Voxa free
              <svg viewBox="0 0 24 24" aria-hidden className="hidden size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform group-hover:translate-x-[3px] sm:block">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          {others.map((o) => (
            <div key={o.id} role="cell" className={`${otherCell(o.id)} border-t border-line`} />
          ))}
        </div>
      </div>
    </section>
  );
}
