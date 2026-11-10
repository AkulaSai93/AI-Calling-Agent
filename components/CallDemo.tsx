"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AGENT_NAME, calls, languages, type LangCode, type Line } from "@/data/demoCalls";

const GAP = 450; // pause between turns (ms)
const BARS = 32;

// Simulated speaking time per line when no recording is attached
const speakTime = (text: string) => Math.min(6500, Math.max(1800, text.length * 52));

function buildTimeline(lines: Line[], hasAudio: boolean) {
  const starts: number[] = [];
  const ends: number[] = [];
  let cursor = 0;
  lines.forEach((line, i) => {
    const start = hasAudio && line.at != null ? line.at * 1000 : cursor;
    const next = lines[i + 1];
    const end = hasAudio && next?.at != null ? next.at * 1000 - GAP : start + speakTime(line.text);
    starts.push(start);
    ends.push(end);
    cursor = end + GAP;
  });
  return { starts, ends, total: ends[ends.length - 1] ?? 0 };
}

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

// Deterministic pseudo-random so server and client render the same bars
const barShape = (i: number) => {
  const r = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return { height: 30 + Math.round(70 * Math.abs(Math.sin(i * 0.55)) * (0.55 + r * 0.45)), duration: 0.7 + r * 0.7, delay: -r * 1.4 };
};

const icons: Record<string, React.ReactNode> = {
  "loan-sales": <path d="M3 10h18M5 10V8l7-4 7 4v2M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16" />,
  collections: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  support: <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2zM20 13a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2zM17 17c0 2-2 3-5 3" />,
  appointments: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
};

