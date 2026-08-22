import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/caseStudies";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: study.name,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const slugs = Object.keys(caseStudies);
  const idx = slugs.indexOf(slug);
  const next = caseStudies[slugs[(idx + 1) % slugs.length]];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: study.name,
    description: study.summary,
    applicationCategory: study.role,
    ...(study.link ? { url: study.link } : {}),
  };

  return (
    <div className="bg-paper text-paper-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-label uppercase tracking-[0.06em] text-paper-text/50">
              WORK / {study.name.toUpperCase()}
            </p>
            <h1 className="mt-4 text-h1 font-semibold tracking-tight max-w-3xl">{study.name}</h1>
            <p className="mt-4 text-lg text-paper-text/60 max-w-[60ch]">{study.summary}</p>
          </Reveal>

          <Reveal className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-paper-text/10 py-6">
            {[
              { label: "ROLE", value: study.role },
              { label: "STACK", value: study.stack },
              { label: "TIMELINE", value: study.timeline },
              { label: "STATUS", value: study.status },
            ].map((meta) => (
              <div key={meta.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40">
                  {meta.label}
                </p>
                <p className="mt-1.5 text-[14px] font-medium">{meta.value}</p>
              </div>
            ))}
          </Reveal>

          {study.link && (
            <Reveal className="mt-6">
              <a
                href={study.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] hover:text-accent"
              >
                Visit {study.link.replace(/^https?:\/\//, "")} <ArrowUpRight size={13} />
              </a>
            </Reveal>
          )}

          {study.image && (
            <Reveal className="mt-10 relative aspect-video rounded-card overflow-hidden border border-paper-text/10">
              <Image src={study.image} alt={`${study.name} preview`} fill className="object-cover" />
            </Reveal>
          )}

          <div className="mt-16 max-w-[720px] mx-auto space-y-16">
            <Reveal>
              <p className="font-mono text-label uppercase text-accent-foreground text-[#5c7a12] mb-3">
                THE PROBLEM
              </p>
              <div className="font-body space-y-4 text-[17px] leading-[1.7]">
                {study.problem.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-3">CONSTRAINTS</p>
              <ul className="font-mono text-[13px] space-y-2">
                {study.constraints.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-paper-text/30">—</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-3">ARCHITECTURE</p>
              <div className="bg-ink text-text-primary rounded-card p-6 md:p-8 -mx-2 md:mx-0">
                <p className="text-[15px] text-text-muted leading-relaxed mb-5">
                  {study.architecture}
                </p>
                <ul className="font-mono text-[13px] space-y-2.5">
                  {study.architectureBullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-text-primary">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">DECISIONS</p>
              <div className="space-y-8">
                {study.decisions.map((d, i) => (
                  <div key={i}>
                    <h3 className="text-[20px] font-semibold tracking-tight mb-1.5">
                      {i + 1}. {d.title}
                    </h3>
                    <p className="font-body text-[16px] leading-[1.7] text-paper-text/75">{d.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">RESULTS</p>
              <div className="grid grid-cols-3 gap-6 border-y border-paper-text/10 py-6">
                {study.results.map((r) => (
                  <div key={r.caption}>
                    <p className="text-[32px] md:text-[40px] font-semibold tracking-tight leading-none">
                      {r.value}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/50 mt-2">
                      {r.caption}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-3">
                WHAT I&apos;D DO DIFFERENTLY
              </p>
              <div className="border-l-2 border-accent bg-paper-muted rounded-r-card p-6">
                <p className="font-body text-[16px] leading-[1.7]">{study.whatIdRedo}</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-24 pt-10 border-t border-paper-text/10 flex justify-end">
            <Link href={`/work/${next.slug}`} className="text-right group">
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40">
                Next project
              </p>
              <p className="text-[24px] md:text-[32px] font-semibold tracking-tight group-hover:text-[#5c7a12] transition-colors">
                {next.name} →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
