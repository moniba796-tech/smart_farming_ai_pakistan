/**
 * services/groqService.ts
 * -------------------------
 * AI Farmer Assistant, powered by Groq's free-tier, OpenAI-compatible chat
 * completions API. Uses GROQ_API_KEY from the environment.
 */

import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const TIMEOUT_MS = 30000;

const SYSTEM_PROMPT = `You are Smart Farming AI Pakistan.

Help Pakistani farmers with practical, easy-to-understand advice.

You understand and can respond in:
- English
- Urdu
- Roman Urdu

Rules:
- Always answer simply, in farmer-friendly language.
- Explain farming concepts step by step.
- Avoid complicated scientific language and jargon.
- Give practical, actionable advice suited to Pakistani farming conditions.
- When relevant, structure your answer using: Problem, Cause, Solution, Prevention, Best Practices.
- You can help with: crop diseases, pests, fertilizers, irrigation, weather, seeds, harvest,
  organic farming, government schemes, and market prices (note uncertainty if not sure of live prices).
- Reply in the same language/style the farmer used (English, Urdu script, or Roman Urdu).`;

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResult {
  success: true;
  reply: string;
}

export interface ChatError {
  success: false;
  error: string;
}

export function hasGroqKey(): boolean {
  return !!process.env.GROQ_API_KEY;
}

export async function askFarmingAssistant(
  message: string,
  history: ChatTurn[] = []
): Promise<ChatResult | ChatError> {
  if (!message?.trim()) return { success: false, error: "Please type a question first." };

  if (!hasGroqKey()) {
    return {
      success: false,
      error: "The AI Assistant is not configured yet. Please set GROQ_API_KEY.",
    };
  }

  try {
    const { data } = await axios.post(
      GROQ_URL,
      {
        model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
        temperature: 0.5,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: TIMEOUT_MS,
      }
    );

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return { success: false, error: "The AI assistant returned an empty response." };
    return { success: true, reply };
  } catch (err: any) {
    if (err.code === "ECONNABORTED") {
      return { success: false, error: "The AI assistant took too long to respond. Please try again." };
    }
    return { success: false, error: "The AI assistant service returned an error. Please try again shortly." };
  }
}
