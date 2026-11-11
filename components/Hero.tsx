import LeadForm from "./LeadForm";
import Usps from "./Usps";
import HeroVoice from "./HeroVoice";

const plain = "text-fg";

// Each word sits in its own mask so GSAP can slide it up into view
function Word({ children, className = plain }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
      <span data-word className={`inline-block ${className}`}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="demo" data-hero className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 pt-12 pb-20 text-center sm:px-6 sm:pt-16 sm:pb-24">
      {/* Soft glow that follows the cursor (positioned by Motion.tsx) */}
      <div
        aria-hidden
        data-cursor-glow
        className="pointer-events-none absolute top-0 left-0 -z-10 hidden size-[520px] rounded-full opacity-0 blur-[60px] md:block"
        style={{ background: "radial-gradient(closest-side, rgb(136 152 231 / 0.22), transparent)" }}
      />

      <div data-hero-voice className="mb-10 flex w-full justify-center sm:mb-12">
        <HeroVoice />
      </div>

      <h1 className="max-w-[980px] text-[clamp(36px,6.2vw,76px)] leading-[1.04] font-light tracking-[-0.045em] text-balance">
        <Word>AI</Word> <Word>calling</Word> <Word>agents</Word> <Word>that</Word>
        <br className="hidden sm:block" /> <Word>sound</Word>{" "}
        <Word className="text-[#6e6f78]">human</Word> <Word>&amp;</Word> <Word>sell</Word>{" "}
        <Word>24/7</Word>
      </h1>

      <p data-hero-rest className="mt-6 max-w-[720px] text-[clamp(16px,1.6vw,18px)] leading-relaxed text-balance text-muted">
        Qualify leads, book meetings and resolve support calls 24/7 — in 15+ languages, with sub-second
        responses and zero hold music.
      </p>

      <div data-hero-rest className="flex w-full justify-center">
        <LeadForm />
      </div>

      <div data-hero-rest className="flex w-full justify-center">
        <Usps />
      </div>
    </section>
  );
}
