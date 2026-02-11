# REGISTRE DES RESTRICTIONS (V1.3 - 4.0-S)

Ce fichier consigne les interdictions formelles liées à l'environnement Vercel.

## INFRASTRUCTURE VERCEL
- **PROHIBITION_VRC_001** : Interdiction d'utiliser les modules Node.js `fs`, `path`, `os` dans le runtime Edge.
- **PROHIBITION_VRC_002** : Interdiction de configurer des redirections côté client via JS si elles peuvent être gérées dans `vercel.json`.
- **PROHIBITION_VRC_003** : Interdiction d'exposer `VITE_API_KEY` dans le bundle client. Utiliser exclusivement `API_KEY` côté serveur/edge.

## RUNTIME & BUILD
- **PROHIBITION_RUN_001** : Interdiction de modifier l'importmap pour introduire des versions de React non certifiées (< 19.0).
- **PROHIBITION_RUN_002** : Interdiction d'utiliser des plugins Vite nécessitant des binaires locaux lors du build cloud.

## GOUVERNANCE IA
- **PROHIBITION_IA_002** : Interdiction d'utiliser les propriétés dépréciées du SDK Gemini. Utilisation stricte de `.text` (SDK v0.4.0).