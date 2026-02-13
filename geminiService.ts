import { GoogleGenAI } from "@google/genai";
import { SOVEREIGN_AI_PROMPT } from "./data/ai/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (userPrompt: string, lang: string = 'fr', currentPage: string = 'home') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `${SOVEREIGN_AI_PROMPT}\nLangue: ${lang}.\nPage: ${currentPage}.`,
        temperature: 0.1,
        topP: 0.85,
        topK: 40
      }
    });
    
    // Propriété .text strictement requise selon les guidelines V16
    return response.text || "Erreur de transmission. Contactez un expert au +33 6 44 69 32 43.";
  } catch (error) {
    console.error("V16 AI Runtime Critical Error:", error);
    return "Système temporairement indisponible. Nos analystes sont joignables par téléphone.";
  }
};