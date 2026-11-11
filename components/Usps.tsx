const usps = [
  { value: "10M+", label: "Calls handled" },
  { value: "<500ms", label: "Response latency" },
  { value: "15+", label: "Languages & accents" },
  { value: "70%", label: "Lower calling cost" },
];

export default function Usps() {
  return (
    <ul aria-label="Why Voxa" className="mt-20 grid w-full max-w-[1040px] grid-cols-2 border-y border-line md:grid-cols-4">
      {usps.map(({ value, label }, i) => (
        <li
          key={label}
          className={`flex flex-col items-center gap-2 px-2 py-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i === 2 ? "md:border-l md:border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""}`}
        >
          <strong className="text-[28px] leading-none font-light tracking-[-0.03em] tabular-nums sm:text-[36px]">{value}</strong>
          <span className="font-mono text-[10px] tracking-[0.22em] whitespace-nowrap text-muted uppercase sm:text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
