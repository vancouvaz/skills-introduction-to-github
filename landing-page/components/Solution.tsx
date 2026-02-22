import Image from "next/image";

const DIFFERENTIATORS = [
  {
    label: "Dual-zone control",
    desc: "Seat and back independently adjustable. Run cool on your back, warm on your seat — or blast both. Your body, your rules.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 13V9m0 0a2 2 0 100-4 2 2 0 000 4zm10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-ice",
  },
  {
    label: "Retrofit — use your chair",
    desc: "Works with Herman Miller Aeron, Steelcase Leap, DXRacer, and virtually any standard office chair. No $1,500 replacement purchase.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3l1.5 4H18l-3.6 2.6 1.4 4.4L12 11.3l-3.8 2.7 1.4-4.4L6 7h4.5L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-amber-chair",
  },
  {
    label: "Near-silent Peltier tech",
    desc: "Peltier thermoelectric cooling — no compressor, no blasting fans. Quieter than a laptop fan. You won't notice it's on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M9 9a3 3 0 116 0 3 3 0 01-6 0z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.41 1.41m9.9 9.9l1.41 1.41M5.64 18.36l1.41-1.41m9.9-9.9l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-ice",
  },
  {
    label: "Calendar-aware scheduling",
    desc: "Connect to your Google Calendar. CryoSeat warms you for the morning standup, cools for the afternoon deep-work block. Automatic.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18M8 3v3m8-3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="15" r="2" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
    accent: "text-amber-chair",
  },
];

export function Solution() {
  return (
    <section className="section bg-bg-surface" aria-labelledby="solution-heading">
      <div className="container-content">
        <div className="max-w-prose mx-auto text-center mb-16">
          <span className="eyebrow mb-4 block">The solution</span>
          <h2
            id="solution-heading"
            className="text-display-md text-neutral-50 mb-6"
          >
            Your own microclimate,
            <br />
            <span className="gradient-text-ice">wherever you sit.</span>
          </h2>
          <p className="text-body-lg text-neutral-400">
            CryoSeat is a premium seat pad + back pad system that attaches to your
            existing office chair. It delivers precise heating and cooling directly to
            your body — silently, safely, and on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-elevated border border-bg-border">
              <Image
                src="/images/lifestyle-office.png"
                alt="Person working comfortably at a home office desk with CryoSeat installed"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTEzIi8+PC9zdmc+"
              />
              {/* Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg-elevated">
                <p className="text-caption text-neutral-600">lifestyle-office.png</p>
                <p className="text-caption text-neutral-700">1600×1067</p>
              </div>
            </div>
            {/* Floating zone badge */}
            <div className="absolute -right-4 top-1/3 bg-bg border border-bg-border rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ice animate-pulse-slow" />
                  <span className="text-caption text-ice font-medium">Back: 66°F cool</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-chair animate-pulse-slow" />
                  <span className="text-caption text-amber-chair font-medium">Seat: 74°F warm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DIFFERENTIATORS.map((item) => (
              <li key={item.label} className="card">
                <span className={`${item.accent} mb-3 block`}>{item.icon}</span>
                <h3 className="text-body font-semibold text-neutral-100 mb-2">
                  {item.label}
                </h3>
                <p className="text-body-sm text-neutral-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
