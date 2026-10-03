import { NextRequest } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/server/rag/systemPrompt";
import {
  formatContext,
  isIndexAvailable,
  retrieveTopChunks,
  sourcesFor,
  type Source,
} from "@/server/rag/retrieve";
import { rateLimit } from "@/server/rateLimit";

export const runtime = "nodejs";

const MODEL = process.env.CHAT_MODEL || "gpt-5-nano";
const MAX_MESSAGES = 8;
const MAX_CHARS = 1200;

type IncomingMessage = { role: "user" | "assistant"; content: string };

const CONTACT = "skrohanparveag@gmail.com";

function plain(text: string, status = 200, sources: Source[] = []) {
  return new Response(text, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Sources": encodeURIComponent(JSON.stringify(sources)),
    },
  });
}

function parseBody(raw: unknown): { messages: IncomingMessage[]; path?: string; title?: string } | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Record<string, unknown>;
  if (!Array.isArray(body.messages)) return null;

  const messages = body.messages
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as IncomingMessage).role === "user" || (m as IncomingMessage).role === "assistant") &&
        typeof (m as IncomingMessage).content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS).trim() }))
    .filter((m) => m.content);

  const page = (body.page ?? {}) as Record<string, unknown>;
  const path =
    typeof page.path === "string" && page.path.startsWith("/") ? page.path.slice(0, 200) : undefined;
  const title = typeof page.title === "string" ? page.title.slice(0, 200) : undefined;
  return { messages, path, title };
}

/**
 * The text to retrieve with. A short follow-up ("what stack did it use?") means
 * nothing on its own, so it's joined with the previous question; a question
 * about "this" on a project page gets the page title.
 */
function retrievalQuery(messages: IncomingMessage[], pageTitle?: string) {
  const users = messages.filter((m) => m.role === "user");
  const last = users[users.length - 1].content;
  const parts = [last];
  if (users.length > 1 && last.split(/\s+/).length < 12) parts.unshift(users[users.length - 2].content);
  if (pageTitle && /\b(this|it|its|that|here|these|page|project|note)\b/i.test(last)) parts.push(pageTitle);
  return parts.join("\n");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return plain(`The assistant isn't configured yet. Please reach out at ${CONTACT}.`);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = rateLimit(ip);
  if ("retryAfterMinutes" in limit) {
    return plain(
      `You've asked a lot of questions in a short time — give it about ${limit.retryAfterMinutes} minute${
        limit.retryAfterMinutes === 1 ? "" : "s"
      }, or write to Rohan directly at ${CONTACT}.`,
      429,
    );
  }

  let parsed: ReturnType<typeof parseBody>;
  try {
    parsed = parseBody(await req.json());
  } catch {
    parsed = null;
  }
  if (!parsed || !parsed.messages.some((m) => m.role === "user")) {
    return plain("I didn't catch a question there — try asking again.", 400);
  }
  const { messages, path, title } = parsed;

  const openai = new OpenAI({ apiKey });

  try {
    let contextBlock = "No knowledge base is indexed yet. Say you don't have information on this and point to email.";
    let sources: Source[] = [];

    if (isIndexAvailable()) {
      const query = retrievalQuery(messages, title);
      const embedding = await openai.embeddings.create({ model: "text-embedding-3-small", input: query });
      const chunks = retrieveTopChunks(embedding.data[0].embedding, query, { topK: 6, currentPath: path });
      if (chunks.length) {
        contextBlock = formatContext(chunks);
        sources = sourcesFor(chunks.slice(0, 3));
      }
    }

    const pageNote = path
      ? `The visitor is currently on the page "${title ?? path}" (${path}). If they say "this" or "it" without naming something, they most likely mean what's on that page.`
      : "";

    const stream = await openai.chat.completions.create(
      {
        model: MODEL,
        stream: true,
        ...(MODEL.startsWith("gpt-5") ? { reasoning_effort: "minimal" as const } : {}),
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `${pageNote}\n\nCONTEXT:\n\n${contextBlock}` },
          ...messages,
        ],
      },
      { signal: req.signal },
    );

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const part of stream) {
            const text = part.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (error) {
          if (!req.signal.aborted) {
            console.error("Chat stream error:", error);
            controller.enqueue(encoder.encode("\n\n(The answer was cut off — please try again.)"));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Sources": encodeURIComponent(JSON.stringify(sources)),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return plain("Something went wrong on my end. Please try again in a moment.");
  }
}
