import { notes, type Note } from "@/content/notes";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-03" → "March 2026" */
export function formatNoteDate(date: string) {
  const [year, month] = date.split("-").map(Number);
  return month ? `${MONTHS[month - 1]} ${year}` : String(year);
}

export function readMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The note's `## ` section headings, in order, with their anchor ids. */
export function noteHeadings(body: string) {
  return body
    .split(/\n\n+/)
    .filter((block) => block.startsWith("## "))
    .map((block) => {
      const text = block.replace(/^##\s+/, "").trim();
      return { id: slugify(text), text };
    });
}

/** Newest first; notes from the same month keep newest-written first. */
export function notesNewestFirst(): Note[] {
  return [...notes].reverse().sort((a, b) => b.date.localeCompare(a.date));
}

export const topicLabel: Record<Note["topic"], string> = {
  RAG: "RAG & AI",
  DATA: "Data",
  INFRA: "Infrastructure",
};
