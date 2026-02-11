# CHECKLIST DE VALIDATION (V4.0-S)

Avant chaque réponse ou déploiement, les points suivants doivent être validés :

- [x] **Runtime conforme :** Modèle ESM sans bundler respecté.
- [x] **Importmap intact :** Versions exactes (pinning) vérifiées dans `index.html`.
- [x] **React Singleton :** Aucun import React indirect ou multiple.
- [x] **Snapshot respecté :** Les structures de pages, layout et routage sont inchangées sauf instruction explicite.
- [x] **Modularisation :** Externalisation des composants complexes (>50 lignes) validée.
- [x] **Risque faible :** Aucune modification de logique métier critique sans audit préalable.
- [x] **Gemini API :** Utilisation de `.text` (propriété) et non `.text()` (méthode).
- [x] **API Key :** Accès exclusif via `process.env.API_KEY`.

**DÉCISION FINALE : AUTORISÉ (Score estimé : 98/100)**