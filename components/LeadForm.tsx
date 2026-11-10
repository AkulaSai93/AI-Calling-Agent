"use client";

import { useState, type FormEvent } from "react";

type Field = "name" | "email" | "phone";
type Status = "idle" | "error" | "submitting" | "success";

const validators: Record<Field, (v: string) => boolean> = {
  name: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone: (v) => /^[6-9]\d{9}$/.test(v.trim()),
};

const messages: Record<Field, string> = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid 10-digit mobile number.",
};

const fieldBase =
  "relative flex h-12 cursor-text items-center gap-2.5 rounded-md border bg-white/[0.025] px-4 transition-colors hover:bg-white/[0.06] focus-within:border-brand/55 focus-within:bg-brand/[0.07] [&_svg]:stroke-faint focus-within:[&_svg]:stroke-brand";
const inputBase = "min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-faint";
const iconBase = "size-[17px] shrink-0 fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]";

export default function LeadForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", phone: "" });
  const [invalid, setInvalid] = useState<Field[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: field === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value }));
    setInvalid((f) => f.filter((x) => x !== field));
    if (status === "error") setStatus("idle");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bad = (Object.keys(validators) as Field[]).filter((k) => !validators[k](values[k]));
    setInvalid(bad);

    if (bad.length) {
      setStatus("error");
      setNote(messages[bad[0]]);
      (e.currentTarget.elements.namedItem(bad[0]) as HTMLInputElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    // TODO: replace with the real endpoint that triggers the demo call.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setNote(`Thanks, ${values.name.trim().split(" ")[0]}! Pick up — your AI agent is dialing +91 ${values.phone}.`);
  };

  const border = (f: Field) => (invalid.includes(f) ? "border-danger/60" : "border-transparent");

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 w-full max-w-[900px]">
      <div className="grid grid-cols-1 gap-1.5 rounded-lg border border-line bg-white/[0.04] p-1.5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8),0_0_0_6px_rgb(136_152_231/0.04)] backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:rounded-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:rounded-lg">
        <label className={`${fieldBase} ${border("name")}`}>
          <span className="sr-only">Full name</span>
          <svg viewBox="0 0 24 24" aria-hidden className={iconBase}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
          <input name="name" type="text" placeholder="Full name" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} className={inputBase} />
        </label>

        <label className={`${fieldBase} ${border("email")}`}>
          <span className="sr-only">Work email</span>
          <svg viewBox="0 0 24 24" aria-hidden className={iconBase}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <input name="email" type="email" placeholder="Work email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} className={inputBase} />
        </label>

        <label className={`${fieldBase} ${border("phone")}`}>
          <span className="sr-only">Phone number</span>
          <span className="border-r border-line pr-2.5 text-sm text-muted">+91</span>
          <input name="phone" type="tel" inputMode="numeric" placeholder="Phone number" autoComplete="tel-national" value={values.phone} onChange={(e) => update("phone", e.target.value)} className={inputBase} />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gradient-deep bg-size-[160%_100%] bg-left px-[22px] text-[15px] font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16),0_10px_30px_-10px_rgb(111_128_224/0.8)] transition-[transform,box-shadow,background-position,opacity] duration-500 hover:-translate-y-px hover:bg-right disabled:cursor-progress disabled:opacity-70 sm:col-span-2 lg:col-span-1"
        >
          {status === "submitting" ? "Connecting…" : status === "success" ? "Calling you now" : "Get a demo call"}
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-transform group-hover:translate-x-[3px]">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <p
        role="status"
        className={`mt-4 flex items-center justify-center gap-2 text-[12.5px] sm:text-[13.5px] ${
          status === "error" ? "text-danger" : status === "success" ? "text-live" : "text-faint"
        }`}
      >
        {status !== "error" && <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-live animate-ping-soft" />}
        {status === "error" || status === "success" ? note : "Our AI agent calls you in 30 seconds. No spam."}
      </p>
    </form>
  );
}
