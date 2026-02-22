"use client";

import { useState, useId } from "react";
import { track } from "@/lib/analytics";
import { PricingInterest } from "./PricingInterest";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  email: string;
  priceBand: string;
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const USE_API_ROUTE = process.env.NEXT_PUBLIC_USE_API_ROUTE === "true";

async function submitToFormspree(data: FormData): Promise<void> {
  if (!FORMSPREE_ID) throw new Error("Formspree ID not configured");
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: data.email, price_band: data.priceBand }),
  });
  if (!res.ok) throw new Error("Formspree submission failed");
}

async function submitToApiRoute(data: FormData): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, priceBand: data.priceBand }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "Submission failed");
  }
}

async function submitForm(data: FormData): Promise<void> {
  if (USE_API_ROUTE) {
    return submitToApiRoute(data);
  }
  if (FORMSPREE_ID) {
    return submitToFormspree(data);
  }
  // Dev fallback: simulate success
  await new Promise((r) => setTimeout(r, 800));
  console.log("[dev] Form submitted:", data);
}

function buildReferralUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href.split("?")[0] + "?ref=share";
}

export function EmailForm() {
  const emailId = useId();
  const [formState, setFormState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [priceBand, setPriceBand] = useState("");
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);

  function validateEmail(val: string): boolean {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateEmail(email)) return;

    track("email_form_submit", { props: { price_band: priceBand || "not_selected" } });
    setFormState("submitting");

    try {
      await submitForm({ email: email.trim(), priceBand });
      setFormState("success");
      track("email_form_success", { props: { price_band: priceBand || "not_selected" } });
    } catch {
      setFormState("error");
      track("email_form_error");
    }
  }

  async function handleCopyReferral() {
    const url = buildReferralUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("referral_share");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text
    }
  }

  if (formState === "success") {
    return (
      <div
        className="text-center animate-fade-up"
        role="status"
        aria-live="polite"
      >
        {/* Checkmark */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ice/15 mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 text-ice"
            aria-hidden="true"
          >
            <path
              d="M5 12l5 5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-heading text-neutral-50 mb-3">
          You're on the list.
        </h3>
        <p className="text-body text-neutral-400 mb-8 max-w-md mx-auto">
          We'll send early access pricing and updates to <strong className="text-neutral-200">{email}</strong>.
          No spam — one email when we're ready.
        </p>

        {/* Referral share */}
        <div className="max-w-sm mx-auto bg-bg-elevated border border-bg-border rounded-xl p-5">
          <p className="text-body-sm font-medium text-neutral-300 mb-3">
            Know someone who'd want this? Share your link:
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={buildReferralUrl()}
              className="input text-body-sm py-2.5 flex-1 min-w-0 cursor-text"
              aria-label="Referral link"
            />
            <button
              type="button"
              onClick={handleCopyReferral}
              className={`btn-primary px-4 py-2.5 text-sm flex-shrink-0 transition-all ${
                copied ? "bg-ice-bright" : ""
              }`}
              aria-label={copied ? "Copied!" : "Copy referral link"}
            >
              {copied ? (
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 5V4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Embedded price band selection */}
      <div className="mb-8">
        <PricingInterest selected={priceBand} onSelect={setPriceBand} />
      </div>

      <div className="max-w-md mx-auto flex flex-col gap-5">
        {/* Email field */}
        <div>
          <label htmlFor={emailId} className="label">
            Email address <span aria-hidden="true" className="text-ice">*</span>
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            className={`input ${emailError ? "border-red-500 focus:border-red-400 focus:ring-red-400/30" : ""}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(email)}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? `${emailId}-error` : undefined}
            disabled={formState === "submitting"}
            required
          />
          {emailError && (
            <p
              id={`${emailId}-error`}
              role="alert"
              className="mt-2 text-caption text-red-400"
            >
              {emailError}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => track("reserve_click")}
        >
          {formState === "submitting" ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
              </svg>
              Joining…
            </>
          ) : (
            <>
              Reserve My Spot
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>

        {formState === "error" && (
          <p
            role="alert"
            className="text-center text-caption text-red-400 animate-fade-in"
          >
            Something went wrong. Please try again, or email us at{" "}
            <a href="mailto:hello@cryoseat.com" className="underline">
              hello@cryoseat.com
            </a>
          </p>
        )}

        <p className="text-caption text-neutral-600 text-center">
          No payment required. No spam. Unsubscribe anytime.
        </p>
      </div>
    </form>
  );
}
