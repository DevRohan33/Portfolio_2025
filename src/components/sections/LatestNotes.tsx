import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/content/notes";
import { formatNoteDate, notesNewestFirst, readMinutes } from "@/lib/notes";
import Reveal from "@/components/Reveal";

export default function LatestNotes() {
  const latest = notesNewestFirst().slice(0, 3);

  return (
    <section className="bg-ink py-24 md:py-[120px] border-t border-hairline">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label-eyebrow">
              <span className="text-accent">04</span> - LATEST NOTES
            </p>
            <h2 className="mt-4 font-serif text-[34px] md:text-[44px] font-medium tracking-[-0.02em] max-w-xl leading-tight">
              Things I&apos;ve had to figure out.
            </h2>
          </div>
          <Link
            href="/notes"
            className="label-eyebrow inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            All {notes.length} notes <ArrowUpRight size={12} />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((note, i) => (
            <Reveal key={note.slug} delay={i * 80}>
              <Link
                href={`/notes/${note.slug}`}
                className="group flex flex-col h-full rounded-card border border-hairline bg-surface p-7 transition-all duration-150 hover:border-white/20 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="tech-tag !text-accent !border-accent/30">{note.topic}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-text-subtle">
                    {formatNoteDate(note.date)} · {readMinutes(note.body)} min
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-[23px] font-medium leading-snug group-hover:text-accent transition-colors">
                  {note.title}
                </h3>
                <p className="mt-3 font-serif text-[16px] leading-relaxed text-text-muted flex-1">
                  {note.summary}
                </p>
                <span className="mt-6 label-eyebrow inline-flex items-center gap-1.5 group-hover:text-text-primary transition-colors">
                  Read note <ArrowUpRight size={12} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
