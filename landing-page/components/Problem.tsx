const PAIN_POINTS = [
  {
    stat: "68%",
    label: "of office workers",
    detail: "report being uncomfortable at their desk due to temperature — too hot, too cold, or constantly fluctuating.",
    color: "text-amber-chair",
  },
  {
    stat: "−25%",
    label: "cognitive performance",
    detail: "measurable drop in focus and working memory when the thermal environment is outside your personal comfort zone.",
    color: "text-ice",
  },
  {
    stat: "4+ hrs",
    label: "wasted per week",
    detail: "getting up, adjusting, complaining, or just suffering through suboptimal temperature in shared and home offices.",
    color: "text-amber-chair",
  },
];

export function Problem() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <div className="container-content">
        <div className="max-w-prose mx-auto text-center mb-16">
          <span className="eyebrow mb-4 block">The problem</span>
          <h2
            id="problem-heading"
            className="text-display-md text-neutral-50 mb-6"
          >
            Your body has a thermostat.
            <br />
            <span className="gradient-text-warm">Your office doesn't care.</span>
          </h2>
          <p className="text-body-lg text-neutral-400">
            You can't control the HVAC in your open-plan office. Your home office bakes
            in the afternoon and freezes in the morning. Your partner likes 74°F, you
            prefer 68°F. The only real solution is to control the temperature{" "}
            <em>at your body</em> — not the room.
          </p>
        </div>

        {/* Pain point stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PAIN_POINTS.map((point) => (
            <div key={point.stat} className="card text-center">
              <p className={`text-display-lg font-bold mb-1 ${point.color}`}>
                {point.stat}
              </p>
              <p className="text-body-sm font-semibold text-neutral-300 mb-3">
                {point.label}
              </p>
              <p className="text-body-sm text-neutral-500">{point.detail}</p>
            </div>
          ))}
        </div>

        {/* Narrative callout */}
        <blockquote className="max-w-[680px] mx-auto bg-bg-elevated border border-bg-border rounded-2xl p-8 text-center">
          <p className="text-body-lg text-neutral-200 italic leading-relaxed mb-4">
            "I've spent $3,000 on my desk setup — mechanical keyboard, curved
            monitor, fancy chair. And I'm still sweating through my afternoon
            because the HVAC vents blow hot air directly at me."
          </p>
          <cite className="text-caption text-neutral-500 not-italic">
            — A home-office power user we'd love to solve this for
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
