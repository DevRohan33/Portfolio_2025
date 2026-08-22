import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/server/rag/systemPrompt";
import { formatContext, isIndexAvailable, retrieveTopChunks } from "@/server/rag/retrieve";

export const runtime = "nodejs";

type IncomingMessage = { role: "user" | "assistant"; content: string };

const FALLBACK_REPLY =
  "The assistant isn't configured yet. Please reach out at skrohanparveag@gmail.com.";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-6) : [];
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMessage) {
    return NextResponse.json({ error: "No user message provided" }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    let contextBlock =
      "No knowledge base is indexed yet. Say you don't have information on this and point to email.";

    if (isIndexAvailable()) {
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: lastUserMessage.content,
      });
      const chunks = retrieveTopChunks(embeddingRes.data[0].embedding, 5);
      contextBlock = chunks.length ? formatContext(chunks) : contextBlock;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: `CONTEXT:\n\n${contextBlock}` },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "I don't have information on that. Try asking about Rohan's projects, stack, or experience.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Something went wrong on my end. Please try again in a moment." },
      { status: 200 }
    );
  }
}
