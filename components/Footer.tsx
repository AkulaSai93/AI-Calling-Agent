import Link from "next/link";

// Hrefs marked "#" are placeholders until those pages / profiles exist.
const columns = [
  {
    title: "Product",
    links: [
      { label: "One-way calling", href: "#one-way" },
      { label: "AVR calling", href: "#avr" },
      { label: "Two-way calling", href: "#two-way" },
      { label: "Live demo", href: "#calls" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Compare", href: "#compare" },
      { label: "FAQs", href: "#faq" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X (Twitter)", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

const label = "font-mono text-[11px] tracking-[0.24em] text-faint uppercase";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Closing line + contact */}
        <div data-reveal className="grid gap-10 border-b border-line py-16 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className={label}>Get started</p>
            <h2 className="mt-4 text-[clamp(32px,4.6vw,60px)] leading-[1.05] font-light tracking-[-0.035em] text-balance">
              Let Voxa take <span className="text-[#6e6f78]">the next call</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <a href="mailto:hello@voxa.ai" className="group text-[clamp(20px,2.2vw,28px)] font-light tracking-tight text-body transition-colors hover:text-fg">
              hello@voxa.ai
              <span className="block h-px origin-left scale-x-0 bg-fg transition-transform duration-500 group-hover:scale-x-100" />
            </a>
            <a
              href="#demo"
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-md bg-fg py-3 pr-3 pl-5 font-mono text-[11px] tracking-[0.18em] text-bg uppercase transition-colors hover:bg-white"
            >
              Book a demo
              <span className="grid size-6 place-items-center rounded-[4px] bg-bg text-fg transition-transform group-hover:translate-x-0.5">
                <svg viewBox="0 0 24 24" aria-hidden className="size-3 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Brand + links */}
        <div className="grid gap-12 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" aria-label="Voxa AI home" className="inline-flex items-center gap-2.5 text-lg font-medium tracking-tight">
              <span aria-hidden className="inline-flex size-8 items-center justify-center gap-[2.5px] rounded-md bg-[linear-gradient(135deg,#a3b0f5,#8898e7_45%,#6f80e0_80%,#5566d4)]">
                {["h-2", "h-3.5", "h-2.5", "h-1.5"].map((h, i) => (
                  <i key={i} className={`w-[2.5px] rounded-sm bg-white ${h}`} />
                ))}
              </span>
              <span>
                Voxa<span className="ml-1 text-brand">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-muted">
              Human-like AI calling agents for sales, support and collections, in 15+ languages.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className={label}>{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-muted transition-colors hover:text-fg">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Voxa AI · Bengaluru, India</p>
          <p className="flex gap-6">
            <a href="#" className="transition-colors hover:text-fg">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-fg">
              Terms
            </a>
          </p>
        </div>
      </div>

      {/* Large wordmark: natural letter spacing, fades into the page bottom */}
      <svg aria-hidden viewBox="0 0 1000 220" className="mx-auto -mb-[3%] block w-full max-w-[1400px] px-4 select-none">
        <defs>
          <linearGradient id="footer-wordmark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8898e7" stopOpacity="0.55" />
            <stop offset="1" stopColor="#8898e7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <text x="500" y="200" textAnchor="middle" fill="url(#footer-wordmark)" className="font-sans" style={{ fontSize: 270, fontWeight: 300, letterSpacing: "-0.05em" }}>
          Voxa AI
        </text>
      </svg>
    </footer>
  );
}