export default function CallDemo() {
  const [callIdx, setCallIdx] = useState(0);
  const [lang, setLang] = useState<LangCode>("en");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLLIElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoStarted = useRef(false);

  const call = calls[callIdx];
  const lines = call.scripts[lang];
  const audioSrc = call.audio?.[lang];
  const { starts, ends, total } = useMemo(() => buildTimeline(lines, !!audioSrc), [lines, audioSrc]);

  const started = t > 0;
  const activeIdx = started ? starts.findIndex((s, i) => t >= s && t < ends[i]) : -1;
  const lastLitIdx = starts.reduce((acc, s, i) => (t >= s ? i : acc), -1);
  const speaker = activeIdx >= 0 ? lines[activeIdx].from : null;

  // Clock: follow the recording if there is one, otherwise simulate
  useEffect(() => {
    if (!playing) return;
    const audio = audioRef.current;
    if (audioSrc && audio) {
      audio.play().catch(() => setPlaying(false));
    }
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setT((prev) => (audioSrc && audio ? audio.currentTime * 1000 : Math.min(prev + dt, total)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      audio?.pause();
    };
  }, [playing, total, audioSrc]);

  useEffect(() => {
    if (playing && t >= total) setPlaying(false);
  }, [t, total, playing]);

  // Keep the line being spoken in view inside the transcript (not the page)
  useEffect(() => {
    const box = transcriptRef.current;
    const el = lineRefs.current[lastLitIdx];
    if (!box || !el || !started) return;
    box.scrollTo({ top: Math.max(0, el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2), behavior: "smooth" });
  }, [lastLitIdx, started]);

  // Start the first call automatically the first time the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoStarted.current) {
          autoStarted.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const restart = () => {
    setT(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const chooseCall = (i: number) => {
    if (i === callIdx) return;
    setCallIdx(i);
    restart();
    setPlaying(true);
  };

  const chooseLang = (code: LangCode) => {
    if (code === lang) return;
    setLang(code);
    restart();
    setPlaying(true);
  };

  const togglePlay = () => {
    if (!playing && t >= total) restart();
    setPlaying((p) => !p);
  };

  const finished = started && t >= total;
  const status = finished
    ? "Call completed"
    : speaker === "agent"
      ? `${AGENT_NAME} is speaking…`
      : speaker === "customer"
        ? `${call.customer} is speaking…`
        : playing
          ? "Listening…"
          : "Tap play to listen";

  return (
    <section ref={sectionRef} id="calls" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[640px] text-center">
        <p className="text-gradient text-sm font-medium tracking-wide">Hear it in action</p>
        <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
          Listen to a <em className="text-gradient pr-[0.06em] font-serif font-normal tracking-normal">real</em> call
        </h2>
        <p className="mt-4 text-base leading-relaxed text-balance text-muted sm:text-lg">
          Across industries. Across languages. Pick a use case, switch the language, and hear how {AGENT_NAME} handles it end to end.
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-[28px] border border-line bg-white/[0.025] shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] backdrop-blur-md">
        <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_minmax(0,1.3fr)]">
          {/* Use cases + language */}
          <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
            <p className="px-2 text-xs text-faint">Choose a use case</p>
            <div role="tablist" aria-label="Use case" className="mt-2.5 flex gap-1 overflow-x-auto [scrollbar-width:none] lg:flex-col">
              {calls.map((c, i) => {
                const on = i === callIdx;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => chooseCall(i)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm whitespace-nowrap transition-colors ${
                      on ? "bg-white/[0.07] text-fg" : "text-muted hover:bg-white/[0.04] hover:text-fg"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className={`size-4 shrink-0 fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round] ${on ? "stroke-brand" : "stroke-faint"}`}
                    >
                      {icons[c.id]}
                    </svg>
                    {c.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 px-2 text-xs text-faint">Language</p>
            <div role="radiogroup" aria-label="Language" className="mt-2.5 grid grid-cols-4 gap-1.5 lg:grid-cols-2">
              {languages.map((l) => {
                const on = l.code === lang;
                return (
                  <button
                    key={l.code}
                    role="radio"
                    aria-checked={on}
                    onClick={() => chooseLang(l.code)}
                    className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-1.5 text-[13px] transition-colors ${
                      on ? "border-brand/50 bg-brand/15 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
                    }`}
                  >
                    <span className="font-medium">{l.native}</span>
                    <span className="hidden sm:inline lg:hidden xl:inline">{l.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Call panel */}
          <div className="relative flex flex-col items-center border-b border-line px-6 pt-6 pb-8 lg:border-r lg:border-b-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(70% 55% at 50% 40%, rgb(136 152 231 / 0.12), transparent 70%), radial-gradient(50% 40% at 30% 70%, rgb(163 176 245 / 0.08), transparent 70%)" }}
            />
            <div className="relative flex w-full items-center justify-between text-xs text-muted">
              <span className="inline-flex items-center gap-2">
                <span className={`size-[7px] rounded-full ${playing ? "bg-live animate-ping-soft" : finished ? "bg-faint" : "bg-live"}`} />
                {call.direction} call
              </span>
              <span className="tabular-nums">{formatTime(t)}</span>
            </div>

            {/* Agent orb */}
            <div className="relative mt-10 grid size-32 place-items-center">
              {playing && speaker === "agent" && (
                <>
                  <span className="absolute inset-0 rounded-full border border-brand/40 animate-ring" />
                  <span className="absolute inset-0 rounded-full border border-brand-deep/30 animate-ring [animation-delay:0.6s]" />
                </>
              )}
              <div
                className={`size-28 rounded-full shadow-[0_20px_60px_-10px_rgb(136_152_231/0.6)] transition-transform duration-500 ${playing && speaker === "agent" ? "scale-105" : ""}`}
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, rgb(255 255 255 / 0.55), transparent 38%), radial-gradient(circle at 70% 75%, #5566d4, transparent 55%), radial-gradient(circle at 25% 75%, #a3b0f5, transparent 60%), linear-gradient(135deg, #c3cbff, #8898e7 50%, #6f80e0)",
                }}
              />
            </div>

            <p className="relative mt-5 text-lg">
              {AGENT_NAME} <span className="text-faint">·</span> <span className="text-gradient">Voxa AI</span>
            </p>
            <p className="relative mt-1 text-sm text-muted">
              {call.direction === "Outbound" ? "Calling" : "Answering"} {call.customer} for {call.company}
            </p>

            {/* Waveform */}
            <div aria-hidden className="relative mt-7 flex h-12 w-full max-w-[260px] items-center justify-center gap-[3px]">
              {Array.from({ length: BARS }, (_, i) => {
                const b = barShape(i);
                const live = playing && speaker !== null;
                return (
                  <span
                    key={i}
                    className={`w-[3px] origin-center rounded-full transition-colors duration-300 ${
                      speaker === "customer" ? "bg-[#d4d5dd]" : "bg-[linear-gradient(180deg,#c3cbff,#8898e7,#6f80e0)]"
                    } ${live ? "animate-wave" : ""}`}
                    style={{
                      height: `${live ? b.height : 10}%`,
                      animationDuration: `${b.duration}s`,
                      animationDelay: `${b.delay}s`,
                      opacity: live ? 1 : 0.35,
                    }}
                  />
                );
              })}
            </div>
            <p className="relative mt-2 h-5 text-xs text-muted" aria-live="polite">
              {status}
            </p>

            <button
              onClick={togglePlay}
              className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-deep py-2.5 pr-5 pl-4 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16),0_10px_30px_-10px_rgb(111_128_224/0.8)] transition-transform hover:scale-[1.03]"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1.2" />
                  <rect x="14" y="5" width="4" height="14" rx="1.2" />
                </svg>
              ) : finished ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden>
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.5-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" />
                </svg>
              )}
              {playing ? "Pause" : finished ? "Replay call" : "Play call"}
            </button>
          </div>

          {/* Transcript */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <span className="text-sm font-medium">Live transcript</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  finished ? "border-live/40 bg-live/10 text-live" : "border-line text-faint"
                }`}
              >
                <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden>
                  <path d="m5 12 5 5 9-10" />
                </svg>
                {call.outcome}
              </span>
            </div>

            <div ref={transcriptRef} className="relative h-[400px] overflow-y-auto px-4 py-6 [scrollbar-width:thin] sm:h-[440px] sm:px-6">
              <ol className="flex flex-col gap-4" lang={lang}>
                {lines.map((line, i) => {
                  const isAgent = line.from === "agent";
                  const lit = !started || t >= starts[i];
                  const active = i === activeIdx;
                  const words = line.text.split(" ");
                  const progress = active ? (t - starts[i]) / (ends[i] - starts[i]) : 1;
                  const shown = active ? Math.max(1, Math.ceil(progress * words.length)) : words.length;

                  return (
                    <li
                      key={`${call.id}-${lang}-${i}`}
                      ref={(el) => {
                        lineRefs.current[i] = el;
                      }}
                      className={`flex transition-opacity duration-500 ${isAgent ? "" : "justify-end"} ${lit ? "opacity-100" : "opacity-30"}`}
                    >
                      <div className={`flex max-w-[86%] flex-col ${isAgent ? "items-start" : "items-end"}`}>
                        <span className="mb-1 px-1 text-[11px] text-faint">{isAgent ? `${AGENT_NAME} · AI agent` : call.customer}</span>
                        <p
                          className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed transition-colors ${
                            isAgent
                              ? `rounded-tl-md border text-fg ${active ? "border-brand/45 bg-brand/[0.12]" : "border-brand/20 bg-brand/[0.06]"}`
                              : "rounded-tr-md border border-line bg-white/[0.04] text-body"
                          }`}
                        >
                          {words.slice(0, shown).join(" ")}
                          {shown < words.length && <span className="text-fg/20"> {words.slice(shown).join(" ")}</span>}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex items-center gap-3 border-t border-line px-5 py-4 sm:px-6">
              <span className="text-gradient text-2xl font-medium tracking-tight">{call.stat.value}</span>
              <span className="text-sm text-muted">{call.stat.label} for teams using Voxa for {call.label.toLowerCase()}</span>
            </div>
          </div>
        </div>

        {audioSrc && <audio ref={audioRef} src={audioSrc} preload="none" />}
      </div>
    </section>
  );
}
