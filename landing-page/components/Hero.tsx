"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";

interface HeroProps {
  variant?: 1 | 2 | 3;
}

const HEADLINES: Record<number, { headline: string; subhead: string }> = {
  1: {
    headline: "Your chair.\nYour temperature.\nAlways.",
    subhead:
      "CryoSeat retrofits your existing office chair with precision heating + cooling — so you can focus on deep work, not the thermostat.",
  },
  2: {
    headline: "Eight Sleep\nfor your workday.",
    subhead:
      "The same personal microclimate technology that transformed sleep, now built for 8-hour work sessions. Seat + back, independently controlled.",
  },
  3: {
    headline: "Stop adjusting\nthe thermostat.",
    subhead:
      "CryoSeat delivers your ideal temperature directly to your body — quiet, dual-zone, and compatible with any office chair you already own.",
  },
};

export function Hero({ variant = 1 }: HeroProps) {
  const copy = HEADLINES[variant] ?? HEADLINES[1];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute inset-0 bg-ice-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-amber-glow"
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#A8D8EA 1px, transparent 1px), linear-gradient(90deg, #A8D8EA 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-prose mx-auto flex flex-col items-center gap-8 animate-fade-up">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span className="eyebrow">Personal microclimate</span>
          <span className="w-1 h-1 rounded-full bg-ice-dim" aria-hidden="true" />
          <span className="eyebrow text-neutral-500">Demand test</span>
        </div>

        {/* Headline */}
        <h1 className="text-display-xl text-neutral-50 whitespace-pre-line">
          {copy.headline.split("\n").map((line, i, arr) => (
            <span key={i}>
              {i === arr.length - 1 ? (
                <span className="gradient-text-ice">{line}</span>
              ) : (
                line
              )}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <p className="text-body-lg text-neutral-400 max-w-[540px]">
          {copy.subhead}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="#waitlist"
            className="btn-primary"
            onClick={() => track("hero_cta_click", { props: { variant: String(variant) } })}
          >
            Join the Waitlist
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link href="#how-it-works" className="btn-secondary">
            See how it works
          </Link>
        </div>

        {/* Trust signal */}
        <p className="text-caption text-neutral-600 mt-2">
          No payment required · Early access pricing for waitlist members
        </p>
      </div>

      {/* Hero image */}
      <div className="relative z-10 mt-16 w-full max-w-[800px] mx-auto">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-bg-elevated border border-bg-border shadow-[0_0_80px_rgba(168,216,234,0.12)]">
          <Image
            src="/images/hero.png"
            alt="CryoSeat seat pad and back pad installed on a premium office chair"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 800px"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTEzIi8+PC9zdmc+"
          />
          {/* Placeholder overlay shown when image missing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-elevated">
            <div className="w-16 h-16 rounded-full bg-ice/10 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="w-8 h-8 text-ice/40"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M20 4v4M20 32v4M4 20h4M32 20h4M7.51 7.51l2.83 2.83M29.66 29.66l2.83 2.83M7.51 32.49l2.83-2.83M29.66 10.34l2.83-2.83"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-caption text-neutral-600">
              hero.png — 1600×900 product render
            </p>
          </div>
        </div>

        {/* Floating temp badge */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-bg-elevated border border-bg-border rounded-full px-5 py-2.5 flex items-center gap-3 shadow-xl"
          aria-label="Current temperature display"
        >
          <span className="flex items-center gap-1.5 text-ice text-body-sm font-medium">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M8 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="12" r="2" fill="currentColor" />
            </svg>
            Cool 66°F
          </span>
          <span className="w-px h-4 bg-bg-border" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-amber-chair text-body-sm font-medium">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 1v1M8 14v1M1 8h1M14 8h1M3.22 3.22l.7.7M12.08 12.08l.7.7M3.22 12.78l.7-.7M12.08 3.92l.7-.7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Warm 74°F
          </span>
        </div>
      </div>
    </section>
  );
}
