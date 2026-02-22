"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const FAQ_ITEMS = [
  {
    question: "Is it quiet? Will I hear it during video calls?",
    answer:
      "CryoSeat uses Peltier thermoelectric modules for cooling — no compressor, no rotating fan blades. Operating noise is under 35dB (the level of a quiet library). Your microphone won't pick it up, and you won't notice it during calls. The heat dissipation fan on the controller unit is slightly audible at arm's length but well below typical laptop fan noise.",
  },
  {
    question: "Won't the cooling mode cause condensation on my seat?",
    answer:
      "We've designed specifically for this. The pad uses a multi-layer stack: the Peltier module is separated from the contact surface by a thermal barrier and moisture-wicking mesh layer. In normal office humidity (30–60% RH), condensation does not form at the seat surface. At very high humidity, a moisture sensor pauses cooling and alerts the app. We've tested extensively at 85% RH with no surface moisture.",
  },
  {
    question: "Will it fit my Herman Miller Aeron / Steelcase / [other chair]?",
    answer:
      "CryoSeat fits the vast majority of standard office chairs, including: Herman Miller Aeron, Embody, Mirra; Steelcase Leap, Gesture; IKEA Markus, Millberget; Secretlab Titan; DXRacer; Autonomous ErgoChair; and most mesh/foam chairs with a standard seat pan and back. The elastic anchor system accommodates seat widths from 17\" to 22\" and back heights from 18\" to 26\". We'll publish a full compatibility list at launch.",
  },
  {
    question: "How much power does it use?",
    answer:
      "The complete seat + back system draws up to 90W at maximum heating or cooling. That's roughly equivalent to a laptop charger. A standard 100W USB-C power delivery adapter (included) covers it. Average real-world usage in mixed heating/idle/cooling mode is closer to 45–60W. Running it all day adds approximately $0.04–0.07 to your electricity bill.",
  },
  {
    question: "Is it safe? What if it overheats?",
    answer:
      "Safety is designed-in at every layer. The heating elements have a hardware thermal fuse that cuts power at 120°F — this is a physical cutoff that cannot be overridden by software. The controller firmware monitors temperature every 500ms and will shut down if any sensor reads above threshold. The power supply is UL-listed. We design to UL 60730 appliance control standards.",
  },
  {
    question: "How do I clean it?",
    answer:
      "The top cover is removable and machine-washable (cold, gentle cycle). Unclip the magnetic connectors, remove the cover, wash and air dry. The pad body with electronics should be wiped with a lightly damp cloth — no submersion. We recommend cleaning the cover monthly for hygiene.",
  },
  {
    question: "Does it require a subscription or the app to work?",
    answer:
      "No subscription. The pads work completely standalone — plug in, turn the dial on the controller, done. The iOS/Android app is free and unlocks scheduling, calendar sync, and usage history. Core temperature control never requires connectivity or a cloud service.",
  },
  {
    question: "When will it ship? Is this just a survey?",
    answer:
      "Honest answer: this is a demand validation test. We want to confirm that enough people want this before we commit to tooling and manufacturing. Your email goes on our genuine priority waitlist — if we hit our validation targets, founding members get early access pricing and first shipment priority. We'll send a survey with details and timeline after you join.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${index}`;
  const buttonId = `faq-button-${index}`;

  function handleToggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      track("faq_expand", { props: { question: question.slice(0, 40) } });
    }
  }

  return (
    <div className="border-b border-bg-border last:border-b-0">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={id}
        onClick={handleToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className="text-body font-medium text-neutral-200 group-hover:text-neutral-50 transition-colors">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-5 h-5 rounded-full border border-bg-border flex items-center justify-center mt-0.5 transition-transform duration-200 ${
            open ? "rotate-45 border-ice" : ""
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-neutral-400">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-body text-neutral-400 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className="section bg-bg-surface"
      aria-labelledby="faq-heading"
    >
      <div className="container-content">
        <div className="max-w-prose mx-auto text-center mb-12">
          <span className="eyebrow mb-4 block">FAQ</span>
          <h2
            id="faq-heading"
            className="text-display-md text-neutral-50"
          >
            Common questions,
            <span className="gradient-text-ice"> straight answers.</span>
          </h2>
        </div>

        <div className="max-w-[720px] mx-auto">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
