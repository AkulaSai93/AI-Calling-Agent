// "What we offer" section. Stats are placeholders — swap for real numbers.

export type OfferingId = "one-way" | "avr" | "two-way";

export type Offering = {
  id: OfferingId;
  step: string;
  stage: string; // label on the "simple → intelligent" track
  name: string;
  tagline: string;
  accent: string;
  unique: string;
  features: string[];
  useCases: string[];
  stat: { value: string; label: string };
};

export const offerings: Offering[] = [
  {
    id: "one-way",
    step: "01",
    stage: "Announce",
    name: "One-way calling",
    tagline: "Personalised voice broadcasts to thousands, in minutes.",
    accent: "#c3cbff",
    unique:
      "Every call is personalised with the customer's name, amount and date, in their language.",
    features: [
      "Payment, EMI & renewal reminders",
      "Appointment & delivery alerts",
      "OTP & verification calls",
      "Scheduled campaigns with smart retries",
      "Per-call delivery & listen-through reports",
    ],
    useCases: ["EMI reminders", "Order updates", "Policy renewals", "Event alerts"],
    stat: { value: "1L+", label: "calls per hour" },
  },
  {
    id: "avr",
    step: "02",
    stage: "Interact",
    name: "AVR calling",
    tagline: "Customers press or say 1, 2 or 3 to act on the call.",
    accent: "#8898e7",
    unique:
      "Callers can just say “reschedule” instead of pressing keys. Every answer syncs to your CRM.",
    features: [
      "Multi-level menus (press 1, 2, 3…)",
      "Keypad (DTMF) and speech input",
      "Confirm, cancel or reschedule in one call",
      "Route to the right team or a live agent",
      "Every key-press logged to your CRM",
    ],
    useCases: ["COD confirmation", "Lead interest check", "Feedback & NPS", "Appointment confirmation"],
    stat: { value: "3×", label: "higher response than SMS" },
  },
  {
    id: "two-way",
    step: "03",
    stage: "Converse",
    name: "Two-way calling",
    tagline: "Human-like agents that listen, understand and reply.",
    accent: "#6f80e0",
    unique:
      "Handles interruptions and language switches in under 500ms, and hands off to a human when needed.",
    features: [
      "Natural voice in 15+ languages",
      "Answers questions & handles objections",
      "Books meetings and collects payments",
      "Warm transfer to humans with context",
      "Call summaries, sentiment & transcripts",
    ],
    useCases: ["Lead qualification", "Customer support", "Collections", "Onboarding"],
    stat: { value: "88%", label: "calls resolved without a human" },
  },
];

// The "combine them" flow under the cards
export const flow = [
  { tag: "One-way", text: "EMI reminder goes out to 50,000 customers" },
  { tag: "AVR", text: "“Press 1 to pay now, 2 for a payment plan”" },
  { tag: "Two-way", text: "Pressed 2? The AI agent negotiates a plan live" },
];
