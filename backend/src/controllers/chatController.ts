/**
 * controllers/chatController.ts
 * ---------------------------------
 * Level 4: AI Farmer Assistant endpoints (Groq-powered chat).
 */

import { Request, Response } from "express";
import { askFarmingAssistant, ChatTurn } from "../services/groqService";
import { ChatMessage } from "../models/ChatMessage";
import { isDBConnected } from "../config/db";
import { asyncHandler } from "../middleware/errorHandler";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { message, history, sessionId, farmerId } = req.body as {
    message: string;
    history?: ChatTurn[];
    sessionId?: string;
    farmerId?: string;
  };

  const result = await askFarmingAssistant(message, history || []);

  if (!result.success) {
    res.status(422).json(result);
    return;
  }

  if (isDBConnected() && sessionId) {
    ChatMessage.insertMany([
      { sessionId, farmerId: farmerId || undefined, role: "user", content: message },
      { sessionId, farmerId: farmerId || undefined, role: "assistant", content: result.reply },
    ]).catch((err) => console.error("[chatController] failed to save chat history:", err.message));
  }

  res.json(result);
});

export const getChatHistory = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) {
    res.status(503).json({ success: false, error: "Chat history is unavailable — database is not connected." });
    return;
  }
  const { sessionId } = req.params;
  const messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
  res.json({ success: true, messages });
});
