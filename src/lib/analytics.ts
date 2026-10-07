/**
 * Google Analytics 4 events. A no-op unless NEXT_PUBLIC_GA_ID is set (the gtag
 * script only loads then), so calling track() anywhere is always safe.
 *
 * Event names follow GA4's recommended events where one fits- `generate_lead`
 * can be marked as a key event (conversion) in GA4 and imported into Google Ads.
 */
type GtagFn = (
  command: "event",
  name: string,
  params?: Record<string, unknown>,
) => void;

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", event, params);
}
