/**
 * analytics.ts — lightweight event tracking wrapper.
 *
 * Fires to Plausible (if domain configured) and/or GA4 (if ID configured).
 * All calls are safe to make server-side or before scripts load (no-ops).
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventName =
  | "hero_cta_click"
  | "email_form_submit"
  | "email_form_success"
  | "email_form_error"
  | "price_band_select"
  | "reserve_click"
  | "referral_share"
  | "faq_expand"
  | "nav_cta_click";

interface TrackOptions {
  props?: Record<string, string | number>;
}

/**
 * Track a custom event.
 *
 * @example
 * track("hero_cta_click")
 * track("price_band_select", { props: { band: "$299-349" } })
 */
export function track(event: EventName, options: TrackOptions = {}): void {
  if (typeof window === "undefined") return;

  // Plausible
  if (typeof window.plausible === "function") {
    window.plausible(event, options);
  }

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: "engagement",
      ...options.props,
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, options.props ?? "");
  }
}
