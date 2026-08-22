import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/content/notes";
import Reveal from "@/components/Reveal";
import MarkdownLite from "@/components/MarkdownLite";

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
  return { title: note.title, description: note.summary };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = notes.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();
  const note = notes[idx];
  const next = notes[(idx + 1) % notes.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    author: { "@type": "Person", name: "SK Rohan Parveag" },
  };

  return (
    <div className="bg-paper text-paper-text min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-label uppercase text-paper-text/40">
              NOTES / {note.topic}
            </p>
            <h1 className="mt-4 text-[32px] md:text-h2 font-semibold tracking-tight max-w-3xl">
              {note.title}
            </h1>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.06em] text-paper-text/40">
              {note.date}
            </p>
          </Reveal>

          <Reveal className="font-body mt-14 max-w-[680px] mx-auto space-y-5 text-[17px] text-paper-text/85 [&_h2]:text-paper-text [&_h2]:mt-2 [&_h2]:font-sans">
            <MarkdownLite text={note.body} />
          </Reveal>

          <div className="mt-20 pt-10 border-t border-paper-text/10 flex justify-end max-w-[680px] mx-auto">
            <Link href={`/notes/${next.slug}`} className="text-right group">
              <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40">
                Next note
              </p>
              <p className="text-[20px] font-semibold tracking-tight group-hover:text-[#5c7a12] transition-colors max-w-sm">
                {next.title} →
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
