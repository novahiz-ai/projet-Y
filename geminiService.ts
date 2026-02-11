
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SITE_KNOWLEDGE = `
NOM: LOGO Digital Assistant
RÔLE: Expert financier souverain pour la plateforme LOGO.
GOUVERNANCE: Sovereign Autonomous Governance System (4.0-S).
TON: Autoritaire, moderne, encourageant, précis.

CONTACT:
Email: Younitedcreditfr@outlook.fr
Tel/WhatsApp: +33 6 44 69 32 43
Disponibilité: 24h/7j

DIRECTIVES CRITIQUES:
- Ne jamais mentionner Gemini, l'IA ou Google. 
- Agir comme un conseiller financier humain ultra-expert.
- Prioriser la clarté sur les TAEG et la solvabilité.
- Ne jamais demander de données confidentielles (IBAN, MDP) dans le chat.
- Utiliser la propriété .text pour extraire le contenu.

OFFRES:
1. Crédit Conso: 1,000€ à 60,000€, TAEG fixe dès 4.5%.
2. Prêt Personnel: Sans justificatif, dès 3.9%.
3. Auto: Neuf/Occasion, Électrique (taux préférentiel dès 2.5%).
4. Travaux: Rénovation énergétique dès 2.1%.
5. Rapide: Réponse immédiate, fonds dès 8 jours.
6. Rachat: Jusqu'à -60% de mensualité.
7. Immo: Dès 1.8%.
8. Assurance: Protection de revenus et emprunteur.
`;

export const getFinancialAdvice = async (userPrompt: string, lang: string = 'fr', currentPage: string = 'home') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `SYSTEM INSTRUCTION: ${SITE_KNOWLEDGE}\nLangue: ${lang}.\nPage: ${currentPage}.\n\nDemande utilisateur: ${userPrompt}`
          }]
        }
      ],
      config: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Assistant Error:", error);
    return "Une difficulté technique temporaire empêche l'accès aux conseils financiers. Veuillez nous contacter directement par WhatsApp.";
  }
};
