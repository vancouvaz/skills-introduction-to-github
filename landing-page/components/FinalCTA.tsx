import { EmailForm } from "./EmailForm";

export function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="section relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-ice-glow opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 container-content">
        <div className="max-w-[640px] mx-auto text-center mb-12">
          <span className="eyebrow mb-4 block">Early access</span>
          <h2
            id="cta-heading"
            className="text-display-md text-neutral-50 mb-6"
          >
            Be the first to
            <span className="gradient-text-ice"> feel the difference.</span>
          </h2>
          <p className="text-body-lg text-neutral-400">
            Join the founding waitlist. Waitlist members get early access pricing,
            first-shipment priority, and a direct line to the team. We'll validate
            demand before we build — your intent shapes the product.
          </p>
        </div>

        <EmailForm />
      </div>
    </section>
  );
}
