import Link from "next/link";

const links = [
  { label: "Product", href: "#offerings" },
  { label: "Live demo", href: "#calls" },
  { label: "Integrations", href: "#" },
  { label: "Pricing", href: "#" },
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
      <span aria-hidden className="inline-flex size-[30px] items-center justify-center gap-[2.5px] rounded-[9px] bg-[linear-gradient(135deg,#a3b0f5,#8898e7_45%,#6f80e0_80%,#5566d4)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.15),0_6px_20px_-6px_rgb(111_128_224/0.6)]">
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
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition-colors hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Link href="#" className="hidden rounded-full px-4 py-2 text-body transition-colors hover:bg-white/[0.06] sm:inline">
            Log in
          </Link>
          <Link href="#demo" className="rounded-full bg-fg px-4 py-2 font-medium text-bg transition-colors hover:bg-white">
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
