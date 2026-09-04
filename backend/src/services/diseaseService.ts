/**
 * services/diseaseService.ts
 * -----------------------------
 * Plant disease detection with automatic fallback:
 *
 *   1. PRIMARY: Google Gemini (gemini-3.5-flash) — a multimodal model
 *      that reasons about the photo directly, identifying the plant and
 *      generating farmer-friendly symptoms/causes/treatment/prevention
 *      text in one call. Requires GEMINI_API_KEY.
 *
 *   2. FALLBACK: Hugging Face's free Inference API running a fixed-label
 *      plant-disease image classifier, matched against the local
 *      knowledge base in data/diseaseData.ts. Used automatically if
 *      Gemini is unreachable (network block, quota, rate limit, outage)
 *      or not configured. Requires HF_TOKEN for reliable rate limits
 *      (works without it too, just more likely to be throttled).
 *
 * This two-tier setup means a network issue or outage on one provider
 * doesn't take disease detection down entirely — it degrades to a
 * simpler but still-useful diagnosis instead of failing outright.
 */

import axios from "axios";
import { DEFAULT_DISEASE_ENTRY, matchDiseaseEntry } from "../data/diseaseData";

const TIMEOUT_MS = 30000;
// Gemini model naming changes fairly often — if this ever 404s again, check
// https://ai.google.dev/gemini-api/docs/models for the current stable model
// name and update GEMINI_MODEL in your .env (no code change needed).
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const HF_MODEL =
  process.env.HF_DISEASE_MODEL || "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification";

function geminiEndpointUrl(apiKey: string): string {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
}

function hfEndpointUrl(): string {
  // Hugging Face retired the old api-inference.huggingface.co host in favor
  // of this unified router endpoint — same request/response shape for
  // classic image-classification pipelines, just a new hostname.
  return `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;
}

export type DiagnosisMethod = "gemini" | "huggingface";

export interface DiseaseResult {
  success: true;
  method: DiagnosisMethod;
  rawLabel: string;
  confidence: number;
  name: string;
  symptoms: string;
  causes: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
}

export interface DiseaseError {
  success: false;
  error: string;
}

const GEMINI_SYSTEM_INSTRUCTION = `You are an expert plant pathologist helping Pakistani farmers.
You will be shown a photo of a leaf, fruit, vegetable, or crop.

Identify the plant if possible, and diagnose any visible disease, pest damage,
or nutrient deficiency. If the plant looks healthy, say so.

Respond with ONLY a single valid JSON object (no markdown fences, no extra
text) with exactly these fields, all as plain strings except confidence:
{
  "diagnosisLabel": "short name of the issue, e.g. 'Tomato Early Blight' or 'Healthy Plant'",
  "confidence": 0.0 to 1.0 (your own confidence in this diagnosis),
  "name": "farmer-friendly name of the disease/issue",
  "symptoms": "what is visibly wrong in the photo, in simple language",
  "causes": "likely cause(s) of this issue",
  "organicTreatment": "practical organic/non-chemical treatment steps",
  "chemicalTreatment": "practical chemical treatment steps, with general product types (not brand names)",
  "prevention": "how to prevent this in future seasons"
}

Keep every field concise (1-3 sentences), practical, and in simple language
a farmer with no scientific background can follow. If the image does not
show a plant clearly enough to diagnose, set "name" to "Unclear Image" and
explain in "symptoms" that a clearer photo is needed.`;

async function diagnoseWithGemini(imageBuffer: Buffer, mimeType: string): Promise<DiseaseResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const payload = {
    contents: [
      {
        parts: [
          { text: "Diagnose this plant photo as instructed." },
          { inline_data: { mime_type: mimeType, data: imageBuffer.toString("base64") } },
        ],
      },
    ],
    systemInstruction: { parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }] },
    generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
  };

  const { data } = await axios.post(geminiEndpointUrl(apiKey), payload, {
    headers: { "Content-Type": "application/json" },
    timeout: TIMEOUT_MS,
  });

  const rawText: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Gemini returned no diagnosis text");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Could not parse Gemini's response as JSON");
    parsed = JSON.parse(match[0]);
  }

  return {
    success: true,
    method: "gemini",
    rawLabel: String(parsed.diagnosisLabel ?? DEFAULT_DISEASE_ENTRY.name),
    confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.7,
    name: String(parsed.name ?? DEFAULT_DISEASE_ENTRY.name),
    symptoms: String(parsed.symptoms ?? DEFAULT_DISEASE_ENTRY.symptoms),
    causes: String(parsed.causes ?? DEFAULT_DISEASE_ENTRY.causes),
    organicTreatment: String(parsed.organicTreatment ?? DEFAULT_DISEASE_ENTRY.organicTreatment),
    chemicalTreatment: String(parsed.chemicalTreatment ?? DEFAULT_DISEASE_ENTRY.chemicalTreatment),
    prevention: String(parsed.prevention ?? DEFAULT_DISEASE_ENTRY.prevention),
  };
}

async function diagnoseWithHuggingFace(imageBuffer: Buffer): Promise<DiseaseResult> {
  const headers: Record<string, string> = { "Content-Type": "application/octet-stream" };
  if (process.env.HF_TOKEN) headers.Authorization = `Bearer ${process.env.HF_TOKEN}`;

  const { data } = await axios.post(hfEndpointUrl(), imageBuffer, {
    headers,
    timeout: TIMEOUT_MS,
  });

  const top = Array.isArray(data) ? data[0] : undefined;
  if (!top?.label) throw new Error("Hugging Face returned no classification result");

  const entry = matchDiseaseEntry(top.label);

  return {
    success: true,
    method: "huggingface",
    rawLabel: String(top.label),
    confidence: typeof top.score === "number" ? top.score : 0.6,
    name: entry.name,
    symptoms: entry.symptoms,
    causes: entry.causes,
    organicTreatment: entry.organicTreatment,
    chemicalTreatment: entry.chemicalTreatment,
    prevention: entry.prevention,
  };
}

export async function analyzePlantImage(
  imageBuffer: Buffer,
  mimeType: string = "image/jpeg"
): Promise<DiseaseResult | DiseaseError> {
  if (!imageBuffer?.length) {
    return { success: false, error: "Please upload an image first." };
  }

  const hasGemini = !!process.env.GEMINI_API_KEY;
  let geminiError: unknown = null;

  if (hasGemini) {
    try {
      return await diagnoseWithGemini(imageBuffer, mimeType);
    } catch (err) {
      geminiError = err;
    }
  }

  try {
    return await diagnoseWithHuggingFace(imageBuffer);
  } catch (hfErr: any) {
    if (geminiError) {
      console.warn("[diseaseService] Gemini failed:", (geminiError as Error).message);
      console.warn("[diseaseService] Hugging Face fallback also failed:", hfErr.message);
      return {
        success: false,
        error:
          "Disease detection is temporarily unavailable — both the primary and backup services failed. Please try again shortly.",
      };
    }

    console.warn("[diseaseService] Hugging Face request failed:", hfErr.message);
    if (hfErr.response?.status === 503) {
      return {
        success: false,
        error: "The disease detection model is warming up — please try again in about 20 seconds.",
      };
    }
    return {
      success: false,
      error: "Disease detection is temporarily unavailable. Please try again shortly.",
    };
  }
}