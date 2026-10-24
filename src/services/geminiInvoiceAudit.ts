import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function analyzeInvoiceWithGemini(
  fileBase64: string,
  mimeType: string,
  poContext: { poNumber: string; poAmountChf: number; grnSummary: string; masterIban: string }
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          data: fileBase64,
          mimeType: mimeType,
        },
      },
      {
        text: `Perform a 3-Way Match on this invoice against Purchase Order ${poContext.poNumber} (Authorized PO Amount: CHF ${poContext.poAmountChf}, Delivery Note / GRN: ${poContext.grnSummary}, Master IBAN: ${poContext.masterIban}).`,
      },
    ],
    config: {
      systemInstruction:
        "You are the KlarSolution 3.0 Forensic Invoice Audit Engine for Smart Grid AG. Extract invoice fields, compare against the PO and GRN, verify 8.1% Swiss MWST and IBAN plausibility, and return structured JSON.",
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });

  return JSON.parse(response.text || "{}");
}
