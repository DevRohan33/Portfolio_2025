"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

/** Sticky "In this note" list that highlights the section being read. */
export default function NoteToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="In this note">
      <p className="font-hand text-[22px] font-bold text-paper-text/70 -rotate-2">in this note ↓</p>
      <ol className="mt-3 space-y-2.5 border-l border-paper-text/15">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 pl-4 text-[14px] leading-snug transition-colors ${
                active === h.id
                  ? "border-[#5c7a12] text-paper-text font-medium"
                  : "border-transparent text-paper-text/50 hover:text-paper-text"
              }`}
            >
              <span className="font-mono text-[11px] mr-1.5 opacity-60">{i + 1}.</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
