import Laurel from "./Laurel";

const usps = [
  { value: "10M+", label: "calls handled" },
  { value: "<500ms", label: "response latency" },
  { value: "15+", label: "languages & accents" },
  { value: "70%", label: "lower calling cost" },
];

export default function Usps() {
  return (
    <ul aria-label="Why Voxa" className="mt-20 grid w-full max-w-[1040px] grid-cols-2 gap-y-8 md:grid-cols-4">
      {usps.map(({ value, label }, i) => (
        <li
          key={label}
          className={`flex items-center justify-center gap-1 px-1.5 py-2 sm:gap-2 ${i % 2 === 1 ? "border-l border-line" : ""} ${i === 2 ? "md:border-l md:border-line" : ""}`}
        >
          <Laurel className="h-10 w-[18px] text-[#3f4048] sm:h-[52px] sm:w-6" />
          <div className="flex min-w-0 flex-col items-center gap-1.5">
            <strong className="text-2xl leading-none font-medium tracking-tight tabular-nums sm:text-[32px]">{value}</strong>
            <span className="whitespace-nowrap text-xs text-muted sm:text-[13px]">{label}</span>
          </div>
          <Laurel flip className="h-10 w-[18px] text-[#3f4048] sm:h-[52px] sm:w-6" />
        </li>
      ))}
    </ul>
  );
}
