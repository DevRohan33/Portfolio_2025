"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

export default function ShareNote({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the link is still visible in the address bar.
    }
  };

  const btn =
    "w-9 h-9 rounded-full border border-paper-text/15 flex items-center justify-center text-paper-text/60 hover:text-paper-text hover:border-paper-text/40 transition-colors";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={copy} className={btn} aria-label="Copy link to this note">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
      <a
        className={btn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
      >
        <Twitter size={15} />
      </a>
      {copied && <span className="font-hand text-[20px] text-[#5c7a12] ml-1">copied!</span>}
    </div>
  );
}
