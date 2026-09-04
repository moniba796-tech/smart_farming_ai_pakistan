/**
 * data/diseaseData.ts
 * ---------------------
 * Farmer-friendly knowledge base mapped from raw Hugging Face model labels
 * to symptoms/causes/treatments/prevention.
 */

export interface DiseaseEntry {
  name: string;
  symptoms: string;
  causes: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
}

export const DISEASE_KB: Record<string, DiseaseEntry> = {
  healthy: {
    name: "Healthy Plant",
    symptoms: "No visible disease symptoms. Leaves look green and normal.",
    causes: "N/A - the plant appears healthy.",
    organicTreatment: "No treatment needed. Continue good farm hygiene.",
    chemicalTreatment: "No treatment needed.",
    prevention: "Keep monitoring weekly. Maintain proper watering and balanced fertilizer.",
  },
  blight: {
    name: "Blight",
    symptoms: "Brown or black patches on leaves, wilting, spreading dark spots with yellow edges.",
    causes: "Fungal infection, often spread by wet and humid weather, poor air flow between plants.",
    organicTreatment: "Remove and destroy infected leaves. Spray neem oil solution every 5-7 days.",
    chemicalTreatment: "Apply a copper-based fungicide (e.g. copper oxychloride) as per label dose.",
    prevention: "Avoid overhead watering. Keep good spacing between plants. Rotate crops each season.",
  },
  rust: {
    name: "Rust",
    symptoms: "Small orange, yellow, or reddish-brown powdery spots on the underside of leaves.",
    causes: "Fungal spores spread by wind and moisture, common in humid weather.",
    organicTreatment: "Spray a mix of baking soda and water, or sulfur-based organic spray.",
    chemicalTreatment: "Use a sulfur or triazole-based fungicide following the recommended dose.",
    prevention: "Avoid wetting leaves during irrigation. Ensure good sunlight and spacing.",
  },
  leaf_spot: {
    name: "Leaf Spot",
    symptoms: "Circular brown or black spots with yellow halo on leaves, leaves may drop early.",
    causes: "Fungal or bacterial infection, often from splashing water during rain or irrigation.",
    organicTreatment: "Neem oil spray weekly. Remove and burn fallen infected leaves.",
    chemicalTreatment: "Apply mancozeb or chlorothalonil-based fungicide as directed.",
    prevention: "Water at the base of the plant, not the leaves.",
  },
  mosaic_virus: {
    name: "Mosaic Virus",
    symptoms: "Yellow-green mottled or mosaic pattern on leaves, stunted growth, curled leaves.",
    causes: "Viral infection spread by aphids and other sap-sucking insects.",
    organicTreatment: "No cure once infected — remove and destroy infected plants. Control aphids with neem oil.",
    chemicalTreatment: "No direct chemical cure for the virus. Use insecticide to control aphid vector if needed.",
    prevention: "Use certified virus-free seeds. Control insect vectors. Disinfect tools between plants.",
  },
  powdery_mildew: {
    name: "Powdery Mildew",
    symptoms: "White powdery coating on leaves and stems, leaves may curl and turn yellow.",
    causes: "Fungal disease favored by warm days, cool nights, and poor air circulation.",
    organicTreatment: "Spray diluted milk-water mix (1:9) or baking soda solution weekly.",
    chemicalTreatment: "Apply a sulfur-based or potassium bicarbonate fungicide.",
    prevention: "Improve air circulation, avoid excess nitrogen fertilizer, space plants properly.",
  },
  bacterial_spot: {
    name: "Bacterial Spot",
    symptoms: "Small water-soaked spots on leaves and fruit that turn brown/black with a yellow halo.",
    causes: "Bacterial infection spread by rain splash, contaminated tools, and infected seeds.",
    organicTreatment: "Copper-based organic sprays, remove infected plant material.",
    chemicalTreatment: "Copper hydroxide or copper oxychloride sprays as per label dosage.",
    prevention: "Use disease-free seeds, rotate crops, avoid overhead irrigation.",
  },
};

export const DEFAULT_DISEASE_ENTRY: DiseaseEntry = {
  name: "Unknown / Unclassified Issue",
  symptoms: "The AI detected an issue but could not match it to a known disease in our database.",
  causes: "Could be a nutrient deficiency, pest damage, or a disease not yet in our knowledge base.",
  organicTreatment: "Isolate the affected plant. Take a closer photo and consult your local agriculture officer.",
  chemicalTreatment: "Consult your local agriculture extension office before applying any chemical treatment.",
  prevention: "Keep monitoring the plant daily and maintain good field hygiene.",
};

export function matchDiseaseEntry(rawLabel: string): DiseaseEntry {
  const label = rawLabel.toLowerCase().replace(/-/g, "_").replace(/\s+/g, "_");
  if (label.includes("healthy")) return DISEASE_KB.healthy;
  if (label.includes("blight")) return DISEASE_KB.blight;
  if (label.includes("rust")) return DISEASE_KB.rust;
  if (label.includes("mosaic") || label.includes("virus")) return DISEASE_KB.mosaic_virus;
  if (label.includes("powdery") || label.includes("mildew")) return DISEASE_KB.powdery_mildew;
  if (label.includes("bacterial")) return DISEASE_KB.bacterial_spot;
  if (label.includes("spot")) return DISEASE_KB.leaf_spot;
  return DEFAULT_DISEASE_ENTRY;
}
