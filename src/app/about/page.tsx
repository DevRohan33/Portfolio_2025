import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  GraduationCap,
  Layers,
  Mail,
  Network,
} from "lucide-react";
import {
  aboutFacts,
  faqs,
  aboutLead,
  aboutStory,
  education,
  journey,
  personalInfo,
  principles,
  proofStats,
  skillGroups,
} from "@/content/site";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import {
  PERSON_ID,
  SITE_UPDATED,
  WEBSITE_ID,
  abs,
  breadcrumbs,
  graph,
  pageMeta,
} from "@/lib/seo";
import HandNote from "@/components/HandNote";

export const metadata: Metadata = pageMeta({
  title: "About",
  path: "/about",
  type: "profile",
  image: "/image/profil.jpg",
  description:
    "Backend and AI engineer in Kolkata- the story, the way I work, the stack, and the path from solar plants to production LLM systems.",
});

const jsonLd = graph(
  {
    "@type": "ProfilePage",
    "@id": abs("/about#page"),
    url: abs("/about"),
    name: "About SK Rohan Parveag",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: SITE_UPDATED,
  },
  {
    "@type": "FAQPage",
    "@id": abs("/about#faq"),
    url: abs("/about"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  breadcrumbs([{ name: "About", path: "/about" }]),
);

const skillIcons = [BrainCircuit, Database, Network, Layers];

export default function AboutPage() {
  const paragraphs = aboutStory.trim().split(/\n\n+/);

  return (
    <div className="pt-36 md:pt-40 pb-24 md:pb-[120px]">
      <JsonLd data={jsonLd} />
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Intro */}
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label-eyebrow flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent" />
                ABOUT- {personalInfo.name.toUpperCase()}
              </p>
              <h1 className="mt-5 font-serif text-[48px] sm:text-[60px] md:text-[72px] leading-[1.0] tracking-[-0.03em] font-medium">
                From requirement
                <br />
                to <em className="italic text-accent">running system.</em>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="font-serif mt-6 text-[20px] md:text-[22px] leading-[1.6] text-text-muted max-w-[54ch]">
                {aboutLead}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-8 grid sm:grid-cols-3 gap-px rounded-card overflow-hidden border border-hairline bg-hairline">
                {aboutFacts.map((fact) => (
                  <div key={fact.label} className="bg-ink p-4">
                    <dt className="label-eyebrow">{fact.label}</dt>
                    <dd className="mt-2 text-[14px] text-text-primary leading-snug">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={280} className="mt-8 flex flex-wrap gap-4">
              <Link href="/work" className="pill-primary gap-2">
                See the work <ArrowUpRight size={16} />
              </Link>
              <a
                href={`mailto:${personalInfo.email}`}
                className="pill-secondary gap-2"
              >
                <Mail size={16} /> Email me
              </a>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <div className="relative mx-auto max-w-[420px] mr-2 sm:mr-auto lg:mr-0 lg:ml-auto">
              <div
                className="absolute inset-0 translate-x-2 translate-y-2 sm:-inset-3 sm:translate-x-4 sm:translate-y-4 rounded-[24px] border border-accent/40"
                aria-hidden
              />
              <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-hairline bg-surface">
                <Image
                  src="/image/profil.jpg"
                  alt={`Portrait of ${personalInfo.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[50%_30%]"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[20px] font-semibold tracking-tight">
                      {personalInfo.name}
                    </p>
                    <p className="label-eyebrow text-text-muted mt-1">
                      Backend & Applied AI
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-ink/80 border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
            <HandNote className="mt-8 mx-auto max-w-[420px] lg:mr-0 text-right">
              ↑ yep, that&apos;s me
            </HandNote>
          </Reveal>
        </section>

        {/* Numbers */}
        <Reveal className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px rounded-card overflow-hidden border border-hairline bg-hairline">
          {proofStats.map((stat) => (
            <div key={stat.caption} className="bg-surface p-6 md:p-8">
              <p className="text-[36px] md:text-[44px] font-semibold tracking-tight leading-none">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="label-eyebrow mt-3">{stat.caption}</p>
            </div>
          ))}
        </Reveal>

        {/* Story */}
        <section className="mt-28 grid md:grid-cols-12 gap-8">
          <Reveal className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="label-eyebrow">
                <span className="text-accent">01</span>- THE STORY
              </p>
              <h2 className="mt-4 font-serif text-[34px] md:text-[42px] font-medium tracking-[-0.02em] leading-tight">
                Solar plants, then software. Same instinct.
              </h2>
            </div>
          </Reveal>
          <Reveal
            delay={80}
            className="md:col-span-8 font-serif space-y-6 text-[19px] md:text-[20px] leading-[1.75] text-text-muted"
          >
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-text-primary text-[21px] md:text-[23px] leading-[1.6]"
                    : undefined
                }
              >
                {p}
              </p>
            ))}
            <p className="font-hand text-[40px] font-bold leading-none -rotate-3 text-text-primary pt-2">
              - Rohan
            </p>
          </Reveal>
        </section>

        {/* Principles */}
        <section className="mt-28">
          <Reveal>
            <p className="label-eyebrow mb-8">
              <span className="text-accent">02</span>- HOW I WORK
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <Reveal
                key={p.number}
                delay={i * 80}
                className="group relative rounded-card border border-hairline bg-surface p-7 transition-all duration-200 hover:border-accent/40 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[13px] text-accent">
                  {p.number}
                </span>
                <h3 className="mt-6 font-serif text-[26px] font-medium tracking-[-0.015em] leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                  {p.body}
                </p>
                <span
                  className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section className="mt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="label-eyebrow">
                <span className="text-accent">03</span>- THE PATH
              </p>
              <h2 className="mt-4 font-serif text-[34px] md:text-[42px] font-medium tracking-[-0.02em]">
                Six years, one direction.
              </h2>
            </div>
          </Reveal>

          <ol className="relative grid md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 border-l md:border-l-0 border-hairline pl-6 md:pl-0">
            <span
              className="hidden lg:block absolute left-0 right-0 top-[5px] h-px bg-gradient-to-r from-hairline via-white/15 to-accent/70"
              aria-hidden
            />
            {journey.map((step, i) => {
              const last = i === journey.length - 1;
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 70}
                  className="relative"
                >
                  <span
                    className={`absolute -left-[29px] md:static md:block w-[9px] h-[9px] ${
                      last
                        ? "bg-accent shadow-[0_0_0_4px_rgba(198,242,78,0.15)]"
                        : "bg-text-subtle"
                    }`}
                    aria-hidden
                  />
                  <p
                    className={`label-eyebrow md:mt-5 ${last ? "text-accent" : ""}`}
                  >
                    {step.period}
                  </p>
                  <h3 className="mt-2 font-serif text-[20px] font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
                    {step.body}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* Skills */}
        <section className="mt-28">
          <Reveal>
            <p className="label-eyebrow mb-8">
              <span className="text-accent">04</span>- SKILLS
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {skillGroups.map((group, i) => {
              const Icon = skillIcons[i % skillIcons.length];
              return (
                <Reveal
                  key={group.title}
                  delay={i * 60}
                  className="rounded-card border border-hairline bg-surface p-7 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-control bg-accent/10 text-accent flex items-center justify-center">
                        <Icon size={20} />
                      </span>
                      <h3 className="font-serif text-[24px] font-medium tracking-[-0.01em]">
                        {group.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[12px] text-text-subtle">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-6 divide-y divide-hairline">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="py-2.5 font-mono text-[13px] text-text-muted flex gap-3"
                      >
                        <span className="text-accent shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-6">
            <Link
              href="/uses"
              className="label-eyebrow inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              The full stack, tool by tool <ArrowUpRight size={12} />
            </Link>
          </Reveal>
        </section>

        {/* Education */}
        <section className="mt-28">
          <Reveal>
            <p className="label-eyebrow mb-8">
              <span className="text-accent">05</span>- EDUCATION
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: education.degree,
                place: education.institution,
                period: education.period,
              },
              {
                title: education.diploma,
                place: education.diplomaInstitution,
                period: education.diplomaPeriod,
              },
            ].map((ed, i) => (
              <Reveal
                key={ed.title}
                delay={i * 60}
                className="flex gap-5 rounded-card border border-hairline p-6"
              >
                <span className="w-10 h-10 shrink-0 rounded-control border border-hairline text-text-muted flex items-center justify-center">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <p className="label-eyebrow">{ed.period}</p>
                  <h3 className="mt-2 font-serif text-[20px] font-medium leading-snug">
                    {ed.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-text-muted">{ed.place}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-28" aria-labelledby="faq-heading">
          <Reveal>
            <p className="label-eyebrow">
              <span className="text-accent">06</span>- QUICK ANSWERS
            </p>
            <h2
              id="faq-heading"
              className="mt-4 font-serif text-[34px] md:text-[42px] font-medium tracking-[-0.02em]"
            >
              Things people usually ask.
            </h2>
          </Reveal>
          <div className="mt-8 divide-y divide-hairline border-y border-hairline">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <details className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-[20px] md:text-[23px] font-medium leading-snug">
                      {f.q}
                    </h3>
                    <span
                      className="shrink-0 w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-text-muted transition-transform group-open:rotate-45 group-open:text-accent group-open:border-accent/40"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 font-serif text-[18px] leading-[1.7] text-text-muted max-w-[70ch]">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="mt-28 relative overflow-hidden rounded-card border border-hairline bg-surface p-8 md:p-12">
          <div
            className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-serif text-[38px] md:text-[56px] font-medium tracking-[-0.025em] leading-[1.02] max-w-xl">
                Building something that has to work?
              </h2>
              <HandNote className="mt-4">
                I reply to everything- usually within a day.
              </HandNote>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href={`mailto:${personalInfo.email}`}
                className="pill-primary gap-2"
              >
                <Mail size={16} /> {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="pill-secondary gap-2"
              >
                LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
