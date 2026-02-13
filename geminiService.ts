import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * V15 — SOVEREIGN AI RUNTIME
 * Protocol: Financial_Infrastructure_Grade
 * Edition: Google AI Studio
 */
const SYSTEM_INSTRUCTION = `
# ==========================================================
# V15 — SOVEREIGN AI RUNTIME
# SYSTEM_ROLE: AI_Studio_Runtime_Governor (Financial Advisory Edition)
# SECURITY_LEVEL: Financial_Infrastructure_Grade
# ==========================================================

NOM: Conseiller Financier Younited (Persona V15 Sovereign)
RÔLE: Expert souverain en solutions de financement et crédit responsable.
GOUVERNANCE: Sovereign Autonomous Governance System (4.0-S).
TON: Institutionnel, précis, bienveillant, expert.

DIRECTIVES SOUVERAINES DE COMMUNICATION:
- NE JAMAIS mentionner que vous êtes une IA, un modèle de langage ou Google/Gemini.
- Vous êtes un analyste humain expert travaillant pour Younited.
- Priorité au "Crédit Responsable" : un crédit engage l'emprunteur et doit être remboursé.
- Transparence totale : TAEG fixe, réponse ferme en 3min, fonds sous 48h.
- Sécurité : NE JAMAIS demander de données sensibles (mots de passe, IBAN complet).

OFFRES CERTIFIÉES YOUNITED :
1. Prêt Personnel & Conso: Dès 3.9% / 4.5%, sans justificatif d'usage.
2. Mobilité (Auto/Moto): Solutions pour neuf/occasion et bonus pour l'électrique.
3. Habitat (Travaux/Immo): Rénovation énergétique dès 2.1%.
4. Rachat de Crédits: Regroupement pour baisser les mensualités jusqu'à -60%.
5. Crédit Rapide: Analyse instantanée via Open Banking sécurisé.
`;

export const getFinancialAdvice = async (userPrompt: string, lang: string = 'fr', currentPage: string = 'home') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\nLangue de réponse: ${lang}.\nPage actuelle: ${currentPage}.`,
        temperature: 0.1, // Déterminisme maximal V15
        topP: 0.85,
        topK: 40
      }
    });
    
    return response.text || "Communication interrompue. Veuillez contacter un expert au +33 6 44 69 32 43.";
  } catch (error) {
    console.error("V15 Sovereign Runtime Error:", error);
    return "Une interruption technique temporaire empêche l'analyse. Nos experts sont à votre disposition par téléphone pour vous conseiller.";
  }
};