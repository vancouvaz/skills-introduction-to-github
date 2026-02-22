"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-bg-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-content flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-ice flex items-center justify-center">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-4 h-4"
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
          <span className="font-semibold text-neutral-100 tracking-tight text-[0.9375rem]">
            CryoSeat
          </span>
        </Link>

        {/* Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {[
            { label: "How it works", href: "#how-it-works" },
            { label: "Features", href: "#features" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-neutral-400 hover:text-neutral-100 text-body-sm font-medium transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#waitlist"
          className="btn-primary text-sm px-5 py-2.5"
          onClick={() => track("nav_cta_click")}
        >
          Join Waitlist
        </Link>
      </div>
    </header>
  );
}
