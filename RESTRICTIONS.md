# REGISTRE DES RESTRICTIONS (V15 — SOVEREIGN)

Ce fichier consigne les interdictions formelles liées à l'environnement Vercel et à la gouvernance V15.

## INFRASTRUCTURE VERCEL & SUPABASE
- **PROHIBITION_VRC_001** : Interdiction d'utiliser les modules Node.js `fs`, `path`, `os` dans le runtime Edge.
- **PROHIBITION_VRC_002** : Interdiction de configurer des redirections côté client via JS si elles peuvent être gérées dans `vercel.json`.
- **PROHIBITION_VRC_003** : Interdiction d'exposer `VITE_API_KEY` ou `SUPABASE_SERVICE_ROLE_KEY` dans le bundle client.
- **PROHIBITION_SUP_001** : Interdiction de désactiver le RLS (Row Level Security) sur les tables Supabase.

## RUNTIME & BUILD
- **PROHIBITION_RUN_001** : Interdiction de modifier l'importmap pour introduire des versions de React non certifiées (< 19.0).
- **PROHIBITION_RUN_002** : Interdiction d'utiliser des plugins Vite nécessitant des binaires locaux lors du build cloud.

## GOUVERNANCE IA
- **PROHIBITION_IA_001** : Interdiction de mentionner l'identité de l'IA (Gemini/Google) dans les réponses clients.
- **PROHIBITION_IA_002** : Interdiction d'utiliser les propriétés dépréciées du SDK Gemini. Utilisation stricte de `.text` (SDK v0.4.0).
- **PROHIBITION_IA_003** : Interdiction de générer du code sans respecter le typage strict TypeScript (no implicit any).