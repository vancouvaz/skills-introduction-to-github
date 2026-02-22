import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CryoSeat terms of service.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-prose mx-auto">
        <Link href="/" className="btn-ghost mb-8 inline-flex">
          ← Back to home
        </Link>
        <h1 className="text-display-md text-neutral-50 mb-8">Terms of Service</h1>
        <div className="text-neutral-400 space-y-6">
          <p className="text-body-sm text-neutral-500">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-heading text-neutral-200 mb-3">Demand test disclaimer</h2>
            <p className="text-body">This website is a demand validation test. No product purchase is being made. By joining the waitlist you are expressing interest only — no funds are collected and no contractual obligation to purchase is created on either side.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200 mb-3">Waitlist</h2>
            <p className="text-body">Joining the waitlist grants no guarantee of product availability, pricing, or delivery timeline. We will communicate updates honestly and promptly.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200 mb-3">Contact</h2>
            <p className="text-body"><a href="mailto:hello@cryoseat.com" className="text-ice hover:text-ice-bright">hello@cryoseat.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
