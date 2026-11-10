import Link from "next/link";

// Hrefs marked "#" are placeholders until those pages / profiles exist.
const columns = [
  {
    title: "Quick links",
    links: [
      { label: "Home", href: "#" },
      { label: "Live demo", href: "#calls" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "One-way calling", href: "#one-way" },
      { label: "AVR calling", href: "#avr" },
      { label: "Two-way calling", href: "#two-way" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "mailto:hello@voxa.ai" },
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

export default function Footer() {
  return (
    <footer className="mt-10 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-lg border border-line bg-[#0b0b0d]">
        <div className="px-6 pt-14 sm:px-12 sm:pt-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            {/* Brand */}
            <div>
              <Link href="/" aria-label="Voxa AI home" className="inline-flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                <span aria-hidden className="inline-flex size-9 items-center justify-center gap-[3px] rounded-[10px] bg-[linear-gradient(135deg,#a3b0f5,#8898e7_45%,#6f80e0_80%,#5566d4)]">
                  {["h-2.5", "h-4", "h-3", "h-2"].map((h, i) => (
                    <i key={i} className={`w-[3px] rounded-sm bg-white ${h}`} />
                  ))}
                </span>
                <span>
                  Voxa<span className="ml-1 text-gradient">AI</span>
                </span>
              </Link>
              <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-muted">
                Human-like AI calling agents for sales, support and collections — in 15+ languages.
              </p>
            </div>

            {/* Link columns */}
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {columns.map((col) => (
                <div key={col.title}>
                  <p className="text-[15px] font-medium text-fg">{col.title}</p>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom row */}
          <div className="mt-16 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Voxa AI. All rights reserved.</p>
            <p className="flex gap-6">
              <a href="#" className="transition-colors hover:text-fg">
                Privacy policy
              </a>
              <a href="#" className="transition-colors hover:text-fg">
                Terms of service
              </a>
            </p>
          </div>
        </div>

        {/* Giant wordmark, fading out at both edges */}
        {/* Giant wordmark stretched edge to edge, fading out at both ends */}
        <svg aria-hidden viewBox="0 0 1000 206" className="mt-8 block w-full select-none">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#5566d4" stopOpacity="0.08" />
              <stop offset="0.28" stopColor="#5566d4" />
              <stop offset="0.5" stopColor="#8898e7" />
              <stop offset="0.72" stopColor="#5566d4" />
              <stop offset="1" stopColor="#5566d4" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="203"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-wordmark)"
            className="font-sans font-bold"
            style={{ fontSize: 272, letterSpacing: "-0.04em" }}
          >
            VOXA AI
          </text>
        </svg>
      </div>
    </footer>
  );
}
