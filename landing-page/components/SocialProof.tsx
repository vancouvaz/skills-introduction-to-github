const PROOF_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ice" aria-hidden="true">
        <path
          d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 10a6 6 0 01-4-1.55V13c0-1.1.9-2 2-2h4a2 2 0 012 2v.45A6 6 0 0110 15z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle cx="10" cy="5.5" r="1.5" fill="currentColor" />
        <path
          d="M6 13c0-1.1.9-2 2-2h4a2 2 0 012 2v.45A5.97 5.97 0 0110 15a5.97 5.97 0 01-4-1.55V13z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
    ),
    label: "Built for deep work",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ice" aria-hidden="true">
        <path
          d="M10 2l1.5 4.5H16l-3.75 2.7 1.4 4.3L10 11.2l-3.65 2.3 1.4-4.3L4 6.5h4.5L10 2z"
          fill="currentColor"
          fillOpacity="0.4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Thermal comfort on demand",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ice" aria-hidden="true">
        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 9h6M7 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    label: "Fits your existing chair",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ice" aria-hidden="true">
        <path
          d="M10 3a7 7 0 110 14A7 7 0 0110 3zm0 2v5l3 2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Schedule-aware comfort",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-ice" aria-hidden="true">
        <path
          d="M3 10c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M7 10l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Near-silent operation",
  },
];

export function SocialProof() {
  return (
    <section
      className="section-sm border-t border-b border-bg-border bg-bg-surface"
      aria-label="Key benefits"
    >
      <div className="container-content">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PROOF_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              {item.icon}
              <span className="text-body-sm font-medium text-neutral-300">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
