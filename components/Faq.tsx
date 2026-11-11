"use client";

import { useState } from "react";

// Answers are a starting point — have legal/compliance review the regulatory ones before launch.
const faqs = [
  {
    q: "What exactly is Adya AI?",
    a: "Adya is an AI calling platform. It makes and answers phone calls for your business — reminders, keypad (AVR) menus and full two-way conversations — in a natural, human-like voice, at any scale.",
  },
  {
    q: "Will my customers know they're talking to an AI?",
    a: "Adya sounds remarkably human, with natural pauses and the ability to handle interruptions. We still recommend a short disclosure at the start of each call, and you can configure exactly how the agent introduces itself.",
  },
  {
    q: "Which languages and accents do you support?",
    a: "15+ languages including English, Hindi, Tamil, Telugu, Kannada, Marathi, Malayalam, Gujarati, Bengali and Punjabi. The agent understands regional accents and can switch languages mid-call if the customer does.",
  },
  {
    q: "How is this different from IVR or robocalls?",
    a: "IVR plays fixed recordings and waits for key-presses. Adya understands what the customer actually says, answers follow-up questions, handles objections and takes action — like booking a slot or sending a payment link — during the call.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most teams launch their first campaign the same day. Describe your goal, pick a voice and language, take a test call on your own phone, and you're ready to go.",
  },
  {
    q: "Does it integrate with my CRM and tools?",
    a: "Yes. Adya connects to popular CRMs, Google Sheets, WhatsApp and calendars, or to anything else through our API and webhooks. Call outcomes, transcripts and summaries sync back automatically.",
  },
  {
    q: "What happens when the AI can't answer something?",
    a: "The agent warmly transfers the call to a human on your team, along with a summary of the conversation so far — so the customer never has to repeat themselves.",
  },
  {
    q: "Is it compliant with Indian calling regulations?",
    a: "Adya is built to help you stay compliant: DND scrubbing, calling-hour limits, consent capture, encrypted call data and storage in India. Our team can walk you through the setup for your industry.",
  },
  {
    q: "How is pricing calculated?",
    a: "You pay per connected minute, with volume discounts as you scale. There are no setup fees, and you can start with a free demo call before committing to anything.",
  },
  {
    q: "Can I use my own phone numbers?",
    a: "Yes. Bring your existing numbers or get new local numbers from us, and calls will show your business name wherever caller ID branding is supported.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="faq" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
        {/* Left: heading + contact */}
        <div data-reveal className="self-start lg:sticky lg:top-28">
          <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">FAQs</p>
          <h2 className="mt-3 text-[clamp(30px,4.4vw,52px)] leading-[1.08] font-light tracking-[-0.03em]">
            Questions, <span className="text-[#6e6f78]">answered</span>
          </h2>
          <p className="mt-4 max-w-[340px] text-base leading-relaxed text-muted">
            Everything you need to know about putting AI on your phone lines.
          </p>

          <div className="mt-10 hidden border-t border-line pt-8 lg:block">
            <p className="text-[15px] font-medium">Still have questions?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">Our team usually replies within a few hours.</p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#demo" data-magnetic className="rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-white">
                Talk to us
              </a>
              <a href="mailto:hello@adya.ai" className="text-sm text-muted transition-colors hover:text-fg">
                hello@adya.ai
              </a>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <ul data-stagger className="border-b border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-t border-line">
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6"
                  >
                    <span className={`w-6 shrink-0 pt-1 text-xs tabular-nums transition-colors ${isOpen ? "text-brand-light" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 text-[17px] leading-snug font-medium transition-colors sm:text-lg ${isOpen ? "text-fg" : "text-body group-hover:text-fg"}`}>
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative mt-1 grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-brand/50 bg-brand/15 text-brand-light" : "border-line-strong text-muted group-hover:text-fg"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="size-3 fill-none stroke-current stroke-[2.4] [stroke-linecap:round]">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[640px] pr-10 pb-7 pl-10 text-[15px] leading-relaxed text-muted sm:pl-12">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Contact, shown after the list on smaller screens */}
        <div className="lg:hidden">
          <p className="text-[15px] font-medium">Still have questions?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">Our team usually replies within a few hours.</p>
          <div className="mt-5 flex items-center gap-3">
            <a href="#demo" data-magnetic className="rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-white">
              Talk to us
            </a>
            <a href="mailto:hello@adya.ai" className="text-sm text-muted transition-colors hover:text-fg">
              hello@adya.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
