// Customer voice (left) flows into the Voxa tile and comes out as the AI's reply (right).
const BARS = 90;

// Deterministic pseudo-random so server and client render identical bars
const bar = (i: number, side: number) => {
  const r = Math.abs(Math.sin((i + side * 97) * 12.9898) * 43758.5453) % 1;
  const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.33 + side));
  return { height: Math.round(18 + 82 * env * (0.45 + r * 0.55)), duration: 0.8 + r * 0.8, delay: -r * 1.6 };
};

function Wave({ side }: { side: 0 | 1 }) {
  const fade = side === 0 ? "linear-gradient(90deg, transparent, #000 70%)" : "linear-gradient(270deg, transparent, #000 70%)";
  return (
    <div
      className={`flex h-14 min-w-0 flex-1 items-center gap-[3px] overflow-hidden sm:h-16 ${side === 0 ? "justify-end" : "justify-start"}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      {Array.from({ length: BARS }, (_, i) => {
        const b = bar(i, side);
        return (
          <span
            key={i}
            className={`w-[2px] shrink-0 rounded-full animate-wave sm:w-[3px] ${side === 0 ? "bg-white/55" : "bg-[linear-gradient(180deg,#c3cbff,#8898e7,#6f80e0)]"}`}
            style={{ height: `${b.height}%`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
          />
        );
      })}
    </div>
  );
}

export default function HeroVoice() {
  return (
    <div aria-hidden className="flex w-full max-w-[920px] items-center gap-4 sm:gap-6">
      <Wave side={0} />

      <div className="relative grid size-20 shrink-0 place-items-center sm:size-24">
        {/* Glow */}
        <span className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgb(136_152_231/0.45),transparent)] blur-md" />
        <span className="absolute inset-0 rounded-lg border border-brand/40 animate-ring [animation-duration:2.4s]" />
        <div className="relative grid size-full place-items-center rounded-lg border border-white/15 bg-[linear-gradient(160deg,#20243d,#0d0e17_70%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_20px_50px_-12px_rgb(85_102_212/0.7)] sm:rounded-lg">
          <span className="flex h-9 items-center gap-[4px] sm:h-10">
            {[45, 80, 100, 65, 35].map((h, i) => (
              <i
                key={i}
                className="w-[4px] rounded-full bg-[linear-gradient(180deg,#e2e6ff,#8898e7)] animate-bar"
                style={{ height: `${h}%`, animationDelay: `${-i * 0.22}s` }}
              />
            ))}
          </span>
        </div>
      </div>

      <Wave side={1} />
    </div>
  );
}
