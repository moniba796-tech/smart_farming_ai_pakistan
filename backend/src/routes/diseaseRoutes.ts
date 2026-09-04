import { Router } from "express";
import multer from "multer";
import { analyzeImage, getScanHistory } from "../controllers/diseaseController";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed."));
      return;
    }
    cb(null, true);
  },
});

const router = Router();

// POST /api/disease/analyze  (multipart/form-data, field name: "image")
router.post("/analyze", upload.single("image"), analyzeImage);

// GET /api/disease/history?farmerId=...
router.get("/history", getScanHistory);

export default router;
