"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, User, X } from "lucide-react";

type Message = { role: "assistant" | "user"; content: string };

const AVATAR_SRC = "/hero-frames/avatar-logo.png";

const SUGGESTIONS = [
  "What's Rohan's experience with RAG?",
  "Walk me through TechPluse",
  "What does he actually deploy and maintain?",
  "Is he open to opportunities?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Rohan's AI assistant. Ask me about his work, stack, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const next: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-6) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Something went wrong. Try again in a moment." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[380px] h-[480px] bg-surface border border-hairline rounded-card shadow-2xl flex flex-col overflow-hidden animate-rise-fade">
          <div className="p-4 border-b border-hairline flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-accent/30 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AVATAR_SRC} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Rohan&apos;s AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                  <span className="font-mono text-[10px] uppercase text-text-subtle">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-subtle hover:text-text-primary p-1"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "user" ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-accent text-ink">
                    <User size={12} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-hairline">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={AVATAR_SRC} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-xl text-[13px] leading-snug max-w-[80%] ${
                    m.role === "user"
                      ? "bg-accent text-ink rounded-tr-sm"
                      : "bg-surface-raised text-text-primary rounded-tl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-hairline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={AVATAR_SRC} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="px-3 py-2 rounded-xl bg-surface-raised flex items-center gap-2 text-text-muted">
                  <Loader2 size={13} className="animate-spin" />
                  <span className="text-[12px]">Thinking…</span>
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="tech-tag hover:border-accent hover:text-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-hairline flex gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something…"
              className="flex-1 bg-surface-raised rounded-full px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-subtle outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={isLoading}
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-accent text-ink flex items-center justify-center shrink-0 disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {showPopup && !isOpen && (
        <div className="mb-3 mr-1 bg-surface border border-hairline rounded-card p-4 w-64 relative animate-rise-fade">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-text-subtle hover:text-text-primary"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
          <p className="text-[13px] leading-snug text-text-primary pr-4">
            Hey, I&apos;m Rohan&apos;s AI assistant — ask me about his work.
          </p>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen((v) => !v);
          setShowPopup(false);
        }}
        aria-label="Toggle chat"
        className="relative w-14 h-14 rounded-full shadow-xl hover:brightness-110 transition-all overflow-hidden border-2 border-accent"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AVATAR_SRC} alt="Rohan's AI assistant" className="w-full h-full object-cover" />
        {isOpen && (
          <span className="absolute inset-0 bg-ink/70 flex items-center justify-center">
            <X size={22} className="text-text-primary" />
          </span>
        )}
      </button>
    </div>
  );
}
