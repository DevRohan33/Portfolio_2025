import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "@/content/notes";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notes",
  description: "Long-form technical writing on RAG, data pipelines, and infrastructure.",
};

export default function NotesIndexPage() {
  return (
    <div className="bg-paper text-paper-text min-h-screen">
      <div className="pt-40 pb-24 md:pb-[120px]">
        <div className="max-w-container mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-label uppercase text-[#5c7a12] mb-4">04 — NOTES</p>
            <h1 className="text-h2 font-semibold tracking-tight">Things I&apos;ve had to figure out.</h1>
            <p className="mt-3 text-paper-text/60 max-w-[52ch]">
              Long-form versions of what I build — dedup strategies, RAG isolation, and the
              infrastructure underneath four products.
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-paper-text/10 border-t border-paper-text/10">
            {notes.map((note, i) => (
              <Reveal key={note.slug} delay={i * 40}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group grid md:grid-cols-[120px_1fr_140px] gap-2 md:gap-6 items-center py-8 transition-all duration-150 hover:translate-x-2"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40">
                    {note.date}
                  </span>
                  <div>
                    <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight group-hover:text-[#5c7a12] transition-colors">
                      {note.title}
                    </h2>
                    <p className="mt-1 text-[15px] text-paper-text/55 max-w-[60ch]">
                      {note.summary}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/40 md:text-right">
                    {note.topic}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
