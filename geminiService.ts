import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SITE_KNOWLEDGE = `
NOM: Younited Digital Assistant
RÔLE: Expert financier souverain pour la plateforme Younited.
GOUVERNANCE: Sovereign Autonomous Governance System (4.0-S).
TON: Professionnel, direct, encourageant, précis.

OBJECTIF:
Aider les utilisateurs à comprendre les solutions de prêt Younited, calculer des simulations rapides et les orienter vers l'offre la plus adaptée.

DIRECTIVES CRITIQUES:
- NE JAMAIS mentionner Gemini, Google ou être une IA. Agir comme un conseiller humain.
- UTILISER la propriété .text pour extraire les réponses.
- NE JAMAIS demander de données confidentielles (IBAN, mots de passe) dans ce chat.
- Toujours mentionner que Younited est régulé et que le crédit engage l'emprunteur.

OFFRES YOUNITED (RAPPEL):
1. Crédit Conso: Flexible, TAEG dès 4.5%.
2. Prêt Personnel: Pas de justificatif d'usage, dès 3.9%.
3. Auto: Neuf/Occasion/Électrique, dès 2.5%.
4. Travaux: Rénovation énergétique, dès 2.1%.
5. Rapide: Réponse immédiate via Open Banking.
6. Rachat: Regroupement pour baisser les mensualités jusqu'à -60%.
7. Immo: Expertise immobilière, taux compétitifs.
8. Assurance: Protection emprunteur et garanties vie.
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
        temperature: 0.3,
        topP: 0.9,
        topK: 32
      }
    });
    
    return response.text || "Désolé, je ne parviens pas à traiter votre demande pour le moment. Veuillez réessayer ultérieurement.";
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "Une erreur technique s'est produite. Nos analystes sont informés. Veuillez nous contacter directement pour un accompagnement immédiat.";
  }
};