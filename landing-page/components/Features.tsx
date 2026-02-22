const FEATURES = [
  {
    title: "Precision heating",
    description:
      "Ceramic heating elements warm your seat and back to any temperature from 86°F to 113°F. Reaches target temp in under 3 minutes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M12 3a1.5 1.5 0 011.5 1.5v8.09a4 4 0 11-3 0V4.5A1.5 1.5 0 0112 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="17" r="2" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
    color: "text-amber-chair",
    bgColor: "bg-amber-chair/10",
  },
  {
    title: "Active Peltier cooling",
    description:
      "Thermoelectric Peltier modules draw heat away from the pad surface, cooling to 59–68°F range. No compressor. Near-silent at <35dB.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    color: "text-ice",
    bgColor: "bg-ice/10",
  },
  {
    title: "Near-silent operation",
    description:
      "No whirring fan blades. CryoSeat operates at under 35dB — quieter than a whisper. You'll forget it's running during calls.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M8 15H4a2 2 0 01-2-2v-2a2 2 0 012-2h4l5-5v14l-5-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M17 9l-3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 7l-6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "text-neutral-300",
    bgColor: "bg-neutral-700/30",
  },
  {
    title: "Dual independent zones",
    description:
      "Seat and back run completely independently. Set different temperatures for each, or mirror them. The app gives you individual zone controls.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7h2m0 0v6m0 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "text-ice",
    bgColor: "bg-ice/10",
  },
  {
    title: "Fits most chairs",
    description:
      "Universal elastic anchor system fits 95% of standard office chairs: Herman Miller, Steelcase, IKEA, DXRacer, Autonomous, Secretlab, and more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "text-ice",
    bgColor: "bg-ice/10",
  },
  {
    title: "Safety-first design",
    description:
      "Automatic overheat cutoff at 120°F. Condensation guard layer prevents moisture buildup in cool mode. UL-listed power supply included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M12 2L4 6v6c0 5.25 3.5 10.14 8 11.25C16.5 22.14 20 17.25 20 12V6l-8-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-amber-chair",
    bgColor: "bg-amber-chair/10",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="section bg-bg-surface"
      aria-labelledby="features-heading"
    >
      <div className="container-content">
        <div className="max-w-prose mx-auto text-center mb-16">
          <span className="eyebrow mb-4 block">Features</span>
          <h2
            id="features-heading"
            className="text-display-md text-neutral-50 mb-6"
          >
            Everything you need.
            <span className="gradient-text-ice"> Nothing you don't.</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="card hover:border-bg-border/80 transition-colors">
              <span
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.bgColor} ${feature.color} mb-5`}
              >
                {feature.icon}
              </span>
              <h3 className="text-body font-semibold text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-body-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
