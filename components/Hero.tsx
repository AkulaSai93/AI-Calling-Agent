import LeadForm from "./LeadForm";
import Usps from "./Usps";

// Staggered entrance for each hero row
const rise = (delay: string) => ({ style: { animationDelay: delay } });

export default function Hero() {
  return (
    <section id="demo" className="mx-auto flex max-w-[1200px] flex-col items-center px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-24">
      <h1
        {...rise("0s")}
        className="max-w-[980px] animate-rise text-[clamp(36px,6.2vw,76px)] leading-[1.04] font-medium tracking-[-0.035em] text-balance text-transparent bg-linear-to-b from-white from-30% to-[#a3a7b8] bg-clip-text"
      >
        AI calling agents that<br className="hidden sm:block" /> sound{" "}
        <em className="text-gradient pr-[0.06em] font-serif font-normal tracking-[-0.01em]">human</em> &amp; sell 24/7
      </h1>

      <p {...rise(".08s")} className="mt-6 max-w-[720px] animate-rise text-[clamp(16px,1.6vw,18px)] leading-relaxed text-balance text-muted">
        Qualify leads, book meetings and resolve support calls 24/7 — in 15+ languages, with sub-second
        responses and zero hold music.
      </p>

      <div {...rise(".16s")} className="flex w-full animate-rise justify-center">
        <LeadForm />
      </div>

      <div {...rise(".28s")} className="flex w-full animate-rise justify-center">
        <Usps />
      </div>
    </section>
  );
}
