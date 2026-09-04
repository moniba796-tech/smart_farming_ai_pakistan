import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, Mic, MicOff, Bot, User } from "lucide-react";
import { sendChatMessage } from "@/api/client";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import type { ChatTurn } from "@/types";
import LoadingSpinner from "./LoadingSpinner";

const SESSION_KEY = "sfa_chat_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: "assistant",
      content:
        "Assalam-o-Alaikum! 👋 Main aap ki Smart Farming AI assistant hoon. Aap mujh se crop diseases, pests, fertilizers, irrigation, ya kisi bhi farming sawal ke baare mein pooch sakte hain — English, Urdu, ya Roman Urdu mein.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isSupported, isListening, transcript, startListening, stopListening, error: micError } =
    useSpeechRecognition();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatTurn[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const result = await sendChatMessage(text, messages, getSessionId());

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: result.success ? result.reply : `⚠️ ${result.error}` },
    ]);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-farm-100 shadow-card flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-farm-100 flex items-center gap-3 bg-farm-50/60">
        <div className="w-10 h-10 rounded-xl bg-farm-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-farm-700">Smart Farming Assistant</div>
          <div className="text-xs text-gray-400">English • Urdu • Roman Urdu</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.role === "user" ? "bg-wheat-100 text-wheat-700" : "bg-farm-100 text-farm-700"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed prose-farm ${
                  m.role === "user"
                    ? "bg-farm-500 text-white rounded-tr-sm"
                    : "bg-farm-50 text-gray-700 rounded-tl-sm"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && <LoadingSpinner label="Assistant is thinking..." />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-farm-100">
        {micError && <div className="text-xs text-red-500 mb-2">{micError}</div>}
        <div className="flex items-center gap-2">
          {isSupported && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => (isListening ? stopListening() : startListening("en-US"))}
              className={`w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                isListening ? "bg-red-500 text-white animate-pulse" : "bg-farm-100 text-farm-600 hover:bg-farm-200"
              }`}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="e.g. Meri gandum ki fasal peeli ho rahi hai, kya karoon?"
            className="flex-1 px-4 py-3 rounded-full border border-farm-200 focus:outline-none focus:ring-2 focus:ring-farm-400 text-sm"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-11 h-11 flex-shrink-0 rounded-full bg-farm-600 text-white flex items-center justify-center hover:bg-farm-700 disabled:opacity-50 transition-colors"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
