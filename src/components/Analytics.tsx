"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, track } from "@/lib/analytics";

const SOCIAL = [
  ["linkedin.com", "linkedin"],
  ["github.com", "github"],
  ["leetcode.com", "leetcode"],
] as const;

/**
 * Loads GA4 (page views, including client-side navigation, come from GA4's
 * enhanced measurement) and records the clicks that matter for a portfolio:
 * emailing Rohan (`generate_lead` — the conversion), opening a social profile,
 * and visiting a live project.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("mailto:")) {
        track("generate_lead", { method: "email", page_path: location.pathname });
        return;
      }
      if (!/^https?:\/\//.test(href) || href.includes(location.host)) return;

      const social = SOCIAL.find(([domain]) => href.includes(domain));
      if (social) {
        track("social_click", { network: social[1], link_url: href, page_path: location.pathname });
      } else if (location.pathname.startsWith("/work/")) {
        track("project_link_click", { link_url: href, page_path: location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
