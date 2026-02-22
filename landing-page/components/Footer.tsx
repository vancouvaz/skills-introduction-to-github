import Link from "next/link";

const currentYear = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:hello@cryoseat.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-bg-border" role="contentinfo">
      <div className="container-content px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-ice flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="4" fill="#0A0A0B" />
                <path
                  d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
                  stroke="#0A0A0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-body-sm font-medium text-neutral-400">
              CryoSeat
            </span>
            <span className="text-body-sm text-neutral-700">
              © {currentYear}
            </span>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6 flex-wrap justify-center">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-caption text-neutral-700 text-center max-w-[560px] mx-auto">
          CryoSeat is currently in demand validation. No payment is required. By
          joining the waitlist you agree to receive product updates. We will
          never sell your email address.
        </p>
      </div>
    </footer>
  );
}
