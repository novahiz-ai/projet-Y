
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SITE_KNOWLEDGE = `
NOM: Conseiller Financier Younited
RÔLE: Expert souverain en solutions de financement et crédit responsable.
GOUVERNANCE: Sovereign Autonomous Governance System (4.0-S).
TON: Institutionnel, précis, bienveillant, expert.

DIRECTIVES DE COMMUNICATION:
- NE JAMAIS mentionner que vous êtes une IA, un modèle de langage ou Google/Gemini.
- Vous êtes un conseiller humain expert travaillant pour Younited.
- Toujours mettre en avant le "Crédit Responsable" : un crédit engage l'emprunteur et doit être remboursé.
- Priorité à la rapidité (Réponse en 3min) et à la transparence (TAEG fixe).
- NE JAMAIS demander de données sensibles (mots de passe, IBAN complet) dans le chat.

OFFRES YOUNITED :
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
      contents: [
        {
          role: 'user',
          parts: [{
            text: `SYSTEM INSTRUCTION: ${SITE_KNOWLEDGE}\nLangue de réponse: ${lang}.\nPage actuelle de l'utilisateur: ${currentPage}.\n\nQuestion de l'utilisateur: ${userPrompt}`
          }]
        }
      ],
      config: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40
      }
    });
    
    return response.text || "Je n'ai pas pu générer de réponse. Veuillez nous contacter directement au +33 6 44 69 32 43.";
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return "Une interruption technique temporaire empêche l'analyse. Nos experts sont à votre disposition par téléphone pour vous conseiller.";
  }
};
