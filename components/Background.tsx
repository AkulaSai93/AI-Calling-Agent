export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Blue glow behind the headline (TitanGate's #8898e7) */}
      <div
        className="absolute left-1/2 -top-[300px] h-[720px] w-[1200px] -translate-x-1/2 blur-[30px]"
        style={{
          background:
            "radial-gradient(closest-side at 50% 50%, rgb(136 152 231 / 0.26), transparent 72%), radial-gradient(closest-side at 32% 55%, rgb(163 176 245 / 0.12), transparent 70%), radial-gradient(closest-side at 70% 55%, rgb(85 102 212 / 0.14), transparent 70%)",
        }}
      />
      {/* Soft graphite sheen, like TitanGate's dark grey gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(240deg,rgb(49_49_49/0.18)_0%,transparent_45%)]" />
    </div>
  );
}
