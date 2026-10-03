import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders the small markdown subset the assistant is allowed to use:
 * paragraphs, "- " lists, **bold** and [text](url) links. Everything else is
 * shown as text. Only site-relative and http(s) links are ever rendered, so a
 * model reply can't produce a javascript: or data: link.
 */
function inline(text: string, onNavigate?: () => void) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\s*[^)\s]+\s*\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {bold[1]}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(\s*([^)\s]+)\s*\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
      if (href.startsWith("/") && !href.startsWith("//")) {
        return (
          <Link key={i} href={href} className={cls} onClick={onNavigate}>
            {label}
          </Link>
        );
      }
      if (/^https?:\/\//.test(href)) {
        return (
          <a key={i} href={href} target="_blank" rel="noreferrer" className={cls}>
            {label}
          </a>
        );
      }
      return <Fragment key={i}>{label}</Fragment>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ChatMarkdown({ text, onNavigate }: { text: string; onNavigate?: () => void }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
          return (
            <ul key={i} className="space-y-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-accent shrink-0">–</span>
                  <span>{inline(l.replace(/^\s*[-*•]\s+/, ""), onNavigate)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {inline(block, onNavigate)}
          </p>
        );
      })}
    </div>
  );
}
