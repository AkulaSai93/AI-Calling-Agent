import AdyaMark from "./AdyaMark";

// Customer voice (left) flows into the Adya tile and comes out as the AI's reply (right).
const BARS = 40;

// Deterministic pseudo-random so server and client render identical bars
const bar = (i: number, side: number) => {
  const r = Math.abs(Math.sin((i + side * 97) * 12.9898) * 43758.5453) % 1;
  const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.33 + side));
  return { height: Math.round(14 + 56 * env * (0.45 + r * 0.55)), duration: 1.6 + r * 1.2, delay: -r * 2.4 };
};

// One strip of bars; drawn twice side by side so the loop is seamless
function Bars({ side }: { side: 0 | 1 }) {
  return (
    <span className="flex shrink-0 items-center gap-[7px] pr-[7px] sm:gap-[9px] sm:pr-[9px]">
      {Array.from({ length: BARS }, (_, i) => {
        const b = bar(i, side);
        return (
          <span
            key={i}
            className={`w-[2px] shrink-0 rounded-full animate-wave ${side === 0 ? "bg-white/35" : "bg-[linear-gradient(180deg,#c3cbff,#8898e7,#6f80e0)]"}`}
            style={{ height: `${b.height}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
          />
        );
      })}
    </span>
  );
}

// Still strip of gently pulsing bars, fading away from the mic
function Wave({ side }: { side: 0 | 1 }) {
  const fade = side === 0 ? "linear-gradient(90deg, transparent, #000 45%)" : "linear-gradient(270deg, transparent, #000 45%)";
  return (
    <div className="relative h-14 min-w-0 flex-1 overflow-hidden sm:h-16" style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <div className={`absolute inset-y-0 flex w-max ${side === 0 ? "right-0" : "left-0"}`}>
        <Bars side={side} />
        <Bars side={side} />
      </div>
    </div>
  );
}

export default function HeroVoice() {
  return (
    <div aria-hidden data-scrub-out className="flex w-full max-w-[920px] items-center gap-4 sm:gap-6">
      <Wave side={0} />

      <div className="relative grid size-20 shrink-0 place-items-center sm:size-24">
        {/* Glow */}
        <span className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(136_152_231/0.45),transparent)] blur-md" />
        <span className="absolute inset-0 rounded-lg border border-brand/40 animate-ring [animation-duration:2.4s]" />
        <div className="relative grid size-full place-items-center rounded-lg border border-white/15 bg-[linear-gradient(160deg,#20243d,#0d0e17_70%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_20px_50px_-12px_rgb(85_102_212/0.7)] sm:rounded-lg">
          <AdyaMark animated className="size-10 sm:size-12" />
        </div>
      </div>

      <Wave side={1} />
    </div>
  );
}
