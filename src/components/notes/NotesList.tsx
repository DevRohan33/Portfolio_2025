"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type NoteListItem = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  topicLabel: string;
  month: string;
  year: string;
  minutes: number;
};

export default function NotesList({ items }: { items: NoteListItem[] }) {
  const topics = Array.from(new Map(items.map((n) => [n.topic, n.topicLabel])).entries());
  const [topic, setTopic] = useState<string | null>(null);
  const shown = topic ? items.filter((n) => n.topic === topic) : items;

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] border transition-colors ${
      active
        ? "bg-paper-text text-paper border-paper-text"
        : "border-paper-text/15 text-paper-text/60 hover:border-paper-text/40 hover:text-paper-text"
    }`;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notes by topic">
        <button type="button" className={chip(topic === null)} onClick={() => setTopic(null)}>
          All · {items.length}
        </button>
        {topics.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={chip(topic === key)}
            onClick={() => setTopic(key)}
            aria-pressed={topic === key}
          >
            {label} · {items.filter((n) => n.topic === key).length}
          </button>
        ))}
      </div>

      <ol className="mt-8 border-t border-paper-text/10">
        {shown.map((note) => (
          <li key={note.slug} className="border-b border-paper-text/10">
            <Link
              href={`/notes/${note.slug}`}
              className="group grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr_40px] gap-4 md:gap-8 py-8 md:py-10 items-start"
            >
              <div className="pt-1">
                <p className="font-hand text-[26px] md:text-[30px] font-bold leading-none text-paper-text/80 -rotate-3">
                  {note.month}
                </p>
                <p className="font-mono text-[11px] tracking-[0.06em] text-paper-text/40 mt-1">
                  {note.year}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-[24px] md:text-[30px] leading-[1.15] font-medium group-hover:text-[#5c7a12] transition-colors">
                  {note.title}
                </h3>
                <p className="mt-2 font-serif text-[17px] md:text-[18px] leading-relaxed text-paper-text/60 max-w-[62ch]">
                  {note.summary}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/45">
                  <span className="text-[#5c7a12]">{note.topicLabel}</span> · {note.minutes} min read
                </p>
              </div>
              <span className="hidden md:flex w-10 h-10 rounded-full border border-paper-text/15 items-center justify-center text-paper-text/50 transition-all group-hover:bg-paper-text group-hover:text-paper group-hover:border-paper-text">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
