"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, FileText, RotateCcw, Square, User, X } from "lucide-react";
import ChatMarkdown from "@/components/chat/ChatMarkdown";
import { track } from "@/lib/analytics";

type Source = { title: string; url: string };
type Message = {
  role: "assistant" | "user";
  content: string;
  sources?: Source[];
};

const AVATAR_SRC = "/hero-frames/avatar-logo.png";
const STORAGE_KEY = "rohan-chat-v1";
const MAX_INPUT = 1200;

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm Rohan's AI assistant. I answer from his portfolio- projects, notes, stack and experience- and link you to the page each answer comes from.",
};

/** Starter questions that fit the page the visitor is on. */
function suggestionsFor(pathname: string, pageName: string): string[] {
  if (pathname.startsWith("/work/") && pageName) {
    return [
      `How does ${pageName} work?`,
      `What was the hardest decision in ${pageName}?`,
      `What stack is ${pageName} built on?`,
    ];
  }
  if (pathname.startsWith("/notes/")) {
    return [
      "Summarise this note in three lines",
      "What's the key takeaway here?",
      "Where did Rohan apply this?",
    ];
  }
  if (pathname.startsWith("/about")) {
    return [
      "How did Rohan move from solar plants to software?",
      "What is he looking for next?",
      "What's his strongest area?",
    ];
  }
  if (pathname.startsWith("/uses")) {
    return [
      "What does he deploy and maintain?",
      "Which vector databases has he used?",
      "Does he work with Firebase?",
    ];
  }
  return [
    "What's Rohan's experience with RAG?",
    "Walk me through RYBO",
    "What has he shipped to real users?",
    "Is he open to opportunities?",
  ];
}

function loadSaved(): Message[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Message[]) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

