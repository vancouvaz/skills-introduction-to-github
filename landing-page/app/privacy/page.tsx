import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CryoSeat privacy policy — how we collect and use your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-prose mx-auto">
        <Link href="/" className="btn-ghost mb-8 inline-flex">
          ← Back to home
        </Link>
        <h1 className="text-display-md text-neutral-50 mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-neutral max-w-none text-neutral-400 space-y-6">
          <p className="text-body-sm text-neutral-500">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <section>
            <h2 className="text-heading text-neutral-200">Information we collect</h2>
            <p>When you join our waitlist, we collect your email address and optionally your preferred price range. We do not collect payment information at this stage.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200">How we use it</h2>
            <p>Your email is used solely to send you product updates about CryoSeat. We will not send marketing unrelated to CryoSeat, and we will never sell or share your email with third parties.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200">Analytics</h2>
            <p>We use privacy-respecting analytics (Plausible or Google Analytics) to understand how visitors interact with our landing page. No personal data is shared with analytics providers beyond what they require to function.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200">Your rights</h2>
            <p>You can unsubscribe at any time using the link in any email we send, or by emailing <a href="mailto:hello@cryoseat.com" className="text-ice hover:text-ice-bright">hello@cryoseat.com</a>. We will delete your data upon request.</p>
          </section>

          <section>
            <h2 className="text-heading text-neutral-200">Contact</h2>
            <p>Questions? <a href="mailto:hello@cryoseat.com" className="text-ice hover:text-ice-bright">hello@cryoseat.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
