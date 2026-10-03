import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { PERSON_ID, abs, breadcrumbs, graph, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import HandNote from "@/components/HandNote";
import ProjectGallery from "@/components/ProjectGallery";

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
  return pageMeta({
    title: study.name,
    description: study.summary,
    path: `/work/${study.slug}`,
    image: study.image,
  });
}

/**
 * Answer-first Q&A for answer engines (Google AI Overviews, ChatGPT, Perplexity),
 * built from the case study itself so it can never drift from the page.
 */
function quickAnswers(study: CaseStudy) {
  const live = study.links?.map((l) => `${l.label} (${l.href})`).join(" and ");
  return [
    { q: `What is ${study.name}?`, a: study.summary },
    { q: `What is ${study.name} built with?`, a: `${study.name} is built with ${study.stack.split(" · ").join(", ")}.` },
    { q: `What was SK Rohan Parveag's role on ${study.name}?`, a: `${study.role}.` },
    {
      q: `What is the current status of ${study.name}?`,
      a: `${study.status}.${study.notice ? ` ${study.notice}` : ""}${live ? ` Links: ${live}.` : ""}`,
    },
    { q: `What would Rohan do differently on ${study.name}?`, a: study.whatIdRedo },
  ];
}

/** The schema.org type that actually fits each project. */
function projectNode(study: CaseStudy) {
  const url = abs(`/work/${study.slug}`);
  const repo = study.links?.find((l) => l.href.includes("github.com"))?.href;
  const live = study.links?.find((l) => !l.href.includes("github.com"))?.href;
  const images = [study.image, ...(study.gallery ?? []).map((g) => g.src)].filter(Boolean).map((src) => abs(src!));
  const base = {
    "@id": `${url}#project`,
    name: study.name,
    description: study.summary,
    url,
    ...(images.length ? { image: images } : {}),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: study.stack.split("·").map((t) => t.trim()).join(", "),
    mainEntityOfPage: url,
  };

  if (repo) {
    return { "@type": "SoftwareSourceCode", ...base, codeRepository: repo, programmingLanguage: "Python", license: "https://opensource.org/licenses/MIT" };
  }
  if (study.slug === "rybo") {
    return {
      "@type": "SoftwareApplication",
      ...base,
      ...(live ? { sameAs: live } : {}),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Web browser",
      // Plan prices from RYBO's own pricing (monthly Starter to yearly Enterprise).
      offers: { "@type": "AggregateOffer", lowPrice: "299", highPrice: "14999", priceCurrency: "INR", offerCount: "4" },
    };
  }
  return { "@type": "CreativeWork", ...base, ...(live ? { sameAs: live } : {}) };
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

  const answers = quickAnswers(study);
  const jsonLd = graph(
    projectNode(study),
    {
      "@type": "FAQPage",
      "@id": abs(`/work/${study.slug}#faq`),
      url: abs(`/work/${study.slug}`),
      about: { "@id": abs(`/work/${study.slug}#project`) },
      mainEntity: answers.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Work", path: "/work" },
      { name: study.name, path: `/work/${study.slug}` },
    ]),
  );

  return (
    <div className="bg-paper text-paper-text">
      <JsonLd data={jsonLd} />
      <div className="pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-label uppercase tracking-[0.06em] text-paper-text/50">
              WORK / {study.name.toUpperCase()}
            </p>
            <h1 className="mt-4 font-serif text-[48px] md:text-[68px] font-medium tracking-[-0.03em] leading-[1.02] max-w-3xl">
              {study.name}
            </h1>
            <p className="mt-5 font-serif italic text-[21px] md:text-[23px] leading-snug text-paper-text/65 max-w-[60ch]">
              {study.summary}
            </p>
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

          {(study.links?.length || study.notice) && (
            <Reveal className="mt-6 space-y-3">
              {study.links && (
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {study.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] hover:text-[#5c7a12]"
                    >
                      {l.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              )}
              {study.notice && (
                <p className="font-mono text-[12px] text-paper-text/55 max-w-[70ch]">
                  <span className="text-paper-text/80">Note -</span>{" "}
                  {study.notice}
                </p>
              )}
            </Reveal>
          )}

          {study.image && (
            <Reveal className="mt-10 relative aspect-[16/10] rounded-card overflow-hidden border border-paper-text/10 bg-white">
              <Image
                src={study.image}
                alt={`${study.name} preview`}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover object-top"
              />
            </Reveal>
          )}

          {study.gallery && study.gallery.length > 0 && (
            <Reveal className="mt-12">
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">
                INSIDE THE PRODUCT
              </p>
              <ProjectGallery images={study.gallery} name={study.name} />
            </Reveal>
          )}

          <div className="mt-16 max-w-[720px] mx-auto space-y-16">
            <Reveal>
              <p className="font-mono text-label uppercase text-accent-foreground text-[#5c7a12] mb-3">
                THE PROBLEM
              </p>
              <div className="font-serif space-y-5 text-[19px] md:text-[20px] leading-[1.75] text-paper-text/85">
                {study.problem.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-3">
                CONSTRAINTS
              </p>
              <ul className="font-mono text-[13px] space-y-2">
                {study.constraints.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-paper-text/30">-</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-3">
                ARCHITECTURE
              </p>
              <div className="bg-ink text-text-primary rounded-card p-6 md:p-8 -mx-2 md:mx-0">
                <p className="text-[15px] text-text-muted leading-relaxed mb-5">
                  {study.architecture}
                </p>
                <ul className="font-mono text-[13px] space-y-2.5">
                  {study.architectureBullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-text-primary">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">
                DECISIONS
              </p>
              <div className="space-y-8">
                {study.decisions.map((d, i) => (
                  <div key={i}>
                    <h3 className="flex items-baseline gap-3 font-serif text-[24px] md:text-[26px] font-medium tracking-[-0.01em] leading-snug mb-2">
                      <span className="font-hand text-[30px] font-bold text-[#5c7a12] -rotate-6 shrink-0">
                        {i + 1}.
                      </span>
                      {d.title}
                    </h3>
                    <p className="font-serif text-[18px] leading-[1.75] text-paper-text/75">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">
                RESULTS
              </p>
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
              <div className="relative border-l-2 border-[#8fb31a] bg-paper-muted rounded-r-card p-6 md:p-8">
                <HandNote tone="paper" className="!text-[28px]">
                  what I&apos;d do differently…
                </HandNote>
                <p className="mt-3 font-serif italic text-[19px] md:text-[20px] leading-[1.7] text-paper-text/85">
                  {study.whatIdRedo}
                </p>
              </div>
            </Reveal>
          </div>

          <section className="mt-24 max-w-[720px] mx-auto" aria-labelledby="quick-answers">
            <Reveal>
              <HandNote tone="paper" className="!text-[28px]">
                quick answers
              </HandNote>
              <h2 id="quick-answers" className="sr-only">
                Quick answers about {study.name}
              </h2>
              <dl className="mt-5 divide-y divide-paper-text/10 border-y border-paper-text/10">
                {/* The last answer repeats the "what I'd do differently" box above; it stays in the JSON-LD only. */}
                {answers.slice(0, -1).map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-serif text-[19px] md:text-[20px] font-medium">{f.q}</dt>
                    <dd className="mt-1.5 font-serif text-[17px] leading-[1.7] text-paper-text/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>

          <div className="mt-24 pt-10 border-t border-paper-text/10 flex justify-end">
            <Link href={`/work/${next.slug}`} className="text-right group">
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40">
                Next project
              </p>
              <p className="font-serif text-[28px] md:text-[38px] font-medium tracking-[-0.02em] group-hover:text-[#5c7a12] transition-colors">
                {next.name} →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
