import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notes } from "@/content/notes";
import { personalInfo } from "@/content/site";
import {
  formatNoteDate,
  noteHeadings,
  notesNewestFirst,
  readMinutes,
  topicLabel,
} from "@/lib/notes";
import Reveal from "@/components/Reveal";
import MarkdownLite from "@/components/MarkdownLite";
import ReadingProgress from "@/components/notes/ReadingProgress";
import NoteToc from "@/components/notes/NoteToc";
import ShareNote from "@/components/notes/ShareNote";
import AuthorCard from "@/components/notes/AuthorCard";
import JsonLd from "@/components/JsonLd";
import {
  BLOG_ID,
  PERSON_ID,
  SITE_URL,
  abs,
  breadcrumbs,
  graph,
  isoMonth,
  pageMeta,
} from "@/lib/seo";

// TOC · article · TL;DR. The header uses the same columns so its edges line up with the text.
const columns =
  "lg:grid lg:grid-cols-[200px_minmax(0,720px)_220px] lg:justify-center lg:gap-12";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) return {};
  return pageMeta({
    title: note.title,
    description: note.summary,
    path: `/notes/${note.slug}`,
    type: "article",
    article: {
      publishedTime: isoMonth(note.date),
      section: topicLabel[note.topic],
      tags: [topicLabel[note.topic]],
    },
  });
}

function TldrNote({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <aside
      className={`relative bg-[#fdf3a7] text-[#3b3a2a] px-6 pt-8 pb-6 shadow-[0_10px_24px_-12px_rgba(60,50,0,0.45)] -rotate-[1.5deg] ${className}`}
      aria-label="Summary"
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/55 rotate-[2deg] shadow-sm"
        aria-hidden
      />
      <p className="font-hand text-[28px] font-bold leading-none">TL;DR</p>
      <p className="mt-3 font-hand text-[22px] leading-[1.25]">{text}</p>
    </aside>
  );
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ordered = notesNewestFirst();
  const idx = ordered.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();
  const note = ordered[idx];
  const newer = idx > 0 ? ordered[idx - 1] : null;
  const older = idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const headings = noteHeadings(note.body);
  const minutes = readMinutes(note.body);
  const url = `${SITE_URL}/notes/${note.slug}`;

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: note.title,
      description: note.summary,
      datePublished: isoMonth(note.date),
      dateModified: isoMonth(note.date),
      url,
      mainEntityOfPage: url,
      image: abs("/opengraph-image.png"),
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": BLOG_ID },
      articleSection: topicLabel[note.topic],
      keywords: [topicLabel[note.topic], ...headings.map((h) => h.text)].join(
        ", ",
      ),
      wordCount: note.body.split(/\s+/).length,
      timeRequired: `PT${minutes}M`,
      inLanguage: "en",
    },
    breadcrumbs([
      { name: "Notes", path: "/notes" },
      { name: note.title, path: `/notes/${note.slug}` },
    ]),
  );

  return (
    <div className="bg-paper text-paper-text min-h-screen">
      <JsonLd data={jsonLd} />
      <ReadingProgress targetId="article" />

      <div className="pt-32 md:pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          {/* Header */}
          <div className={columns}>
            <div className="hidden lg:block" />
            <Reveal>
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-paper-text/50 hover:text-paper-text"
              >
                <ArrowLeft size={14} /> All notes
              </Link>
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.08em] text-[#5c7a12]">
                {topicLabel[note.topic]}
              </p>
              <h1 className="mt-3 font-serif text-[38px] md:text-[54px] leading-[1.08] tracking-[-0.015em] font-medium">
                {note.title}
              </h1>
              <p className="mt-5 font-serif italic text-[21px] md:text-[23px] leading-snug text-paper-text/65">
                {note.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-paper-text/10 py-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/image/profil.jpg"
                    alt=""
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover object-[50%_25%]"
                  />
                  <div>
                    <p className="text-[15px] font-semibold leading-tight">
                      {personalInfo.name}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/50 mt-1">
                      {formatNoteDate(note.date)} · {minutes} min read
                    </p>
                  </div>
                </div>
                <ShareNote url={url} title={note.title} />
              </div>
            </Reveal>
            <div className="hidden lg:block" />
          </div>

          {/* Body */}
          <div className={`mt-12 ${columns}`}>
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <NoteToc headings={headings} />
              </div>
            </div>

            <div>
              <TldrNote
                text={note.summary}
                className="lg:hidden mb-12 max-w-md mx-auto"
              />
              <article
                id="article"
                className="font-serif text-[19px] md:text-[20px] leading-[1.75] text-paper-text/85 space-y-6"
              >
                <MarkdownLite text={note.body} />
              </article>

              {/* Sign-off */}
              <div className="mt-14 flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <p className="font-hand text-[40px] font-bold leading-none -rotate-3 text-paper-text">
                    - Rohan
                  </p>
                  <p className="mt-4 font-serif italic text-[17px] text-paper-text/60 max-w-[46ch]">
                    Thanks for reading. If you&apos;ve solved this differently,
                    I&apos;d genuinely like to hear how-{" "}
                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Re: ${note.title}`)}`}
                      className="underline decoration-[#5c7a12] underline-offset-4 hover:text-paper-text"
                    >
                      write to me
                    </a>
                    .
                  </p>
                </div>
                <ShareNote url={url} title={note.title} />
              </div>

              <div className="mt-14">
                <AuthorCard />
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-32 pt-2">
                <TldrNote text={note.summary} />
              </div>
            </div>
          </div>

          {/* Newer / older */}
          <nav
            aria-label="More notes"
            className="mt-20 max-w-[720px] mx-auto lg:-translate-x-[10px] grid sm:grid-cols-2 gap-4"
          >
            {older ? (
              <Link
                href={`/notes/${older.slug}`}
                className="group rounded-card border border-paper-text/10 p-6 hover:border-paper-text/30 hover:bg-white/50 transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/45 flex items-center gap-1.5">
                  <ArrowLeft size={12} /> Older note
                </p>
                <p className="mt-2 font-serif text-[20px] leading-snug group-hover:text-[#5c7a12] transition-colors">
                  {older.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/notes/${newer.slug}`}
                className="group rounded-card border border-paper-text/10 p-6 text-right hover:border-paper-text/30 hover:bg-white/50 transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/45 flex items-center justify-end gap-1.5">
                  Newer note <ArrowRight size={12} />
                </p>
                <p className="mt-2 font-serif text-[20px] leading-snug group-hover:text-[#5c7a12] transition-colors">
                  {newer.title}
                </p>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
