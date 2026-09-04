import { Router } from "express";
import { sendMessage, getChatHistory } from "../controllers/chatController";
import { validateBody } from "../middleware/validate";
import { chatMessageSchema } from "../types/schemas";

const router = Router();

// POST /api/chat/message
router.post("/message", validateBody(chatMessageSchema), sendMessage);

// GET /api/chat/history/:sessionId
router.get("/history/:sessionId", getChatHistory);

export default router;
