import type { Metadata } from "next";
import { usesData } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Uses",
  description: "The full stack — languages, AI tooling, infrastructure, and how it all runs.",
};

const groups = [
  { title: "STACK", rows: usesData.stack },
  { title: "INFRASTRUCTURE", rows: usesData.infrastructure },
  { title: "DATA", rows: usesData.data },
  { title: "OPERATIONS", rows: usesData.operations },
  { title: "TOOLING", rows: usesData.tooling },
];

export default function UsesPage() {
  return (
    <div className="pt-40 pb-24 md:pb-[120px]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="label-eyebrow mb-4">
            <span className="text-accent">05</span> — HOW I SHIP
          </p>
          <h1 className="text-h1 font-semibold tracking-tight max-w-2xl">
            The stack behind the products.
          </h1>
          <p className="mt-4 text-[15px] text-text-muted max-w-[52ch]">
            Everything I actually build with, day to day — languages and frameworks first,
            then the infrastructure that runs it. Deployment is the last mile of system
            design here, not the headline.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 60}
              className="border border-hairline rounded-card p-6"
            >
              <p className="font-mono text-label uppercase text-accent mb-5">{group.title}</p>
              <div className="divide-y divide-hairline">
                {group.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3 text-[14px]"
                  >
                    <span className="text-text-muted">{row.label}</span>
                    <span className="font-mono text-[13px] text-text-primary text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 border border-hairline rounded-card px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label-eyebrow">RUNNING COST</p>
            <p className="mt-1 text-[14px] text-text-muted">Four products, one box, one bill.</p>
          </div>
          <p className="text-[32px] font-semibold tracking-tight">
            One VPS, shared across everything
          </p>
        </Reveal>

        <Reveal className="mt-4 label-eyebrow text-text-subtle normal-case tracking-normal font-mono text-[12px]">
          Exact monthly figure kept off this page for now — ask directly and I&apos;ll tell you.
        </Reveal>
      </div>
    </div>
  );
}