function Avatar({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden shrink-0 border border-hairline"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AVATAR_SRC} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pageName, setPageName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const dismissedRef = useRef(false);
  // Bumped on "New chat", so a request still finishing can't write into the new conversation.
  const generationRef = useRef(0);
  const pathname = usePathname();
  // A note is for reading; don't pop a bubble over it (the chat button stays).
  const quietPage = pathname.startsWith("/notes/");

  // Restore this tab's conversation, so it survives moving between pages.
  useEffect(() => {
    const saved = loadSaved();
    if (saved) setMessages(saved);
  }, []);

  useEffect(() => {
    if (isStreaming) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // Storage can be unavailable (private mode, blocked); the chat still works.
    }
  }, [messages, isStreaming]);

  // The page's own name ("RYBO- SK Rohan Parveag" → "RYBO") for suggestions.
  useEffect(() => {
    const t = setTimeout(
      () => setPageName(document.title.split(/\s[—–-]\s/)[0] ?? ""),
      50,
    );
    return () => clearTimeout(t);
  }, [pathname]);

  // Greet once the visitor is past the first screen, so the bubble never sits
  // on top of the hero's call-to-action buttons.
  useEffect(() => {
    if (isOpen || quietPage) return;
    const show = () => {
      if (!dismissedRef.current) setShowPopup(true);
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) show();
    };
    const timer = setTimeout(show, 12000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isOpen, quietPage]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isStreaming, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const updateLast = (generation: number, fn: (m: Message) => Message) => {
    if (generation !== generationRef.current) return;
    setMessages((prev) => [...prev.slice(0, -1), fn(prev[prev.length - 1])]);
  };

  const send = useCallback(
    async (text: string) => {
      const question = text.trim().slice(0, MAX_INPUT);
      if (!question || isStreaming) return;

      const history: Message[] = [
        ...messages,
        { role: "user", content: question },
      ];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setIsStreaming(true);
      track("chat_question", {
        page_path: pathname,
        turn: history.filter((m) => m.role === "user").length,
      });

      const controller = new AbortController();
      abortRef.current = controller;
      const generation = generationRef.current;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // The greeting isn't part of the conversation the model needs.
            messages: history
              .filter((m) => m !== GREETING && m.content !== GREETING.content)
              .slice(-8)
              .map(({ role, content }) => ({ role, content })),
            page: { path: pathname, title: document.title },
          }),
        });

        let sources: Source[] = [];
        try {
          sources = JSON.parse(
            decodeURIComponent(res.headers.get("X-Sources") ?? "%5B%5D"),
          );
        } catch {
          sources = [];
        }

        if (!res.body) {
          const fallback = await res.text();
          updateLast(generation, (m) => ({
            ...m,
            content: fallback || "Something went wrong. Try again in a moment.",
          }));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          updateLast(generation, (m) => ({ ...m, content: answer }));
        }
        updateLast(generation, (m) => ({
          ...m,
          content:
            answer.trim() ||
            "I don't have information on that- try asking about his projects or stack.",
          sources: res.ok ? sources : [],
        }));
      } catch (err) {
        const aborted =
          err instanceof DOMException && err.name === "AbortError";
        updateLast(generation, (m) => ({
          ...m,
          content: aborted
            ? m.content
              ? `${m.content} …`
              : "Stopped."
            : "Something went wrong. Try again in a moment.",
        }));
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, pathname],
  );

  const stop = () => abortRef.current?.abort();

  const reset = () => {
    generationRef.current += 1;
    stop();
    setMessages([GREETING]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    inputRef.current?.focus();
  };

  const closeOnMobileNavigate = () => {
    if (window.innerWidth < 640) setIsOpen(false);
  };

  const suggestions = suggestionsFor(pathname, pageName);
  const last = messages[messages.length - 1];
  const waitingForFirstToken =
    isStreaming && last?.role === "assistant" && !last.content;

  return (
    <div className="flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-3 w-[calc(100vw-3rem)] sm:w-[400px] h-[min(620px,calc(100svh-8rem))] bg-surface border border-hairline rounded-card shadow-2xl flex flex-col overflow-hidden animate-rise-fade"
          role="dialog"
          aria-label="Chat with Rohan's AI assistant"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-hairline flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <Avatar size={36} />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Ask about Rohan
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-subtle">
                    Answers from his portfolio
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  onClick={reset}
                  className="text-text-subtle hover:text-text-primary p-2 rounded-full hover:bg-surface-raised"
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  <RotateCcw size={15} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-subtle hover:text-text-primary p-2 rounded-full hover:bg-surface-raised"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            aria-live="polite"
          >
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              if (m.role === "assistant" && !m.content && isLast && isStreaming)
                return null;
              return (
                <div
                  key={i}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {m.role === "user" ? (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-accent text-ink">
                      <User size={12} />
                    </div>
                  ) : (
                    <Avatar />
                  )}
                  <div className="max-w-[85%] min-w-0">
                    <div
                      className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-relaxed break-words ${
                        m.role === "user"
                          ? "bg-accent text-ink rounded-tr-sm"
                          : "bg-surface-raised text-text-primary/90 rounded-tl-sm"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <>
                          <ChatMarkdown
                            text={m.content}
                            onNavigate={closeOnMobileNavigate}
                          />
                          {isLast && isStreaming && (
                            <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-accent animate-pulse" />
                          )}
                        </>
                      ) : (
                        m.content
                      )}
                    </div>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <Link
                            key={s.url}
                            href={s.url}
                            onClick={closeOnMobileNavigate}
                            className="inline-flex items-center gap-1 rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em] text-text-muted hover:text-accent hover:border-accent/40 transition-colors max-w-full"
                            title={s.title}
                          >
                            <FileText size={10} className="shrink-0" />
                            <span className="truncate">{s.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {waitingForFirstToken && (
              <div className="flex gap-2 items-center">
                <Avatar />
                <div
                  className="px-3.5 py-3 rounded-xl rounded-tl-sm bg-surface-raised flex items-center gap-1"
                  aria-label="Thinking"
                >
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {messages.length === 1 && !isStreaming && (
              <div className="pt-1">
                <p className="font-hand text-[20px] font-bold text-text-muted -rotate-1 mb-2">
                  try one of these ↓
                </p>
                <div className="flex flex-col items-start gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left rounded-xl border border-hairline px-3 py-2 text-[12.5px] text-text-muted hover:border-accent/50 hover:text-text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-hairline shrink-0"
          >
            <div className="flex items-end gap-2 bg-surface-raised rounded-2xl pl-4 pr-1.5 py-1.5 focus-within:ring-1 focus-within:ring-accent">
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                maxLength={MAX_INPUT}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about his work, stack, projects…"
                aria-label="Your question"
                className="flex-1 resize-none bg-transparent py-2 text-[13.5px] leading-snug text-text-primary placeholder:text-text-subtle outline-none max-h-28"
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Stop the answer"
                  className="w-9 h-9 rounded-full bg-text-primary text-ink flex items-center justify-center shrink-0"
                >
                  <Square size={12} fill="currentColor" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-full bg-accent text-ink flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
                >
                  <ArrowUp size={16} />
                </button>
              )}
            </div>
            <p className="mt-2 text-center font-mono text-[9.5px] uppercase tracking-[0.06em] text-text-subtle">
              AI can be wrong- the linked pages are the source of truth
            </p>
          </form>
        </div>
      )}

      {showPopup && !isOpen && (
        <div className="mb-3 mr-1 bg-surface border border-hairline rounded-card p-4 w-64 relative animate-rise-fade">
          <button
            onClick={() => {
              dismissedRef.current = true;
              setShowPopup(false);
            }}
            className="absolute top-2 right-2 text-text-subtle hover:text-text-primary"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
          <p className="text-[13px] leading-snug text-text-primary pr-4">
            Hey, I&apos;m Rohan&apos;s AI assistant - ask me about his work.
          </p>
        </div>
      )}

      <button
        onClick={() => {
          if (!isOpen) track("chat_open", { page_path: pathname });
          setIsOpen((v) => !v);
          dismissedRef.current = true;
          setShowPopup(false);
        }}
        aria-label={
          isOpen ? "Close chat" : "Open chat with Rohan's AI assistant"
        }
        aria-expanded={isOpen}
        className="relative w-14 h-14 rounded-full shadow-xl hover:brightness-110 transition-all overflow-hidden border-2 border-accent"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AVATAR_SRC} alt="" className="w-full h-full object-cover" />
        {isOpen && (
          <span className="absolute inset-0 bg-ink/70 flex items-center justify-center">
            <X size={22} className="text-text-primary" />
          </span>
        )}
      </button>
    </div>
  );
}
