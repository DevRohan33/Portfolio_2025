import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/content/notes";
import { personalInfo } from "@/content/site";
import { formatNoteDate, notesNewestFirst, readMinutes, topicLabel } from "@/lib/notes";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { BLOG_ID, PERSON_ID, WEBSITE_ID, abs, breadcrumbs, graph, isoMonth, pageMeta } from "@/lib/seo";
import NotesList, { type NoteListItem } from "@/components/notes/NotesList";
import AuthorCard from "@/components/notes/AuthorCard";

export const metadata: Metadata = pageMeta({
  title: "Notes",
  path: "/notes",
  description:
    "Long-form technical writing on RAG, data pipelines, and infrastructure — written from systems I've actually built and run.",
});

/** The first two sentences of a note, for the handwritten preview. */
function opening(body: string) {
  const first = body.trim().split(/\n\n+/)[0];
  return first.match(/[^.!?]+[.!?]+/g)?.slice(0, 2).join(" ").trim() ?? first;
}

export default function NotesIndexPage() {
  const ordered = notesNewestFirst();
  const [featured, ...rest] = ordered;

  const items: NoteListItem[] = rest.map((n) => {
    const [month, year] = formatNoteDate(n.date).split(" ");
    return {
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      topic: n.topic,
      topicLabel: topicLabel[n.topic],
      month: month.slice(0, 3),
      year,
      minutes: readMinutes(n.body),
    };
  });

  const jsonLd = graph(
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      url: abs("/notes"),
      name: "Notes - SK Rohan Parveag",
      description: "Long-form technical writing on RAG, data pipelines and infrastructure.",
      inLanguage: "en",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
      blogPost: ordered.map((n) => ({
        "@type": "BlogPosting",
        "@id": abs(`/notes/${n.slug}#post`),
        headline: n.title,
        url: abs(`/notes/${n.slug}`),
        datePublished: isoMonth(n.date),
        author: { "@id": PERSON_ID },
      })),
    },
    breadcrumbs([{ name: "Notes", path: "/notes" }]),
  );

  return (
    <div className="bg-paper text-paper-text min-h-screen">
      <JsonLd data={jsonLd} />
      <div className="pt-36 md:pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          {/* Header */}
          <Reveal className="max-w-3xl">
            <p className="font-mono text-label uppercase text-[#5c7a12]">04 — NOTES</p>
            <h1 className="mt-4 font-serif text-[46px] md:text-[68px] leading-[1.02] tracking-[-0.02em] font-medium">
              Things I&apos;ve had to{" "}
              <span className="relative inline-block">
                figure out
                <svg
                  className="absolute left-0 -bottom-2 w-full h-4 text-[#8fb31a]"
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M3 11 C 60 3, 120 14, 180 7 S 270 4, 297 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-3 font-hand text-[26px] md:text-[30px] font-bold text-paper-text/60 rotate-[-1.5deg] origin-left">
              mostly the hard way ↘
            </p>
            <p className="mt-6 font-serif text-[19px] md:text-[21px] leading-relaxed text-paper-text/70 max-w-[58ch]">
              Long-form versions of what I build — dedup strategies, RAG isolation, the
              infrastructure under my products, and what real users taught me. Written after the
              fact, from systems that actually ran.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/image/profil.jpg"
                alt=""
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover object-[50%_25%]"
              />
              <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-paper-text/50">
                by {personalInfo.name} · {notes.length} notes
              </p>
            </div>
          </Reveal>

          {/* Featured */}
          <Reveal className="mt-16">
            <Link
              href={`/notes/${featured.slug}`}
              className="group grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 rounded-card border border-paper-text/10 bg-white/55 p-6 md:p-10 hover:border-paper-text/25 transition-colors"
            >
              <div className="flex flex-col">
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-paper-text/50">
                  <span className="text-[#5c7a12]">Latest</span> · {topicLabel[featured.topic]} ·{" "}
                  {formatNoteDate(featured.date)}
                </p>
                <h2 className="mt-4 font-serif text-[32px] md:text-[42px] leading-[1.08] font-medium group-hover:text-[#5c7a12] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 font-serif text-[18px] md:text-[19px] leading-relaxed text-paper-text/65">
                  {featured.summary}
                </p>
                <span className="mt-auto pt-8 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em]">
                  Read the note · {readMinutes(featured.body)} min <ArrowUpRight size={14} />
                </span>
              </div>

              {/* Notebook page with the opening lines in handwriting */}
              <div
                className="relative rotate-[1deg] group-hover:rotate-0 transition-transform duration-300 bg-[#fffdf6] shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)] px-8 md:pl-14 pr-6 py-8 overflow-hidden"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, rgba(70,110,190,0.18) 35px, rgba(70,110,190,0.18) 36px)",
                  backgroundPosition: "0 22px",
                }}
                aria-hidden
              >
                <span className="absolute top-0 bottom-0 left-8 md:left-10 w-px bg-[rgba(220,80,80,0.35)]" />
                <p className="font-hand text-[25px] leading-[36px] text-[#2c3a5a] font-medium">
                  {opening(featured.body)}
                </p>
                <p className="mt-2 font-hand text-[25px] leading-[36px] text-[#2c3a5a]/50">…</p>
                <span className="absolute right-5 bottom-4 font-hand text-[26px] font-bold text-[#5c7a12] -rotate-6">
                  new!
                </span>
              </div>
            </Link>
          </Reveal>

          {/* All notes */}
          <section className="mt-20">
            <Reveal>
              <h2 className="font-hand text-[30px] font-bold text-paper-text/70 -rotate-1 mb-6">
                earlier notes
              </h2>
              <NotesList items={items} />
            </Reveal>
          </section>

          <Reveal className="mt-20 max-w-3xl">
            <AuthorCard />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
