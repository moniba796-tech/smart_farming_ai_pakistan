/**
 * models/ChatMessage.ts
 * -----------------------
 * Persists AI Assistant conversation turns per session, so a farmer's
 * chat history survives a page refresh (looked up by sessionId, and
 * optionally linked to a saved farmer profile).
 */

import { Schema, model, Document, Types } from "mongoose";

export interface IChatMessage extends Document {
  sessionId: string;
  farmerId?: Types.ObjectId;
  role: "user" | "assistant";
  content: string;
  detectedLanguage?: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    sessionId: { type: String, required: true, index: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "FarmerProfile" },
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    detectedLanguage: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ChatMessage = model<IChatMessage>("ChatMessage", ChatMessageSchema);
