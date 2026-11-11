// Big statement whose words light up from grey to white as you scroll (driven by Motion.tsx)
const text =
  "Your customers don't want to wait on hold. They want answers in their language, at any hour. Voxa picks up every call, speaks like your best agent, and never takes a day off.";

export default function Statement() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-36">
      <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">Why it matters</p>
      <p data-scrub-text className="mt-6 max-w-[1050px] text-[clamp(28px,4.2vw,58px)] leading-[1.12] font-light tracking-[-0.03em]">
        {text.split(" ").map((w, i) => (
          <span key={i} data-scrub-word className="text-[#2c2d33]">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
