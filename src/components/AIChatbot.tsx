
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import OpenAI from "openai";

import knowledgeVectors from "@/lib/knowledge_vectors.json";

function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    mA += vecA[i] * vecA[i];
    mB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string }[]>([
    { role: "assistant", content: "Hi! I'm Rohan's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show welcoming popup after delay
    const timer = setTimeout(() => {
      if (!isOpen) setShowPopup(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is missing.");
      }

      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      // 1. Get embedding for the user's question
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: userMessage,
      });
      const userEmbedding = embeddingRes.data[0].embedding;

      // 2. Find most relevant chunks
      const sortedChunks = (knowledgeVectors as any[])
        .map(chunk => ({
          ...chunk,
          similarity: cosineSimilarity(userEmbedding, chunk.embedding)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3); // Top 3 chunks

      const contextText = sortedChunks.map(c => c.content).join("\n\n");

      // 3. Get chat completion with context
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional assistant for SK Rohan Parveag. 
            Rules:
            - Answer ONLY based on the context provided.
            - Respond in a SHORT and CLEAN manner. 
            - Use ONLY plain text. NO BOLDING (**), no italics, no markdown lists.
            - Maximum 2-3 sentences.
            - If not in context, say: "I'm not sure about that. Please contact Rohan at skrohanparveag@gmail.com."
            
            Context:
            ${contextText}`,
          },
          ...messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: userMessage },
        ],
      });

      const assistantMessage = response.choices[0].message.content || "I couldn't find that in Rohan's portfolio.";
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please check your API key." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden flex flex-col h-[500px]">
              {/* Header */}
              <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Rohan AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-[10px] opacity-80">Online</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-grow p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}>
                        {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                        m.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-secondary text-secondary-foreground rounded-tl-none"
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground rounded-tl-none flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-xs">Typing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-white shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Ask me something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-slate-50 focus:bg-white transition-colors"
                  />
                  <Button type="submit" size="icon" disabled={isLoading} className="shrink-0">
                    <Send size={18} />
                  </Button>
                </form>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  Powered by Rohan
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
            className="mb-4 mr-2 bg-white dark:bg-slate-900 border border-primary/20 shadow-xl rounded-2xl p-4 w-64 relative"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot size={20} className="text-primary animate-bounce" />
              </div>
              <p className="text-sm leading-tight text-foreground/90 pt-1">
                Hey, I'm Rohan's AI assistant, I will help you!
              </p>
            </div>
            <div className="absolute right-[-6px] bottom-4 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-primary/20 rotate-45 shrink-0"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all duration-300 relative group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white z-10"></div>
        {isOpen ? (
          <X size={28} />
        ) : (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Bot size={32} />
          </motion.div>
        )}
        
        {/* Tooltip */}
        {!isOpen && !showPopup && (
          <div className="absolute right-20 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Chat with Rohan's AI
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatbot;
