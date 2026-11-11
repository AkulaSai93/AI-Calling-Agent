"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Product", href: "#offerings" },
  { label: "Live demo", href: "#calls" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
  { label: "FAQs", href: "#faq" },
];

function Logo() {
  const bars = [
    { h: "h-2", delay: "-0.2s" },
    { h: "h-3.5", delay: "-0.5s" },
    { h: "h-2.5", delay: "-0.8s" },
    { h: "h-1.5", delay: "-0.35s" },
  ];
  return (
    <Link href="/" aria-label="Voxa AI home" className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <span aria-hidden className="inline-flex size-8 items-center justify-center gap-[2.5px] rounded-md bg-[linear-gradient(135deg,#a3b0f5,#8898e7_45%,#6f80e0_80%,#5566d4)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.15),0_6px_20px_-6px_rgb(111_128_224/0.7)]">
        {bars.map((b, i) => (
          <i key={i} className={`w-[2.5px] rounded-sm bg-white animate-bar ${b.h}`} style={{ animationDelay: b.delay }} />
        ))}
      </span>
      <span>
        Voxa<span className="ml-1 text-gradient">AI</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Tighten the bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-6 rounded-lg border px-3 transition-all duration-500 sm:px-4 ${
          scrolled
            ? "h-14 border-line bg-[#0b0b0f]/80 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent"
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-md border border-line bg-white/[0.03] p-1 text-sm lg:flex">
          {links.map((l) => {
            const on = active === l.href;
            return (
              <a
                key={l.label}
                href={l.href}
                aria-current={on ? "true" : undefined}
                className={`relative rounded-[5px] px-3.5 py-1.5 transition-colors ${on ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"}`}
              >
                {l.label}
                {on && <span aria-hidden className="absolute inset-x-3.5 -bottom-[5px] h-px bg-[linear-gradient(90deg,transparent,#8898e7,transparent)]" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Link href="#" className="hidden rounded-md px-3 py-2 text-body transition-colors hover:bg-white/[0.06] sm:inline">
            Log in
          </Link>
          <Link
            href="#demo"
            data-magnetic
            className="group hidden items-center gap-2 rounded-md bg-fg py-2 pr-3 pl-4 font-medium text-bg shadow-[0_8px_24px_-10px_rgb(136_152_231/0.8)] transition-colors hover:bg-white sm:inline-flex"
          >
            Book a demo
            <span className="grid size-5 place-items-center rounded-[4px] bg-bg text-fg transition-transform group-hover:translate-x-0.5">
              <svg viewBox="0 0 24 24" aria-hidden className="size-3 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-md border border-line text-fg lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute top-[5px] left-0 h-[1.5px] w-4 rounded-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-lg border border-line bg-[#0b0b0f]/95 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col p-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-[15px] text-body transition-colors hover:bg-white/[0.05] hover:text-fg">
              {l.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-4">
            <Link href="#" className="rounded-md border border-line py-2.5 text-center text-sm text-body">
              Log in
            </Link>
            <Link href="#demo" onClick={() => setOpen(false)} className="rounded-md bg-fg py-2.5 text-center text-sm font-medium text-bg">
              Book a demo
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
