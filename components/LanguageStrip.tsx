import { spokenLanguages } from "@/data/demoCalls";

export default function LanguageStrip() {
  return (
    <section aria-labelledby="languages-title" className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
      <div data-reveal className="text-center">
        <h3 id="languages-title" className="text-xl font-medium tracking-tight sm:text-2xl">
          Reach every customer, <span className="text-gradient">in their language</span>
        </h3>
        <p className="mt-2 text-sm text-muted">Native accents, natural code-switching between English and regional languages.</p>
      </div>

      <ul data-stagger className="mt-10 grid grid-cols-5 border-y border-line lg:grid-cols-10">
        {spokenLanguages.map((l, i) => (
          <li
            key={l.name}
            className={`group flex flex-col items-center gap-2 py-6 ${i % 5 !== 0 ? "border-l border-line" : ""} ${i === 5 ? "lg:border-l lg:border-line" : ""} ${i >= 5 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <span className="text-[28px] leading-none text-fg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-brand sm:text-[32px]">
              {l.glyph}
            </span>
            <span className="text-[11px] text-muted sm:text-xs">{l.name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-xs text-faint">&amp; many more on request</p>
    </section>
  );
}
